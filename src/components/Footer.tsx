import { Baby, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-6 md:px-20 mt-auto">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6 col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 text-white">
            <div className="size-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Baby size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold">Sahabat SiKecil</h2>
          </div>
          <p className="text-sm leading-relaxed">Platform edukasi kesehatan terpercaya untuk orang tua dalam upaya pencegahan pneumonia pada balita di Indonesia.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Menu Utama</h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li><Link to="/" className="hover:text-blue-500 transition-colors">Beranda</Link></li>
            <li><Link to="/materi" className="hover:text-blue-500 transition-colors">Materi Edukasi</Link></li>
            <li><Link to="/checker" className="hover:text-blue-500 transition-colors">Health Checker</Link></li>
            <li><Link to="/video" className="hover:text-blue-500 transition-colors">Video Tutorial</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Informasi</h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li><Link to="/tentang-kami" className="hover:text-blue-500 transition-colors">Tentang Kami</Link></li>
            <li className="flex flex-col gap-1 mt-2 mb-2">
              <span className="text-white font-semibold">Kontak Ahli:</span>
              <span className="text-slate-400">+62 819-4494-2421</span>
              <span className="text-slate-400">Ns. Novi Enis Rosuliana, M.Kep., Sp.Kep. An.</span>
              <span className="text-slate-400">Keahlian: Keperawatan Anak</span>
            </li>
            <li><Link to="/kebijakan-privasi" className="hover:text-blue-500 transition-colors">Kebijakan Privasi</Link></li>
            <li><Link to="/syarat-ketentuan" className="hover:text-blue-500 transition-colors">Syarat & Ketentuan</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Langganan Berita</h4>
          <p className="text-xs mb-4">Dapatkan tips kesehatan mingguan untuk si kecil.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email Anda" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none" />
            <button className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        <p>© 2026 Sahabat SiKecil. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
