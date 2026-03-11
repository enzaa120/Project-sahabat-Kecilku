import { Outlet } from 'react-router-dom';
import { Baby, Bell, Menu } from 'lucide-react';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white px-6 md:px-40 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="text-blue-500">
            <Baby size={32} />
          </div>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Sahabat SiKecil</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700">
            <Bell size={20} />
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700 md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </header>
      <main className="flex-1 px-4 md:px-40 py-8">
        <Outlet />
      </main>
    </div>
  );
}
