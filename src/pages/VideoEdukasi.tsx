import { PlayCircle, Eye, Video, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useEffect, useState } from 'react';

export default function VideoEdukasi() {
  const { state, trackVideoView, incrementVideoViews } = useAppContext();
  const { videos } = state;
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    trackVideoView();
  }, []);

  const handlePlay = (id: string, url: string) => {
    setPlayingVideo(url);
    incrementVideoViews(id);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-orange-500 text-white px-6 md:px-20 py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
            <PlayCircle size={48} className="text-orange-200" />
            Video Animasi
          </h1>
          <p className="text-orange-100 text-lg max-w-2xl leading-relaxed">
            Video animasi edukatif untuk membantu Anda memahami gejala, cara pemeriksaan mandiri, dan penanganan pneumonia pada balita.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-20 py-16">
        <div className="max-w-[1200px] mx-auto">
          {videos.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              Belum ada video edukasi yang ditambahkan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={() => handlePlay(video.id, video.videoUrl)}
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Video size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="size-14 rounded-full bg-orange-500/90 text-white flex items-center justify-center backdrop-blur-sm shadow-xl">
                        <PlayCircle size={28} className="ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur rounded-md text-white text-xs font-medium">
                      {video.duration || '00:00'}
                    </div>
                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur rounded-md text-orange-600 text-xs font-bold shadow-sm">
                      {video.category || 'Umum'}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">{video.title || 'Tanpa Judul'}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{video.description || 'Tanpa deskripsi'}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 text-slate-500 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Eye size={14} />
                        <span>{video.views || 0} ditonton</span>
                      </div>
                      <span className="text-orange-500 font-bold">Tonton Sekarang</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10">
          <button 
            onClick={closeVideo}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {playingVideo.includes('youtube.com') || playingVideo.includes('youtu.be') ? (
              <iframe 
                className="w-full h-full"
                src={playingVideo.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
                title="Video Edukasi"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : playingVideo.includes('drive.google.com') ? (
              <iframe 
                className="w-full h-full"
                src={playingVideo.replace(/\/view.*$/, '/preview')} 
                title="Video Edukasi (Google Drive)"
                frameBorder="0" 
                allow="autoplay" 
                allowFullScreen
              ></iframe>
            ) : (
              <video controls autoPlay className="w-full h-full object-contain">
                <source src={playingVideo} type="video/mp4" />
                Browser Anda tidak mendukung tag video.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
