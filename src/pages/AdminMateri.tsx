import { useState, useEffect } from 'react';
import { Edit3, Save, Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function AdminMateri() {
  const { state, updateLanding, updateSession } = useAppContext();
  const [activeTab, setActiveTab] = useState<'landing' | 'modules'>('landing');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);

  const [landingForm, setLandingForm] = useState(state.landing);
  const [sessionForm, setSessionForm] = useState<any>(null);

  useEffect(() => {
    setLandingForm(state.landing);
  }, [state.landing]);

  useEffect(() => {
    if (editingSessionId && state.sessions[editingSessionId]) {
      setSessionForm(state.sessions[editingSessionId]);
    }
  }, [state.sessions, editingSessionId]);

  const handleSaveLanding = () => {
    updateLanding(landingForm);
    alert('Halaman Awal berhasil diperbarui!');
  };

  const handleEditSession = (id: string) => {
    setSessionForm(state.sessions[id]);
    setEditingSessionId(id);
  };

  const handleSaveSession = () => {
    if (editingSessionId && sessionForm) {
      // Clean up undefined values before saving to Firestore
      const cleanedData = { ...sessionForm };
      Object.keys(cleanedData).forEach(key => {
        if (cleanedData[key] === undefined) {
          delete cleanedData[key];
        }
      });
      updateSession(editingSessionId, cleanedData);
      alert('Sesi berhasil diperbarui!');
      setEditingSessionId(null);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Materi</h1>
          <p className="text-slate-500 text-sm mt-1">Edit halaman awal dan konten sesi edukasi.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('landing')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'landing' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Halaman Awal
        </button>
        <button 
          onClick={() => { setActiveTab('modules'); setEditingSessionId(null); }}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'modules' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Halaman Kedua (Sesi 1-5)
        </button>
      </div>

      {/* Tab Content: Landing Page */}
      {activeTab === 'landing' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Edit3 size={20} className="text-blue-500" /> Edit Halaman Awal
          </h2>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Judul Utama (Hero Title)</label>
              <input 
                type="text" 
                value={landingForm.heroTitle}
                onChange={(e) => setLandingForm({...landingForm, heroTitle: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Sub-judul (Hero Subtitle)</label>
              <textarea 
                value={landingForm.heroSubtitle}
                onChange={(e) => setLandingForm({...landingForm, heroSubtitle: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">URL Gambar Animasi Utama</label>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl mb-3 text-xs">
                Gunakan <strong>"Tautan Langsung" (Direct Link)</strong> jika menggunakan ImgBB (berakhiran <code>.jpg</code>/<code>.png</code>). Jangan gunakan tautan album.
              </div>
              <input 
                type="text" 
                value={landingForm.heroImage}
                onChange={(e) => setLandingForm({...landingForm, heroImage: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {landingForm.heroImage && (
                <div className="mt-4 aspect-video max-w-md rounded-xl overflow-hidden border border-slate-200">
                  <img src={landingForm.heroImage} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button onClick={handleSaveLanding} className="bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Save size={20} /> Simpan Perubahan
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Modules */}
      {activeTab === 'modules' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          {!editingSessionId ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(state.sessions || {}).filter((s: any) => s && s.id).map((session: any) => (
                <div key={session.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">SESI {session.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{session.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{session.description}</p>
                  <button 
                    onClick={() => handleEditSession(session.id)}
                    className="mt-auto w-full py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit3 size={16} /> Edit Sesi Ini
                  </button>
                </div>
              ))}
            </div>
          ) : sessionForm ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 size={20} className="text-blue-500" /> Edit Sesi {sessionForm.id}
                </h2>
                <button onClick={() => setEditingSessionId(null)} className="text-slate-500 hover:text-slate-700 text-sm font-bold">
                  Batal
                </button>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Judul Sesi</label>
                    <input 
                      type="text" 
                      value={sessionForm.title}
                      onChange={(e) => setSessionForm({...sessionForm, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                    <input 
                      type="text" 
                      value={sessionForm.category}
                      onChange={(e) => setSessionForm({...sessionForm, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Singkat (Muncul di Kartu)</label>
                  <textarea 
                    value={sessionForm.description}
                    onChange={(e) => setSessionForm({...sessionForm, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">URL Foto Ikon Kartu (Opsional)</label>
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl mb-3 text-xs">
                    Gambar ini akan menggantikan ikon bawaan pada kartu materi edukasi. Anda dapat menggunakan gambar dengan rasio bebas (seperti poster portrait). Gambar akan disesuaikan secara otomatis.
                  </div>
                  <input 
                    type="text" 
                    value={sessionForm.iconImage || ''}
                    onChange={(e) => setSessionForm({...sessionForm, iconImage: e.target.value})}
                    placeholder="https://contoh.com/ikon.png"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {sessionForm.iconImage && (
                    <div className="mt-4 h-48 w-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
                      <img src={sessionForm.iconImage} alt="Preview Ikon" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">URL Foto Background Animasi</label>
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl mb-3 text-xs">
                    Gunakan <strong>"Tautan Langsung" (Direct Link)</strong> jika menggunakan ImgBB (berakhiran <code>.jpg</code>/<code>.png</code>). Jangan gunakan tautan album.
                  </div>
                  <input 
                    type="text" 
                    value={sessionForm.image}
                    onChange={(e) => setSessionForm({...sessionForm, image: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {sessionForm.image && (
                    <div className="mt-4 aspect-video max-w-md rounded-xl overflow-hidden border border-slate-200">
                      <img src={sessionForm.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-slate-700">Isi Materi (Teks)</label>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Rich Text Editor</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-4 text-sm">
                    <strong>Penting untuk Gambar:</strong> Jika Anda mengunggah gambar ke situs seperti <strong>ImgBB</strong>, pastikan Anda menyalin <strong>"Tautan Langsung" (Direct Link)</strong> yang berakhiran <code>.jpg</code> atau <code>.png</code> (contoh: <code>https://i.ibb.co/xyz/gambar.jpg</code>). Jangan gunakan tautan album atau tautan viewer (contoh: <code>https://ibb.co.com/album/xyz</code>).
                  </div>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <ReactQuill 
                      theme="snow" 
                      value={sessionForm.content} 
                      onChange={(content) => setSessionForm({...sessionForm, content})}
                      modules={quillModules}
                      formats={quillFormats}
                      className="h-[400px] pb-12"
                    />
                  </div>
                </div>

                <div className="p-6 border border-slate-200 rounded-xl bg-slate-50 flex flex-col gap-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2"><ImageIcon size={18} /> Media Tambahan (Bawah Materi)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tipe Media</label>
                      <select 
                        value={sessionForm.mediaType}
                        onChange={(e) => setSessionForm({...sessionForm, mediaType: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        <option value="none">Tidak Ada</option>
                        <option value="image">Gambar</option>
                        <option value="video">Video (URL YouTube/MP4)</option>
                      </select>
                    </div>
                    {sessionForm.mediaType !== 'none' && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">URL Media</label>
                        <input 
                          type="text" 
                          value={sessionForm.mediaUrl}
                          onChange={(e) => setSessionForm({...sessionForm, mediaUrl: e.target.value})}
                          placeholder="Masukkan link gambar/video..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button onClick={handleSaveSession} className="bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Save size={20} /> Simpan Sesi {sessionForm.id}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
