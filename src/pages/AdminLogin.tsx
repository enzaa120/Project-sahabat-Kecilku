import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, LogIn, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AdminLogin() {
  const { login, loginWithRedirect, user, isAdmin } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-blocked') {
        setError('Popup diblokir oleh browser. Izinkan popup untuk login.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('Domain ini belum diizinkan di Firebase Console. Tambahkan URL ini ke Authorized Domains.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Login dibatalkan. Silakan coba lagi.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Permintaan login sedang diproses. Silakan tunggu.');
      } else if (err.message && err.message.includes('Cross-Origin')) {
        setError('Terjadi masalah keamanan browser (Cross-Origin). Coba buka website ini di tab baru.');
      } else {
        setError(err.message || 'Terjadi kesalahan saat login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loginWithRedirect();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat login redirect.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="size-16 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Login Admin</h1>
          <p className="text-slate-500 text-sm mt-2">Gunakan akun Google Anda untuk mengakses panel kontrol.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={20} />} 
            {isLoading ? 'Memproses...' : 'Login dengan Google (Popup)'}
          </button>
          
          <button 
            type="button" 
            onClick={handleRedirectLogin}
            disabled={isLoading}
            className="w-full bg-white text-blue-500 border-2 border-blue-500 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={20} />} 
            Login Alternatif (Redirect)
          </button>
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
              {error}
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center mb-3">Jika login Google bermasalah, gunakan akses darurat:</p>
            <button 
              type="button"
              onClick={() => {
                localStorage.setItem('sahabat_admin_auth', 'true');
                navigate('/admin');
              }}
              className="w-full bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-200 transition-colors text-sm"
            >
              Masuk Mode Darurat
            </button>
          </div>

          {user && !isAdmin && (
            <p className="text-red-500 text-sm mt-2 text-center">Akun Anda ({user.email}) tidak memiliki akses admin.</p>
          )}
        </form>
      </div>
    </div>
  );
}
