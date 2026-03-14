import { Users, FileText, Video, Activity, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { state } = useAppContext();
  const { analytics } = state;

  const stats = [
    { title: 'Total Pengguna', value: (analytics?.totalUsers || 0).toLocaleString(), change: '+8%', isPositive: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Materi Dibaca', value: (analytics?.materiViews || 0).toLocaleString(), change: '-3%', isPositive: false, icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Video Ditonton', value: (analytics?.videoViews || 0).toLocaleString(), change: '+24%', isPositive: true, icon: Video, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Penggunaan Checker', value: (analytics?.checkerUses || 0).toLocaleString(), change: '+12%', isPositive: true, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  // Sort materi by views
  const popularMateri = Object.entries(analytics?.materiStats || {})
    .map(([id, views]) => ({
      id,
      title: state.sessions[id]?.title || `Sesi ${id}`,
      category: state.sessions[id]?.category || 'Materi',
      views: Number(views) || 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  // Format activity data for chart
  const chartData = (analytics?.activityData || []).map(item => ({
    date: item.date,
    pengguna: item.views || 0
  }));

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pusat Kontrol Admin</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola semua konten website dari sini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`size-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Aktivitas Pengguna (7 Hari Terakhir)</h3>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Line type="monotone" dataKey="pengguna" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex-1 h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <TrendingUp size={32} />
                  <p className="text-sm font-medium">Belum ada data aktivitas</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Materi Populer</h3>
          </div>
          <div className="flex flex-col gap-4">
            {popularMateri.length > 0 ? popularMateri.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="size-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                </div>
                <div className="text-sm font-bold text-slate-700 shrink-0">
                  {item.views >= 1000 ? (item.views / 1000).toFixed(1) + 'K' : item.views}
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-500 text-sm">Belum ada materi yang dibaca</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
