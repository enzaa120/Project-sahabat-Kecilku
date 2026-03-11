import { BookOpen, Stethoscope, PlayCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

export default function LandingPage() {
  const { state, trackVisit } = useAppContext();
  const { landing } = state;

  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="px-6 md:px-20 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex flex-col gap-4 text-left">
              <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold w-fit uppercase tracking-widest">Kesehatan Balita</span>
              <h1 className="text-slate-900 text-4xl md:text-6xl font-black leading-tight tracking-tight">
                {landing.heroTitle}
              </h1>
              <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
                {landing.heroSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/materi" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-blue-500 text-white text-lg font-bold shadow-xl shadow-blue-500/30 hover:scale-[1.02] transition-transform">
                Pelajari Sekarang
              </Link>
              <Link to="/video" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white border-2 border-blue-500/10 text-blue-500 text-lg font-bold hover:bg-blue-50 transition-colors">
                Lihat Video
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-[540px]">
            <div className="relative aspect-square rounded-2xl bg-orange-50 overflow-hidden shadow-2xl">
              <img src={landing.heroImage} alt="Ibu dan anak" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl flex items-center gap-4 border border-white">
                <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">Informasi Tervalidasi</p>
                  <p className="text-slate-500 text-xs">Ditinjau oleh Ahli Kesehatan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6 md:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center mb-16 gap-3">
            <h2 className="text-slate-900 text-3xl md:text-4xl font-bold tracking-tight">Fitur Utama Sahabat SiKecil</h2>
            <p className="text-slate-500 max-w-2xl">Kami menyediakan berbagai alat dan sumber daya untuk membantu Anda menjaga kesehatan pernapasan buah hati Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group flex flex-col gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-8 hover:shadow-xl hover:shadow-blue-500/5 transition-all hover:-translate-y-1">
              <div className="size-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <BookOpen size={32} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-slate-900 text-xl font-bold">Edukasi Materi</h3>
                <p className="text-slate-600 leading-relaxed">Pahami secara mendalam tentang gejala, penyebab, dan langkah-langkah pencegahan pneumonia yang efektif.</p>
              </div>
              <Link to="/materi" className="text-blue-500 font-bold text-sm flex items-center gap-2 mt-auto">
                Baca Selengkapnya <ArrowRight size={16} />
              </Link>
            </div>
            {/* Feature 2 */}
            <div className="group flex flex-col gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-8 hover:shadow-xl hover:shadow-emerald-500/5 transition-all hover:-translate-y-1">
              <div className="size-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Stethoscope size={32} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-slate-900 text-xl font-bold">Health Checker</h3>
                <p className="text-slate-600 leading-relaxed">Alat skrining mandiri yang mudah digunakan untuk memantau frekuensi napas dan tanda darurat pada balita.</p>
              </div>
              <Link to="/checker" className="text-emerald-600 font-bold text-sm flex items-center gap-2 mt-auto">
                Cek Sekarang <ArrowRight size={16} />
              </Link>
            </div>
            {/* Feature 3 */}
            <div className="group flex flex-col gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-8 hover:shadow-xl hover:shadow-orange-500/5 transition-all hover:-translate-y-1">
              <div className="size-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center group-hover:bg-orange-400 group-hover:text-white transition-colors">
                <PlayCircle size={32} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-slate-900 text-xl font-bold">Video Animasi</h3>
                <p className="text-slate-600 leading-relaxed">Tonton video animasi edukatif mengenai cara penanganan pertama pneumonia di rumah.</p>
              </div>
              <Link to="/video" className="text-orange-600 font-bold text-sm flex items-center gap-2 mt-auto">
                Tonton Video <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Awareness Banner */}
      <div className="px-6 md:px-20 py-20 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 rounded-3xl bg-blue-500/5 p-8 md:p-12 border border-blue-500/10">
            <div className="flex flex-[1.5] flex-col gap-6 justify-center">
              <div className="flex flex-col gap-3">
                <h3 className="text-slate-900 text-2xl md:text-3xl font-bold leading-tight">Kenapa Pneumonia Penting Diwaspadai?</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Pneumonia tetap menjadi penyebab utama kematian balita di seluruh dunia, menyumbang 14% dari semua kematian anak di bawah usia 5 tahun. Deteksi dini adalah kunci keselamatan anak Anda.
                </p>
              </div>
              <Link to="/materi" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform w-fit">
                Buka Panduan Lengkap
              </Link>
            </div>
            <div className="flex-1 min-h-[240px] rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop" alt="Alat kesehatan" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
