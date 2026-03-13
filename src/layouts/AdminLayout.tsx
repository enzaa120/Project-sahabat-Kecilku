import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Baby, LayoutDashboard, BookOpen, UploadCloud, Video, LogOut, Search, Bell, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAppContext();

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-500 rounded-lg p-2 flex items-center justify-center">
            <Baby size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none text-blue-500">Sahabat SiKecil</h1>
            <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link to="/admin" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${location.pathname === '/admin' ? 'bg-blue-50 text-blue-500 border-l-4 border-blue-500' : 'text-slate-600 hover:bg-slate-50'}`}>
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/admin/materi" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${location.pathname.startsWith('/admin/materi') ? 'bg-blue-50 text-blue-500 border-l-4 border-blue-500' : 'text-slate-600 hover:bg-slate-50'}`}>
            <BookOpen size={20} />
            <span className="font-medium">Materi</span>
          </Link>
          <Link to="/admin/upload" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${location.pathname === '/admin/upload' ? 'bg-blue-50 text-blue-500 border-l-4 border-blue-500' : 'text-slate-600 hover:bg-slate-50'}`}>
            <UploadCloud size={20} />
            <span className="font-medium">Upload Media</span>
          </Link>
          <Link to="/admin/video" className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${location.pathname === '/admin/video' ? 'bg-blue-50 text-blue-500 border-l-4 border-blue-500' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Video size={20} />
            <span className="font-medium">Video</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors group w-full">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Cari materi..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-bold text-sm transition-colors">
              <ExternalLink size={16} />
              Lihat Website
            </Link>
            <button className="relative text-slate-500 hover:text-blue-500 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{user?.displayName || 'Admin Sahabat'}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              {user?.photoURL && (
                <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
              )}
            </div>
          </div>
        </header>
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
