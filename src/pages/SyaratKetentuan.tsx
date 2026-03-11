export default function SyaratKetentuan() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <div className="bg-blue-500 text-white px-6 md:px-20 py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 text-center items-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Syarat & Ketentuan</h1>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Harap baca syarat dan ketentuan ini dengan saksama sebelum menggunakan platform Sahabat SiKecil.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-20 py-16">
        <div className="max-w-[800px] mx-auto prose prose-slate prose-lg max-w-none">
          <p className="lead text-xl text-slate-600 leading-relaxed mb-8">
            Dengan menggunakan platform Sahabat SiKecil, Anda menyetujui syarat dan ketentuan berikut. Jika Anda tidak setuju dengan syarat dan ketentuan ini, mohon untuk tidak menggunakan platform ini.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">1. Penggunaan Platform</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Platform Sahabat SiKecil disediakan untuk tujuan edukasi dan informasi kesehatan bagi orang tua. Anda setuju untuk menggunakan platform ini hanya untuk tujuan yang sah dan sesuai dengan syarat dan ketentuan ini.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-8">
            <li>Anda tidak diperkenankan menggunakan platform ini untuk tujuan ilegal atau melanggar hak orang lain.</li>
            <li>Anda tidak diperkenankan mengunggah atau mendistribusikan konten yang berbahaya, menyinggung, atau melanggar hak kekayaan intelektual.</li>
            <li>Anda bertanggung jawab atas segala aktivitas yang terjadi di bawah akun Anda (jika ada).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">2. Penafian Medis</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Informasi yang disediakan di platform ini bersifat edukatif dan <strong>bukan merupakan pengganti nasihat, diagnosis, atau perawatan medis profesional</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-8">
            <li>Fitur Health Checker adalah alat bantu skrining awal dan tidak boleh digunakan sebagai satu-satunya dasar untuk mengambil keputusan medis.</li>
            <li>Anda harus selalu berkonsultasi dengan dokter atau tenaga medis profesional untuk kondisi kesehatan anak Anda.</li>
            <li>Kami tidak bertanggung jawab atas segala kerugian atau kerusakan yang timbul akibat ketergantungan pada informasi di platform ini.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">3. Hak Kekayaan Intelektual</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Seluruh konten, desain, logo, dan materi lain di platform ini adalah milik Sahabat SiKecil atau pihak ketiga yang memberikan lisensi kepada kami. Anda tidak diperkenankan menyalin, mendistribusikan, atau memodifikasi konten tanpa izin tertulis dari kami.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">4. Batasan Tanggung Jawab</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Kami berusaha menyajikan informasi seakurat mungkin, namun tidak menjamin keakuratan, kelengkapan, atau keandalan konten di platform ini. Kami tidak bertanggung jawab atas segala kesalahan atau kelalaian dalam konten.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            Penggunaan platform ini sepenuhnya merupakan tanggung jawab pengguna. Kami tidak bertanggung jawab atas segala kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan platform ini.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">5. Perubahan Syarat & Ketentuan</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Kami dapat memperbarui Syarat & Ketentuan ini dari waktu ke waktu. Perubahan akan diberitahukan melalui platform kami. Dengan terus menggunakan platform setelah perubahan tersebut, Anda menyetujui Syarat & Ketentuan yang telah diperbarui.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">6. Hukum yang Berlaku</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Syarat & Ketentuan ini tunduk pada dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala perselisihan yang timbul dari atau terkait dengan Syarat & Ketentuan ini akan diselesaikan melalui yurisdiksi pengadilan yang berwenang di Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
