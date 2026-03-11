import { ArrowLeft, Share2, ThumbsUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

export default function DetailSesi() {
  const { id } = useParams();
  const { state, trackMateriView } = useAppContext();
  
  useEffect(() => {
    if (id) {
      trackMateriView(id);
    }
  }, [id]);
  
  const data = state.sessions[id || '1'] || state.sessions['1'];
  const nextSessionId = String(Number(data.id) + 1);
  const nextSession = state.sessions[nextSessionId];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Header Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative bg-slate-900">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-20 py-12">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
            <Link to="/materi" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit mb-4">
              <ArrowLeft size={20} />
              <span className="font-medium">Kembali ke Daftar Materi</span>
            </Link>
            <div className="flex gap-3 items-center">
              <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg uppercase tracking-wider">{data.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-4xl">{data.title}</h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-20 py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Main Article */}
          <article className="flex-1 prose prose-slate prose-lg max-w-[800px] prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:object-cover ql-snow">
            <div 
              className="text-slate-800 leading-relaxed tracking-wide ql-editor"
              style={{ padding: 0 }}
              dangerouslySetInnerHTML={{ __html: data.content.replace(/<img /g, '<img referrerpolicy="no-referrer" ') }}
            />

            {/* Admin Managed Media */}
            {data.mediaType !== 'none' && data.mediaUrl && (
              <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                {data.mediaType === 'image' ? (
                  <img src={data.mediaUrl} alt="Media tambahan" className="w-full h-auto" referrerPolicy="no-referrer" />
                ) : data.mediaType === 'video' ? (
                  <div className="aspect-video w-full">
                    {data.mediaUrl.includes('youtube.com') || data.mediaUrl.includes('youtu.be') ? (
                      <iframe 
                        className="w-full h-full"
                        src={data.mediaUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
                        title="Video Edukasi"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video controls className="w-full h-full object-cover">
                        <source src={data.mediaUrl} type="video/mp4" />
                        Browser Anda tidak mendukung tag video.
                      </video>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            <div className="flex items-center gap-4 mt-16 pt-8 border-t border-slate-200">
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors">
                <ThumbsUp size={20} />
                <span>Materi Bermanfaat</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors ml-auto">
                <Share2 size={20} />
                <span>Bagikan</span>
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full md:w-72 flex flex-col gap-8">
            {nextSession && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Materi Selanjutnya</h3>
                <Link to={`/materi/${nextSession.id}`} className="group flex flex-col gap-3">
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-200">
                    <img src={nextSession.image} alt={nextSession.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-500 transition-colors line-clamp-2">{nextSession.title}</h4>
                  </div>
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
