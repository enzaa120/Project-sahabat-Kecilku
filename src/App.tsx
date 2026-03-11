import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ModulEdukasi from './pages/ModulEdukasi';
import DetailSesi from './pages/DetailSesi';
import PneumoniaChecker from './pages/PneumoniaChecker';
import VideoEdukasi from './pages/VideoEdukasi';
import AdminDashboard from './pages/AdminDashboard';
import AdminMateri from './pages/AdminMateri';
import AdminUpload from './pages/AdminUpload';
import AdminVideo from './pages/AdminVideo';
import AdminLogin from './pages/AdminLogin';
import TentangKami from './pages/TentangKami';
import KebijakanPrivasi from './pages/KebijakanPrivasi';
import SyaratKetentuan from './pages/SyaratKetentuan';
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/materi" element={<ModulEdukasi />} />
          <Route path="/materi/:id" element={<DetailSesi />} />
          <Route path="/video" element={<VideoEdukasi />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
          <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/checker" element={<PneumoniaChecker />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/materi" element={<AdminMateri />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/admin/video" element={<AdminVideo />} />
        </Route>
      </Routes>
    </Router>
  );
}
