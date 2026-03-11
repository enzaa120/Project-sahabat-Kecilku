export default function KebijakanPrivasi() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <div className="bg-blue-500 text-white px-6 md:px-20 py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 text-center items-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Kebijakan Privasi</h1>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-20 py-16">
        <div className="max-w-[800px] mx-auto prose prose-slate prose-lg max-w-none">
          <p className="lead text-xl text-slate-600 leading-relaxed mb-8">
            Kebijakan Privasi Sahabat SiKecil menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan platform kami.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">1. Pengumpulan Informasi</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Kami dapat mengumpulkan informasi yang Anda berikan secara sukarela saat menggunakan fitur-fitur di platform kami, seperti:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-8">
            <li>Informasi kontak (seperti nama, alamat email) saat Anda mendaftar atau berlangganan berita.</li>
            <li>Data kesehatan anak (seperti usia, frekuensi napas, gejala) yang Anda masukkan ke dalam fitur Health Checker.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">2. Penggunaan Informasi</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Informasi yang kami kumpulkan digunakan untuk tujuan berikut:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-8">
            <li>Memberikan hasil analisis sementara melalui fitur Health Checker.</li>
            <li>Meningkatkan kualitas konten edukasi dan layanan kami.</li>
            <li>Mengirimkan informasi kesehatan, pembaruan, dan berita terkait platform (jika Anda berlangganan).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">3. Perlindungan Data</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Kami berkomitmen untuk menjaga kerahasiaan data Anda. Informasi yang dimasukkan ke dalam fitur Health Checker hanya digunakan untuk memberikan hasil analisis sementara dan <strong>tidak disimpan secara permanen di server kami</strong> tanpa izin eksplisit dari Anda.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">4. Perubahan Kebijakan</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui platform kami. Dengan terus menggunakan platform setelah perubahan tersebut, Anda menyetujui Kebijakan Privasi yang telah diperbarui.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">5. Hubungi Kami</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi kami melalui informasi kontak yang tersedia di platform.
          </p>
        </div>
      </div>
    </div>
  );
}
