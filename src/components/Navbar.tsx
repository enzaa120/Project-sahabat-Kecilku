import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Baby } from 'lucide-react';

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
        </div>
      </div>
    </header>
  );
}
