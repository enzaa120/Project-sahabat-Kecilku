import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Video, Trash2, Copy, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AdminUpload() {
  const { state, addMedia, removeMedia } = useAppContext();
  const { mediaLibrary } = state;
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newMedia = {
        id: Date.now().toString(),
        url: base64String,
        type: file.type.startsWith('video/') ? 'video' : 'image',
        name: file.name
      };
      try {
        addMedia(newMedia);
      } catch (e) {
        alert('Gagal menyimpan media. Penyimpanan lokal mungkin penuh (batas ~5MB). Coba hapus media lama atau gunakan URL gambar dari internet.');
      }
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus media ini?')) {
      removeMedia(id);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Upload Media</h1>
        <p className="text-slate-500 text-sm mt-1">Unggah gambar untuk digunakan di dalam materi. (Maksimal 2MB per file)</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-4 min-h-[200px] border-dashed">
        <div className="size-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
          <UploadCloud size={32} />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Pilih file untuk diunggah</h3>
          <p className="text-sm text-slate-500 mb-4">Mendukung JPG, PNG, GIF</p>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
          >
            Jelajahi File
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Galeri Media</h2>
        {mediaLibrary.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            Belum ada media yang diunggah.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mediaLibrary.map((media) => (
              <div key={media.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group">
                <div className="aspect-square bg-slate-100 relative">
                  {media.type === 'image' ? (
                    <img src={media.url} alt={media.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Video size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                    <button 
                      onClick={() => handleCopy(media.url, media.id)}
                      className="size-10 rounded-full bg-white text-slate-700 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      title="Salin URL"
                    >
                      {copiedId === media.id ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Copy size={20} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(media.id)}
                      className="size-10 rounded-full bg-white text-slate-700 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-slate-700 truncate" title={media.name}>{media.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">{media.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
