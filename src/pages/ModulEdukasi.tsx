import { Info, Bug, AlertTriangle, PlusSquare, Brain, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function ModulEdukasi() {
  const { state } = useAppContext();
  const sessions = Object.values(state.sessions || {}).filter((s: any) => s && s.id) as any[];

  // Map icons and colors based on ID for visual consistency
  const getVisuals = (id: string) => {
    switch(id) {
      case '1': return { icon: Info, bgColor: 'bg-blue-50', iconColor: 'text-blue-500', badgeColor: 'bg-blue-100 text-blue-600' };
      case '2': return { icon: Bug, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-500', badgeColor: 'bg-emerald-100 text-emerald-600' };
      case '3': return { icon: AlertTriangle, bgColor: 'bg-orange-50', iconColor: 'text-orange-500', badgeColor: 'bg-orange-100 text-orange-600' };
      case '4': return { icon: PlusSquare, bgColor: 'bg-sky-50', iconColor: 'text-sky-500', badgeColor: 'bg-sky-100 text-sky-600' };
      case '5': return { icon: Brain, bgColor: 'bg-green-50', iconColor: 'text-green-500', badgeColor: 'bg-green-100 text-green-600' };
      default: return { icon: Info, bgColor: 'bg-slate-50', iconColor: 'text-slate-500', badgeColor: 'bg-slate-100 text-slate-600' };
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fafafa]">
      <div className="px-6 md:px-20 py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h4 className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-3">Modul Edukasi</h4>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Waspada Pneumonia</h1>
            <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
              Panduan lengkap bagi orang tua untuk memahami, mencegah, dan menangani pneumonia pada anak dengan pendekatan yang ramah dan menenangkan.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((modul) => {
              const visuals = getVisuals(modul.id);
              return (
                <div key={modul.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                  <div className={`h-48 flex items-center justify-center ${modul.iconImage ? 'bg-slate-50' : visuals.bgColor}`}>
                    {modul.iconImage ? (
                      <img src={modul.iconImage} alt={`Ikon ${modul.title}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <visuals.icon size={64} className={visuals.iconColor} fill="currentColor" />
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${visuals.badgeColor}`}>SESI {modul.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{modul.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">{modul.description}</p>
                    <Link to={`/materi/${modul.id}`} className="text-blue-500 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all mt-auto">
                      Mulai Belajar <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Health Checker Banner */}
          <div className="mt-12 bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="size-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                <HelpCircle size={32} fill="currentColor" className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cek Kondisi Si Kecil</h3>
                <p className="text-slate-600 text-sm">Gunakan fitur Health Checker untuk deteksi dini gejala pneumonia pada anak Anda.</p>
              </div>
            </div>
            <Link to="/checker" className="bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl whitespace-nowrap hover:bg-blue-600 transition-colors">
              Cek Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
