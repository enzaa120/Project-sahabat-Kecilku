import { useState, useEffect } from 'react';
import { Video, Plus, Edit3, Trash2, Save, X } from 'lucide-react';
import { useAppContext, VideoData } from '../context/AppContext';

export default function AdminVideo() {
  const { state, updateVideos, deleteVideo } = useAppContext();
  const [videos, setVideos] = useState<VideoData[]>(state.videos);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<VideoData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setVideos(state.videos);
  }, [state.videos]);

  const handleAddNew = () => {
    const newVideo: VideoData = {
      id: Date.now().toString(),
      title: '',
      description: '',
      thumbnail: '',
      duration: '',
      views: 0,
      category: '',
      videoUrl: ''
    };
    setFormData(newVideo);
    setEditingId(newVideo.id);
  };

  const handleEdit = (video: VideoData) => {
    setFormData(video);
    setEditingId(video.id);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      const newVideos = videos.filter(v => v.id !== deletingId);
      setVideos(newVideos);
      deleteVideo(deletingId);
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const handleSave = () => {
    if (formData) {
      let newVideos;
      if (videos.find(v => v.id === formData.id)) {
        newVideos = videos.map(v => v.id === formData.id ? formData : v);
      } else {
        newVideos = [...videos, formData];
      }
      setVideos(newVideos);
      updateVideos(newVideos);
      setEditingId(null);
      setFormData(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Video Edukasi</h1>
          <p className="text-slate-500 text-sm mt-1">Tambah, edit, atau hapus video animasi edukasi.</p>
        </div>
        <div className="flex items-center gap-4">
          {showSuccess && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in">
              Video berhasil disimpan!
            </div>
          )}
          <button 
            onClick={handleAddNew}
            className="bg-blue-500 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={20} /> Tambah Video
          </button>
        </div>
      </div>

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hapus Video</h3>
            <p className="text-slate-600 mb-6">Apakah Anda yakin ingin menghapus video ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {editingId && formData ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Edit3 size={20} className="text-blue-500" /> {videos.find(v => v.id === formData.id) ? 'Edit Video' : 'Video Baru'}
            </h2>
            <button 
              onClick={() => { setEditingId(null); setFormData(null); }}
              className="text-slate-500 hover:text-slate-700 p-2"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Judul Video</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
              <input 
                type="text" 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Durasi (misal: 03:45)</label>
              <input 
                type="text" 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Singkat</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">URL Thumbnail (Gambar)</label>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl mb-3 text-xs">
                Gunakan <strong>"Tautan Langsung" (Direct Link)</strong> jika menggunakan ImgBB (berakhiran <code>.jpg</code>/<code>.png</code>). Jangan gunakan tautan album.
              </div>
              <input 
                type="text" 
                value={formData.thumbnail}
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">URL Video</label>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl mb-3 text-xs">
                Bisa menggunakan link <strong>YouTube</strong>, link <strong>Google Drive</strong>, atau link file <strong>MP4</strong>.
              </div>
              <input 
                type="text" 
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                placeholder="https://youtube.com/... atau https://drive.google.com/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button onClick={handleSave} className="bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Save size={20} /> Simpan Video
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
              <div className="aspect-video bg-slate-100 relative">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Video size={48} />
                  </div>
                )}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                  {video.duration || '00:00'}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-bold text-slate-900 line-clamp-2">{video.title || 'Tanpa Judul'}</h3>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{video.description || 'Tanpa deskripsi'}</p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{video.category || 'Umum'}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(video)}
                      className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(video.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
