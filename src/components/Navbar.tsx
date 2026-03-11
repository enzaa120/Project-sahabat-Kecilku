import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Baby, Bell, User, Settings, LogOut, FileText } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  const [clicks, setClicks] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks >= 3) {
      navigate('/admin');
      setClicks(0);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    } else {
      navigate('/');
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        setClicks(0);
      }, 1000); // Reset clicks after 1 second
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotif(false);
      setShowProfile(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-blue-500/10 bg-white/80 backdrop-blur-md px-6 md:px-20 py-4 sticky top-0 z-50">
      <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 text-blue-500 select-none">
        <div className="size-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
          <Baby size={20} />
        </div>
        <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">Sahabat SiKecil</h2>
      </Link>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-slate-700 hover:text-blue-500'}`}>Beranda</Link>
          <Link to="/materi" className={`text-sm font-semibold transition-colors ${location.pathname.startsWith('/materi') ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-slate-700 hover:text-blue-500'}`}>Materi Edukasi</Link>
          <Link to="/checker" className={`text-sm font-semibold transition-colors ${location.pathname === '/checker' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-slate-700 hover:text-blue-500'}`}>Health Checker</Link>
          <Link to="/video" className={`text-sm font-semibold transition-colors ${location.pathname === '/video' ? 'text-blue-500 border-b-2 border-blue-500 pb-1' : 'text-slate-700 hover:text-blue-500'}`}>Video Animasi</Link>
        </nav>
        <div className="flex gap-3 items-center relative">
          {/* Bell Icon */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowNotif(!showNotif); setShowProfile(false); }}
              className="flex items-center justify-center rounded-full h-10 w-10 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors relative"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-slate-100"></span>
            </button>
            
            {/* Notification Dropdown */}
            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 py-2" onClick={e => e.stopPropagation()}>
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900">Notifikasi</h3>
                  <span className="text-xs text-blue-500 font-semibold cursor-pointer">Tandai sudah dibaca</span>
                </div>
                <div className="flex flex-col max-h-[300px] overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex gap-3 border-b border-slate-50">
                    <div className="size-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0">
                      <Baby size={20} />
                    </div>
                    <div className="whitespace-normal">
                      <p className="text-sm text-slate-900 font-medium">Waktunya Cek Kesehatan Si Kecil!</p>
                      <p className="text-xs text-slate-500 mt-1">Lakukan skrining rutin menggunakan Health Checker.</p>
                      <p className="text-xs text-slate-400 mt-2">2 jam yang lalu</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex gap-3">
                    <div className="size-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="whitespace-normal">
                      <p className="text-sm text-slate-900 font-medium">Materi Baru Ditambahkan</p>
                      <p className="text-xs text-slate-500 mt-1">Modul "Manajemen Psikologis Ibu" sekarang tersedia.</p>
                      <p className="text-xs text-slate-400 mt-2">1 hari yang lalu</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-slate-100 text-center">
                  <span className="text-sm text-blue-500 font-medium cursor-pointer hover:underline">Lihat Semua Notifikasi</span>
                </div>
              </div>
            )}
          </div>

          {/* User Icon & Profile Picture */}
          <div className="relative flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); setShowNotif(false); }}
              className="flex items-center justify-center rounded-full h-10 w-10 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <User size={18} />
            </button>
            <div 
              onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); setShowNotif(false); }}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-orange-200 ml-1 cursor-pointer hover:border-orange-400 transition-colors" 
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop")' }}
            ></div>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-12 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 py-2" onClick={e => e.stopPropagation()}>
                <div className="px-4 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border border-slate-200" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop")' }}></div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Bunda Sarah</h3>
                    <p className="text-xs text-slate-500">bunda.sarah@email.com</p>
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <Link to="/" className="px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-500 flex items-center gap-3 transition-colors">
                    <User size={16} /> Profil Saya
                  </Link>
                  <Link to="/" className="px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-500 flex items-center gap-3 transition-colors">
                    <Settings size={16} /> Pengaturan Akun
                  </Link>
                </div>
                <div className="border-t border-slate-100 py-2">
                  <button className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors text-left">
                    <LogOut size={16} /> Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
