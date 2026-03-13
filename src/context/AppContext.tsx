import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, collection, onSnapshot, setDoc, updateDoc, getDoc, getDocs, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';

export interface SessionData {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string; // Background image
  content: string; // Main text content
  mediaUrl: string; // Image or video URL at the bottom
  mediaType: 'image' | 'video' | 'none';
}

export interface LandingData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export interface AnalyticsData {
  totalUsers: number;
  materiViews: number;
  videoViews: number;
  checkerUses: number;
  materiStats: Record<string, number>;
  activityData: { date: string; views: number }[];
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  category: string;
  videoUrl: string;
}

export interface MediaItem {
  id: string;
  url: string;
  type: string;
  name: string;
}

export interface AppState {
  landing: LandingData;
  sessions: Record<string, SessionData>;
  analytics: AnalyticsData;
  videos: VideoData[];
  mediaLibrary: MediaItem[];
}

const defaultState: AppState = {
  landing: {
    heroTitle: "Langkah Kecil, Lindungi Paru-Paru Si Kecil",
    heroSubtitle: "Sahabat SiKecil hadir untuk mendampingi Anda dengan informasi terpercaya, deteksi dini, dan panduan penanganan pneumonia pada balita.",
    heroImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop"
  },
  sessions: {
    '1': {
      id: '1',
      title: 'Pengenalan Pneumonia',
      description: '(Latar belakang, Pengertian, Anatomi Sistem Pernapasan, Penyebab, dan Faktor Risiko)',
      category: 'Dasar',
      image: 'https://i.ibb.co.com/sdytc8Sz/Chat-GPT-Image-12-Mar-2026-03-35-37.png',
      content: 'Latar belakang \n\nPneumonia adalah penyakit infeksi pada kantong udara (alveoli) di paru-paru. Penyakit ini merupakan penyebab kematian nomor satu pada balita di dunia, merenggut sekitar 739.000 jiwa pada tahun 2023, dan mayoritas menyerang usia 2–59 bulan. \n\nSituasi di Indonesia dan Jawa Barat\n\nNasional: Menjadi penyebab utama kematian balita dengan 166.702 kasus pada 2022. Angka kematian pada bayi tiga kali lebih tinggi dibandingkan dengan kelompok usia 1–4 tahun. \n\nJawa Barat: Mengalami tren kenaikan kasus dari 44,90% (2022) menjadi 45% (2023). \n\nKota Tasikmalaya: Berada di urutan ke-11 di Jawa Barat (53,6% kasus) Deteksi dini dan perawatan yang tepat sangat penting untuk menurunkan angka kesakitan dan kematian. \n\n![Deskripsi Gambar](https://i.ibb.co.com/PZCTTrnF/gambar-infografis-pneumonia-Indonesia.jpg) \n\nPengertian Pneumonia & Bronkopneumonia \n\nPengertian: Pneumonia adalah infeksi sistem pernapasan bawah. Bronkopneumonia secara spesifik adalah radang pada saluran bronkial dan alveoli (bagian terkecil paru-paru). \n\nAnatomi Sistem Pernafasan \n\nSaluran Napas Atas Sistem pernapasan balita dirancang untuk pertukaran gas yang efisien — dari hidung hingga alveoli, setiap bagian memiliki peran penting dalam menjaga oksigenasi tubuh.Saluran pernapasan atas terdiri dari: Hidung, faring, dan laring menyaring, menghangatkan, dan melembabkan udara sebelum masuk lebih dalam. \n\nSaluran Napas Bawah Trakea bercabang menjadi bronkus kanan dan kiri, lalu ke bronkiolus hingga alveoli sebagai tempat pertukaran gas. \n\nParu-paru Balita Lobus kanan (3 lobus) dan lobus kiri (2 lobus), dilapisi pleura licin untuk memudahkan gerakan saat bernapas. \n\nMekanisme Pernapasan Diafragma dan otot dada bekerja aktif mengembang dan mengempis paru-paru yang elastis secara ritmis. \n\n![Deskripsi Gambar](https://i.ibb.co.com/zHx4MpW1/gambar-anatomi-sistem-pernapasan-balita.png)\n\nPerbedaan paru-paru balita Normal VS Paru-paru balita pneumonia\n\n![Deskripsi Gambar](https://i.ibb.co.com/VY4m6TQx/gambar-paru-normal-vs-pneumonia.jpg)',
      mediaUrl: 'https://res.cloudinary.com/dajhxjagk/video/upload/v1773254486/Sesi_1_Latar_Belakang_n2r73t.mp4',
      mediaType: 'video'
    },
    '2': {
      id: '2',
      title: 'Penyebab & Faktor Risiko',
      description: 'Pahami pemicu utama infeksi paru-paru dan lingkungan apa saja yang meningkatkan risiko bagi Si Kecil.',
      category: 'Penyebab',
      image: 'https://i.ibb.co.com/21f1zvm9/Chat-GPT-Image-12-Mar-2026-03-47-23.png',
      content: 'Penyebab Penyebab pneumonia paling banyak dikarenakan oleh: \n\nVirus seperti Haemophillus influenza, \nBakteri yaitu staphylococcus aureus, serta streptococcus pneumonia, Pseudomonas aeruginosa, Klebsiella pneumoniae, Escherichia coli Proteus \nKuman atipik chlamydia dan mikoplasma \n![Deskripsi Gambar](https://i.ibb.co.com/fVWyvdrC/Picture1.png)\n\n Faktor Resiko kajadian Pneumonia \n\n1. Faktor Risiko "Pasti" (Terbukti Secara Ilmiah) \n\nKondisi Bayi: Berat Badan Lahir Rendah (BBLR < 2,5 kg) dan Gizi Buruk (stunting/wasting). \nPola Asuh: Kurang ASI eksklusif (berhenti sebelum 4 bulan) dan imunisasi tidak lengkap (terutama campak).\nLingkungan: Polusi udara dalam ruangan (asap bahan bakar memasak) dan kepadatan hunian (lebih dari 7 orang serumah). \nKesehatan Medis: Adanya infeksi HIV.\n\n2. Faktor Risiko "Mungkin Sekali" \n\nLingkungan & Sosial: Perokok pasif di rumah dan rendahnya tingkat pendidikan ibu mengenai pneumonia. \nBiologis: Jenis kelamin laki-laki, kelahiran prematur (< 37 minggu), dan anemia (Hb < 11 mg/dl). \nNutrisi Spesifik: Kekurangan Vitamin D dan kekurangan zat besi (Zinc). \n\n3. Faktor Risiko "Mungkin" \n\nRiwayat & Jarak Lahir: Jarak kelahiran terlalu dekat (< 24 bulan), urutan kelahiran (anak ke-4 atau lebih), dan riwayat pernah menderita pneumonia sebelumnya. \nLainnya: Penggunaan tempat penitipan anak (day care) dan defisiensi Vitamin A. \n\n4. Faktor Risiko Menurut Kemenkes RI \n\nSosial Ekonomi & Budaya: Mempengaruhi gaya hidup dan kemampuan akses gizi. \nPerilaku Pencarian Pengobatan: Kecepatan keluarga dalam membawa anak ke fasilitas kesehatan (care seeking behavior). \nKualitas Pelayanan: Kesiapan petugas kesehatan dalam memberikan penanganan. \n![Deskripsi Gambar](https://i.ibb.co.com/5W3qqkGY/Picture2.png)',
      mediaUrl: 'https://res.cloudinary.com/dajhxjagk/video/upload/v1773254485/Tanda_Gejala_Klasifikasi_Pneumonia_dan_Perjalanan_Penyakit_qa1u1r.mp4',
      mediaType: 'video'
    },
    '3': {
      id: '3',
      title: 'Gejala & Komplikasi',
      description: 'Tanda & Gejala, Klasifikasi Pneumonia, dan Perjalanan Penyakit',
      category: 'Gejala',
      image: 'https://i.ibb.co.com/Xf9djL6b/Chat-GPT-Image-12-Mar-2026-18-53-44.png',
      content: 'Tanda Dan Gejala\n\nSecara umum, pneumonia sering kali diawali dengan gejala Infeksi Saluran Pernapasan Atas (ISPA) yang kemudian berkembang menjadi kondisi yang lebih serius. \n\n1. Gejala Umum (Kunci Utama) Tanda yang paling sering muncul adalah: \n\nGangguan Pernapasan: Napas cepat (takipnea), tarikan dinding dada ke dalam (retraksi), dan napas cuping hidung. \nSuara Napas Tambahan: Terdengar suara crackles (seperti rontgen), wheezing (mengi), atau suara napas yang menurun. \nKondisi Tubuh: Demam tinggi, menggigil, batuk (kering atau berdahak), serta nyeri pada dada, perut, atau leher. \nPerubahan Perilaku: Anak tampak lemas (letargi), gelisah, sulit minum/menyusu, hingga warna kulit membiru (sianosis) karena kurang oksigen. \n\n3. Tanda Bahaya yang Perlu Diwaspadai Penelitian menunjukkan bahwa hampir 60% kasus pneumonia pada anak ditandai dengan dua hal utama yang bisa dilihat langsung oleh orang tua: \n\nNapas Cepat: Frekuensi napas yang melebihi batas normal sesuai usia. \nTarikan Dinding Dada: Dada tampak mencekung ke dalam saat anak menarik napas. \n\nCatatan Penting: Deteksi dini pada tanda-tanda di atas sangat krusial karena pneumonia dapat berkembang cepat menjadi kondisi berat (toksemia) jika tidak segera ditangani. \n\n![Deskripsi Gambar](https://i.ibb.co.com/bRBsj68n/Picture3.png) \n\nKlasifikasi Pneumonia \n\nPneumonia Berat: Ditandai dengan tarikan dinding dada ke dalam atau saturasi oksigen < 92%. \nPneumonia: Ditandai dengan napas cepat (Usia 2-<12 bulan: ≥50x/menit; Usia 12 bulan-<5 tahun: ≥40x/menit). \nBatuk Bukan Pneumonia: Hanya batuk pilek biasa tanpa napas cepat atau tarikan dinding dada \n![Deskripsi Gambar](https://i.ibb.co.com/ccVNWjY8/Picture4.png) \n\nPerjalanan Penyakit Pneumonia Balita \n\n![Deskripsi Gambar](https://i.ibb.co.com/rftj3sns/Picture5.png) \n\nKomplikasi \n\n1. Masalah pada Paru-Paru \n\nCairan atau Nanah di Paru (Efusi Pleura & Empiema): Adanya penumpukan cairan atau nanah di selaput paru. Tandanya biasanya si Kecil tetap demam tinggi meski sudah diobati dan terlihat sesak. \nParu-Paru Berlubang atau Rusak: Infeksi yang parah bisa membuat jaringan paru-paru luka, berlubang, atau bahkan kempis sehingga fungsi napas terganggu. \nParu-Paru Bocor (Pneumotoraks): Adanya udara yang terjebak di luar paru-paru yang membuat paru-paru tertekan. \n\n2. Masalah yang Menyebar ke Seluruh Tubuh \n\nInfeksi Darah (Sepsis): Kuman dari paru-paru masuk ke aliran darah dan menyebar ke seluruh tubuh. Ini sangat berbahaya karena bisa memicu syok (tekanan darah turun drastis). \nGagal Organ: Jika infeksi sudah terlalu berat, organ tubuh lain seperti ginjal atau jantung bisa ikut terganggu fungsinya. \n\n3. Tanda Khusus yang Perlu Diperhatikan (Menurut WHO) \n\nInfeksi Kulit Bernanah: Jika pneumonia disertai bintik-bintik bernanah di kulit, ini bisa jadi tanda pneumonia jenis stafilokokus yang cukup agresif. \nSesak Napas Berat: Segera bawa ke RS jika si Kecil terlihat sangat kesulitan bernapas (napas cuping hidung atau dada tampak mencekung ke dalam). \n![Deskripsi Gambar](https://i.ibb.co.com/Z1wBnrWv/Picture6.png)',
      mediaUrl: 'https://res.cloudinary.com/dajhxjagk/video/upload/v1773254480/Penyebab_Risiko_vesaop.mp4',
      mediaType: 'video'
    },
    '4': {
      id: '4',
      title: 'Pemeriksaan & Perawatan',
      description: 'Pemeriksaan diagnostik, Penatalaksanaan, Deteksi dini, perawatan Pencegahan',
      category: 'Perawatan',
      image: 'https://i.ibb.co.com/BKtNYN3m/Chat-GPT-Image-12-Mar-2026-18-57-58.png',
      content: 'Pemeriksaan Laboratorium \n\n1. Cek Darah Lengkap: \n\no Tujuannya: Melihat jumlah sel darah putih. Jika tinggi, tandanya ada infeksi bakteri yang sedang menyerang tubuh. \n\n2. Cek Penanda Radang (CRP/LED): \n\no Tujuannya: Mengetahui seberapa parah peradangan atau "luka" yang ada di paru-paru si Kecil. \n\n3. Cek Dahak (Sputum): \n\no Tujuannya: Mencari tahu jenis kuman penyebabnya agar dokter bisa memberikan jenis antibiotik yang paling pas. \n\n4. Cek Oksigen Darah (Gas Darah): \n\no Tujuannya: Dilakukan jika si Kecil sesak hebat, untuk memastikan apakah oksigen dalam darahnya masih cukup atau butuh bantuan alat napas. \n\n5. Biakan Darah (Kultur): \n\no Tujuannya: memastikan apakah kuman sudah menyebar dari paru-paru ke aliran darah (mencegah infeksi berat). \n\n![Deskripsi Gambar](https://i.ibb.co.com/nxTBw8z/Picture7.png) \n\nPenatalaksanaan \n\n1. Kapan Harus Dirawat di Rumah Sakit? \n\n• Jika anak terlihat sangat sesak napas atau kekurangan oksigen. \n\n• Jika anak lemas atau sulit minum dan sulit menelan obat. \n\n2. Perawatan Pendukung di Rumah/RS \n\n• Cairan & Nutrisi: Pastikan anak tidak dehidrasi/ kekurangan cairan dan tetap makan agar kuat melawan kuman. \n\n• Bantuan Napas: Pemberian oksigen atau bantuan mengeluarkan dahak agar jalan napas lega. \n\n3. Pemberian Antibiotik yang Tepat \n\n• Sesuai Umur: Jenis dan dosis antibiotik dibedakan antara bayi baru lahir, balita, hingga anak sekolah. \n\n• Harus Tuntas: Obat biasanya diberikan selama 10–14 hari. Jangan berhenti sebelum waktunya, meski anak sudah tidak demam (minimal bebas demam 3 hari baru boleh evaluasi berhenti). \n\n4. Pengobatan Khusus \n\n• Dokter akan memilih jenis obat yang paling kuat berdasarkan jenis kuman penyebabnya (misalnya untuk kuman Stafilokokus atau M. pneumonia). \n\nPenting untuk Ibu: Kunci kesembuhan adalah disiplin dosis dan menjaga asupan cairan si Kecil. \n\n![Deskripsi Gambar](https://i.ibb.co.com/bMggSnB3/Picture8.png) \n\nDeteksi Dini \n\nCara Cepat Deteksi Pneumonia (Paru-Paru Basah) di Rumah Ibu, ingatlah rumus "Lihat, Dengar, Pantau" jika si Kecil sedang batuk atau pilek: \n\n1. LIHAT: Hitung Kecepatan Napas Buka baju si Kecil dan lihat dadanya saat ia tenang/tidur. Ia disebut napas cepat jika dalam 1 menit: \n\n• Usia < 2 bulan: 60 kali atau lebih. \n\n• Usia 2-12 bulan: 50 kali atau lebih. \n\n• Usia 1-5 tahun: 40 kali atau lebih. \n\n• Waspada: Jika dada bagian bawah mencekung ke dalam setiap kali anak menarik napas. \n\n2. DENGAR: Suara Napas Dengarkan saat si Kecil bernapas: \n\n• Apakah ada suara "ngrok-ngrok" atau bunyi mengi (seperti siulan)? \n\n• Apakah anak bernapas sambil merintih atau terlihat sangat kecapekan untuk bernapas? \n\n3. PANTAU: Kondisi Tubuh Segera bawa ke dokter jika: \n\n• Demam tinggi yang tidak turun-turun. \n\n• Malas minum/menyusu (karena capek bernapas). \n\n• Bibir atau kuku mulai membiru (Ini tanda bahaya darurat!). \n\nIntinya: Jika anak batuk disertai napas cepat atau dada mencekung, jangan tunggu besok. Segera bawa ke Puskesmas atau Rumah Sakit terdekat. \n\n![Deskripsi Gambar](https://i.ibb.co.com/b5ZFvmSD/Picture9.png) \n\nPerawatan Balita \n\nIbu bisa menjadi "dokter pertama" bagi si Kecil dengan melakukan tiga langkah utama berikut: \n\n1. Pengukuran Frekuensi Napas Dihitung selama 1 menit saat anak tenang. Amati pergerakan dada/perut dan tanda napas cepat sesuai kriteria usia. \n\n2. Pengukuran Saturasi Oksigen Menggunakan oksimetri pada ibu jari anak untuk menilai kadar oksigen arteri (Normal: 95-100%). \n\n3. Penanganan Demam (Water Tepid Sponge) Teknik kompres air hangat untuk menurunkan suhu tubuh. \n\n• Persiapan: Baskom air hangat, waslap, termometer, dan handuk. \n\n• Prosedur: Ukur suhu awal, buka pakaian, lapisi tempat tidur dengan perlak, lalu letakkan waslap basah di ketiak dan lipatan paha selama 3-5 menit. \n\n4. Inhalasi Aromaterapi Peppermint Oil Tindakan non-farmakologi untuk mengatasi bersihan jalan napas yang tidak efektif. \n\n• Manfaat: Mengurangi sesak napas (dispnea), mengurangi peradangan, melegakan saluran napas, dan memberikan relaksasi. \n\n• Cara: Gunakan diffuser (50ml air + 4-5 tetes minyak) dengan jarak 10-15 cm dari anak selama 10-15 menit. \n\n5. Fisioterapi Dada Bertujuan membantu mengeluarkan dahak dan mengoptimalkan fungsi paru. \n\n• Teknik: Lakukan perkusi (ketukan dengan tangan ditangkupkan) selama 3-5 menit, dilanjutkan dengan vibrasi (getaran dengan posisi tangan rata) pada area paru yang mengalami penumpukan dahak. \n\n6. Nutrisi dan Pengobatan \n\n• Nutrisi: Berikan ASI eksklusif hingga 6 bulan karena mengandung zat anti-infeksi. Untuk balita di atas 6 bulan, berikan diet Tinggi Energi Tinggi Protein (TETP) dengan tekstur lunak (Buah, Susu, Telur, Ikan, Kacang-kacangan). \n\n• Catatan Diet: Kurangi karbohidrat untuk meminimalkan produksi CO2. Madu dapat diberikan untuk mengurangi batuk. \n\n• Antibiotik: Harus diberikan sesuai dosis, tepat waktu (misal setiap 8 jam untuk jadwal 3x sehari), dan wajib dihabiskan untuk membunuh bakteri sepenuhnya. \n\nTips Penting: Selalu catat hasil hitung napas dan suhu tubuh si Kecil di buku kecil agar mudah dilaporkan saat berkonsultasi dengan bidan atau dokter. \n\n![Deskripsi Gambar](https://i.ibb.co.com/jktdJnQ4/Picture10.png)',
      mediaUrl: 'https://res.cloudinary.com/dajhxjagk/video/upload/v1773254476/Pemeriksaan_diagnostik_Penatalaksanaan_Deteksi_dini_perawatan_Pencegahan_yutkpv.mp4',
      mediaType: 'video'
    },
    '5': {
      id: '5',
      title: 'Manajemen Psikologis Ibu',
      description: 'Manajemen Psikologis bagi ibu: Hipnosis 5 Jari',
      category: 'Psikologi',
      image: 'https://i.ibb.co.com/svLPSkkZ/Chat-GPT-Image-12-Mar-2026-19-07-11.png',
      content: 'Digunakan untuk menurunkan kecemasan pada anak/orang tua dengan menautkan ibu jari ke jari lainnya sambil membayangkan hal positif (tubuh sehat, orang tersayang, kesuksesan, dan tempat yang menyenangkan) \n\n![Deskripsi Gambar](https://i.ibb.co.com/j9pjyn4r/Picture11.png)',
      mediaUrl: 'https://res.cloudinary.com/dajhxjagk/video/upload/v1773254479/Hipnosis_5_jari_wyqvkk.mp4',
      mediaType: 'video'
    }
  },
  analytics: {
    totalUsers: 1,
    materiViews: 0,
    videoViews: 0,
    checkerUses: 0,
    materiStats: {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 0
    },
    activityData: [
      { date: 'Senin', views: 0 },
      { date: 'Selasa', views: 0 },
      { date: 'Rabu', views: 0 },
      { date: 'Kamis', views: 0 },
      { date: 'Jumat', views: 0 },
      { date: 'Sabtu', views: 0 },
      { date: 'Minggu', views: 0 },
    ]
  },
  videos: [
    {
      id: '1',
      title: 'Cara Menghitung Napas Balita yang Benar',
      description: 'Panduan visual langkah demi langkah cara menghitung frekuensi napas anak selama 1 menit penuh dengan menggunakan timer.',
      thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600&auto=format&fit=crop',
      duration: '03:45',
      views: 1200,
      category: 'Tutorial',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: '2',
      title: 'Mengenali Tarikan Dinding Dada ke Dalam',
      description: 'Video ini menunjukkan contoh nyata tarikan dinding dada bagian bawah ke dalam (chest indrawing) yang merupakan tanda bahaya pneumonia.',
      thumbnail: 'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=600&auto=format&fit=crop',
      duration: '02:15',
      views: 3400,
      category: 'Gejala',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Pentingnya Imunisasi PCV untuk Anak',
      description: 'Penjelasan dokter spesialis anak mengenai vaksin PCV (Pneumococcal Conjugate Vaccine) dalam mencegah pneumonia.',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop',
      duration: '05:30',
      views: 850,
      category: 'Pencegahan',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: '4',
      title: 'Pertolongan Pertama Anak Demam di Rumah',
      description: 'Langkah-langkah aman menurunkan demam anak di rumah sebelum dibawa ke dokter.',
      thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop',
      duration: '04:20',
      views: 5100,
      category: 'Penanganan',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ],
  mediaLibrary: []
};

interface AppContextType {
  state: AppState;
  user: User | null;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateLanding: (data: Partial<LandingData>) => void;
  updateSession: (id: string, data: Partial<SessionData>) => void;
  updateVideos: (videos: VideoData[]) => void;
  incrementVideoViews: (id: string) => void;
  addMedia: (media: MediaItem) => void;
  removeMedia: (id: string) => void;
  trackVisit: () => void;
  trackMateriView: (id: string) => void;
  trackVideoView: () => void;
  trackCheckerUse: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);

  // Seed database if empty
  const seedDatabase = async () => {
    try {
      const landingDoc = await getDoc(doc(db, 'appData', 'landing'));
      if (!landingDoc.exists()) {
        await setDoc(doc(db, 'appData', 'landing'), defaultState.landing);
      }

      const sessionsSnapshot = await getDocs(collection(db, 'sessions'));
      if (sessionsSnapshot.empty) {
        const batch = writeBatch(db);
        Object.values(defaultState.sessions).forEach(session => {
          batch.set(doc(db, 'sessions', session.id), session);
        });
        await batch.commit();
      }

      const videosSnapshot = await getDocs(collection(db, 'videos'));
      if (videosSnapshot.empty) {
        const batch = writeBatch(db);
        defaultState.videos.forEach(video => {
          batch.set(doc(db, 'videos', video.id), video);
        });
        await batch.commit();
      }
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if admin
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else if (currentUser.email === 'enzaa120@gmail.com') {
            setIsAdmin(true);
            // Bootstrap first admin
            await setDoc(doc(db, 'users', currentUser.uid), { email: currentUser.email, role: 'admin' }, { merge: true });
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          if (currentUser.email === 'enzaa120@gmail.com') setIsAdmin(true);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Listen to Landing Data
    const unsubLanding = onSnapshot(doc(db, 'appData', 'landing'), (doc) => {
      if (doc.exists()) {
        setState(prev => ({ ...prev, landing: doc.data() as LandingData }));
        setIsFirebaseInitialized(true);
      } else {
        // Seed if doesn't exist (only if admin to avoid permission errors)
        if (isAdmin) seedDatabase();
      }
    }, (error) => {
      console.error("Error fetching landing data:", error);
    });

    // Listen to Sessions
    const unsubSessions = onSnapshot(collection(db, 'sessions'), (snapshot) => {
      if (!snapshot.empty) {
        const sessionsData: Record<string, SessionData> = {};
        snapshot.forEach(doc => {
          sessionsData[doc.id] = doc.data() as SessionData;
        });
        setState(prev => ({ ...prev, sessions: sessionsData }));
      }
    }, (error) => {
      console.error("Error fetching sessions:", error);
    });

    // Listen to Videos
    const unsubVideos = onSnapshot(collection(db, 'videos'), (snapshot) => {
      if (!snapshot.empty) {
        const videosData: VideoData[] = [];
        snapshot.forEach(doc => {
          videosData.push(doc.data() as VideoData);
        });
        setState(prev => ({ ...prev, videos: videosData }));
      }
    }, (error) => {
      console.error("Error fetching videos:", error);
    });

    return () => {
      unsubLanding();
      unsubSessions();
      unsubVideos();
    };
  }, [isAdmin]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateLanding = async (data: Partial<LandingData>) => {
    const isEmergency = localStorage.getItem('sahabat_admin_auth') === 'true';
    if (!isAdmin && !isEmergency) return;
    try {
      await updateDoc(doc(db, 'appData', 'landing'), data);
    } catch (error) {
      console.error("Error updating landing:", error);
    }
  };

  const updateSession = async (id: string, data: Partial<SessionData>) => {
    const isEmergency = localStorage.getItem('sahabat_admin_auth') === 'true';
    if (!isAdmin && !isEmergency) return;
    try {
      await updateDoc(doc(db, 'sessions', id), data);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const updateVideos = async (videos: VideoData[]) => {
    const isEmergency = localStorage.getItem('sahabat_admin_auth') === 'true';
    if (!isAdmin && !isEmergency) return;
    try {
      const batch = writeBatch(db);
      videos.forEach(video => {
        batch.set(doc(db, 'videos', video.id), video);
      });
      await batch.commit();
    } catch (error) {
      console.error("Error updating videos:", error);
    }
  };

  const incrementVideoViews = async (id: string) => {
    const video = state.videos.find(v => v.id === id);
    if (video) {
      try {
        await updateDoc(doc(db, 'videos', id), { views: video.views + 1 });
      } catch (error) {
        console.error("Error incrementing video views:", error);
      }
    }
  };

  // Load local data on mount
  useEffect(() => {
    const savedMedia = localStorage.getItem('sahabat_media');
    const savedAnalytics = localStorage.getItem('sahabat_analytics');
    
    if (savedMedia || savedAnalytics) {
      setState(prev => ({
        ...prev,
        mediaLibrary: savedMedia ? JSON.parse(savedMedia) : prev.mediaLibrary,
        analytics: savedAnalytics ? JSON.parse(savedAnalytics) : prev.analytics
      }));
    }
  }, []);

  // Save local data when it changes
  useEffect(() => {
    localStorage.setItem('sahabat_media', JSON.stringify(state.mediaLibrary));
    localStorage.setItem('sahabat_analytics', JSON.stringify(state.analytics));
  }, [state.mediaLibrary, state.analytics]);

  const addMedia = (media: MediaItem) => {
    setState(prev => ({ ...prev, mediaLibrary: [media, ...prev.mediaLibrary] }));
  };

  const removeMedia = (id: string) => {
    setState(prev => ({ ...prev, mediaLibrary: prev.mediaLibrary.filter(m => m.id !== id) }));
  };

  const getTodayDay = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[new Date().getDay()];
  };

  const incrementActivity = (prev: AppState) => {
    const today = getTodayDay();
    const newActivityData = prev.analytics.activityData.map(item => 
      item.date === today ? { ...item, views: item.views + 1 } : item
    );
    return newActivityData;
  };

  const trackVisit = () => {
    if (!sessionStorage.getItem('has_visited')) {
      sessionStorage.setItem('has_visited', 'true');
      setState(prev => ({
        ...prev,
        analytics: {
          ...prev.analytics,
          totalUsers: prev.analytics.totalUsers + 1,
          activityData: incrementActivity(prev)
        }
      }));
    }
  };

  const trackMateriView = (id: string) => {
    setState(prev => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        materiViews: prev.analytics.materiViews + 1,
        materiStats: {
          ...prev.analytics.materiStats,
          [id]: (prev.analytics.materiStats[id] || 0) + 1
        },
        activityData: incrementActivity(prev)
      }
    }));
  };

  const trackVideoView = () => {
    setState(prev => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        videoViews: prev.analytics.videoViews + 1,
        activityData: incrementActivity(prev)
      }
    }));
  };

  const trackCheckerUse = () => {
    setState(prev => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        checkerUses: prev.analytics.checkerUses + 1,
        activityData: incrementActivity(prev)
      }
    }));
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      user,
      isAdmin,
      login,
      logout,
      updateLanding, 
      updateSession,
      updateVideos,
      incrementVideoViews,
      addMedia,
      removeMedia,
      trackVisit,
      trackMateriView,
      trackVideoView,
      trackCheckerUse
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

