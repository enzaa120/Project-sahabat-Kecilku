import React, { createContext, useContext, useState, useEffect } from 'react';

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
      description: 'Mengenal dasar-dasar pneumonia dan mengapa kondisi ini sangat penting untuk dipahami oleh setiap orang tua.',
      category: 'Dasar',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1920&auto=format&fit=crop',
      content: 'Pneumonia adalah infeksi akut yang mengenai jaringan paru-paru (alveoli). Infeksi ini menyebabkan kantung udara di dalam paru-paru meradang dan membengkak, serta dipenuhi cairan atau nanah.\n\n![Ilustrasi Paru-paru](https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=800&auto=format&fit=crop)\n\n## Penyebab Utama Pneumonia\nPneumonia pada balita dapat disebabkan oleh berbagai mikroorganisme, antara lain:\n- **Bakteri:** *Streptococcus pneumoniae* adalah penyebab paling umum pneumonia bakteri pada anak-anak.\n- **Virus:** Virus pernapasan syncytial (RSV) adalah penyebab paling umum pneumonia virus.\n- **Jamur:** Lebih jarang terjadi, biasanya pada anak dengan sistem kekebalan tubuh yang sangat lemah.\n\n> **Fakta Penting:** Pneumonia bukan penyakit keturunan dan tidak disebabkan oleh udara dingin atau kipas angin secara langsung, melainkan oleh infeksi kuman.\n\n## Bagaimana Penularannya?\nPneumonia menyebar melalui percikan air liur (droplet) saat penderita batuk atau bersin. Kuman juga dapat menyebar melalui darah, terutama selama atau segera setelah kelahiran.',
      mediaUrl: '',
      mediaType: 'none'
    },
    '2': {
      id: '2',
      title: 'Penyebab & Faktor Risiko',
      description: 'Pahami pemicu utama infeksi paru-paru dan lingkungan apa saja yang meningkatkan risiko bagi Si Kecil.',
      category: 'Penyebab',
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1920&auto=format&fit=crop',
      content: 'Memahami penyebab dan faktor risiko pneumonia sangat penting untuk pencegahan. Lingkungan dan kondisi kesehatan anak sangat berpengaruh.\n\n## Faktor Lingkungan\nPolusi udara di dalam ruangan, seperti asap rokok atau asap dari bahan bakar padat untuk memasak, dapat meningkatkan risiko pneumonia secara signifikan.',
      mediaUrl: '',
      mediaType: 'none'
    },
    '3': {
      id: '3',
      title: 'Gejala & Komplikasi',
      description: 'Cara membedakan batuk biasa dengan tanda bahaya pneumonia serta waspada terhadap komplikasi lanjut.',
      category: 'Gejala',
      image: 'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=1920&auto=format&fit=crop',
      content: 'Gejala pneumonia bisa bervariasi dari ringan hingga parah. Mengenali tanda bahaya sejak dini dapat menyelamatkan nyawa anak.\n\n## Tanda Bahaya Utama\n- Napas cepat (takipnea).\n- Tarikan dinding dada bagian bawah ke dalam saat menarik napas (chest indrawing).\n- Napas berbunyi (mengi atau stridor).',
      mediaUrl: '',
      mediaType: 'none'
    },
    '4': {
      id: '4',
      title: 'Pemeriksaan & Perawatan',
      description: 'Langkah medis yang akan ditempuh dokter dan panduan perawatan mandiri di rumah selama masa pemulihan.',
      category: 'Perawatan',
      image: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?q=80&w=1920&auto=format&fit=crop',
      content: 'Perawatan pneumonia bergantung pada penyebab dan tingkat keparahannya. Dokter akan menentukan tindakan yang paling tepat.\n\n## Perawatan di Rumah\nPastikan anak banyak istirahat dan minum cukup cairan. Berikan obat sesuai resep dokter dan jangan hentikan antibiotik sebelum waktunya meskipun anak sudah tampak sehat.',
      mediaUrl: '',
      mediaType: 'none'
    },
    '5': {
      id: '5',
      title: 'Manajemen Psikologis Ibu',
      description: 'Menjaga kesehatan mental dan ketenangan pikiran ibu saat mendampingi buah hati yang sedang sakit.',
      category: 'Psikologi',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1920&auto=format&fit=crop',
      content: 'Merawat anak yang sakit bisa sangat menguras emosi dan fisik. Penting bagi ibu untuk juga menjaga kesehatan mentalnya sendiri.\n\n## Tips Menjaga Ketenangan\nJangan ragu untuk meminta bantuan dari keluarga atau teman. Luangkan waktu sejenak untuk beristirahat dan melakukan hal yang menenangkan pikiran.',
      mediaUrl: '',
      mediaType: 'none'
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
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('sahabat_sikecil_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          landing: { ...defaultState.landing, ...parsed.landing },
          sessions: { ...defaultState.sessions, ...parsed.sessions },
          analytics: { ...defaultState.analytics, ...(parsed.analytics || {}) },
          videos: parsed.videos || defaultState.videos,
          mediaLibrary: parsed.mediaLibrary || defaultState.mediaLibrary
        };
      } catch (e) {
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('sahabat_sikecil_data', JSON.stringify(state));
  }, [state]);

  const updateLanding = (data: Partial<LandingData>) => {
    setState(prev => ({ ...prev, landing: { ...prev.landing, ...data } }));
  };

  const updateSession = (id: string, data: Partial<SessionData>) => {
    setState(prev => ({
      ...prev,
      sessions: {
        ...prev.sessions,
        [id]: { ...prev.sessions[id], ...data }
      }
    }));
  };

  const updateVideos = (videos: VideoData[]) => {
    setState(prev => ({ ...prev, videos }));
  };

  const incrementVideoViews = (id: string) => {
    setState(prev => ({
      ...prev,
      videos: prev.videos.map(video => 
        video.id === id ? { ...video, views: (typeof video.views === 'number' ? video.views : 0) + 1 } : video
      )
    }));
  };

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
