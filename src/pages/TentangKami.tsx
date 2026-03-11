import { BookOpen, Heart, Shield, Users } from 'lucide-react';

export default function TentangKami() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-blue-500 text-white px-6 md:px-20 py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 text-center items-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Tentang Sahabat SiKecil</h1>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Platform edukasi kesehatan terpercaya yang didedikasikan untuk membantu orang tua di Indonesia dalam mencegah, mengenali, dan menangani pneumonia pada balita.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-20 py-16">
        <div className="max-w-[800px] mx-auto flex flex-col gap-12">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="lead text-xl text-slate-600 leading-relaxed">
              Pneumonia masih menjadi salah satu penyebab utama kesakitan dan kematian pada balita di Indonesia. Kami menyadari bahwa edukasi yang tepat dan deteksi dini adalah kunci utama untuk menyelamatkan nyawa anak-anak kita.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Sahabat SiKecil lahir dari kepedulian terhadap kesehatan pernapasan anak. Kami bekerja sama dengan para ahli kesehatan, dokter spesialis anak, dan perawat anak untuk menyediakan informasi yang akurat, mudah dipahami, dan dapat diandalkan oleh setiap orang tua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="size-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Visi Kami</h3>
              <p className="text-slate-600 leading-relaxed">
                Menjadi mitra terpercaya bagi setiap orang tua di Indonesia dalam mewujudkan generasi anak yang sehat, kuat, dan bebas dari bahaya pneumonia.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="size-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Misi Kami</h3>
              <p className="text-slate-600 leading-relaxed">
                Menyediakan edukasi kesehatan yang mudah diakses, alat skrining mandiri yang praktis, dan dukungan komunitas untuk meningkatkan kesadaran orang tua.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Nilai-Nilai Kami</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center gap-3">
                <BookOpen size={32} className="text-blue-500" />
                <h4 className="font-bold text-slate-900">Edukasi</h4>
                <p className="text-sm text-slate-600">Memberikan pengetahuan yang valid dan berbasis bukti medis.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <Users size={32} className="text-blue-500" />
                <h4 className="font-bold text-slate-900">Kepedulian</h4>
                <p className="text-sm text-slate-600">Mendukung orang tua dengan empati dan pemahaman.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <Shield size={32} className="text-blue-500" />
                <h4 className="font-bold text-slate-900">Kepercayaan</h4>
                <p className="text-sm text-slate-600">Menjaga privasi dan memberikan informasi yang dapat diandalkan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
