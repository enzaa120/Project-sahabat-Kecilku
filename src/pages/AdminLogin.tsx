import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, LogIn } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AdminLogin() {
  const { login, user, isAdmin } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login();
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
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 mt-2">
            <LogIn size={20} /> Login dengan Google
          </button>
          {user && !isAdmin && (
            <p className="text-red-500 text-sm mt-2 text-center">Akun Anda tidak memiliki akses admin.</p>
          )}
        </form>
      </div>
    </div>
  );
}
