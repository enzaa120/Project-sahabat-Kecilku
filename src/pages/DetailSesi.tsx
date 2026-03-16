import { ArrowLeft, Share2, ThumbsUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';
import 'react-quill-new/dist/quill.snow.css';

export default function DetailSesi() {
  const { id } = useParams();
  const { state, trackMateriView } = useAppContext();
  
  useEffect(() => {
    if (id) {
      trackMateriView(id);
    }
  }, [id]);
  
  // Find the session data safely
  let data = state.sessions[id || '1'];
  if (!data) {
    // Fallback to first available session if the requested one doesn't exist
    const availableSessions = Object.values(state.sessions || {}).filter((s: any) => s && s.id);
    data = availableSessions.length > 0 ? availableSessions[0] as any : null;
  }

  if (!data) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Materi tidak ditemukan</h2>
        <Link to="/materi" className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
          Kembali ke Daftar Materi
        </Link>
      </div>
    );
  }

  const nextSessionId = String(Number(data.id) + 1);
  const nextSession = state.sessions[nextSessionId];

  let displayContent = data.content || '';
  
  // Basic markdown to HTML conversion for legacy content
  if (!displayContent.includes('<p>') && !displayContent.includes('<h1>')) {
    // Convert markdown images
    displayContent = displayContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" referrerpolicy="no-referrer" class="w-full rounded-2xl shadow-md object-cover my-6" />');
    // Convert bold
    displayContent = displayContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Convert headings
    displayContent = displayContent.replace(/^### (.*$)/gim, '<h3 class="font-bold text-xl mt-6 mb-3">$1</h3>');
    displayContent = displayContent.replace(/^## (.*$)/gim, '<h2 class="font-bold text-2xl mt-8 mb-4">$1</h2>');
    displayContent = displayContent.replace(/^# (.*$)/gim, '<h1 class="font-bold text-3xl mt-8 mb-4">$1</h1>');
    // Convert lists
    displayContent = displayContent.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
    // Convert newlines to breaks
    displayContent = displayContent.replace(/\n/g, '<br />');
  } else {
    // It's HTML from Quill, just ensure images have referrer policy
    displayContent = displayContent.replace(/<img /g, '<img referrerpolicy="no-referrer" ');
    // Also convert any lingering markdown images just in case they typed it in Quill
    displayContent = displayContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" referrerpolicy="no-referrer" class="w-full rounded-2xl shadow-md object-cover my-6" />');
    // Convert iframe with .mp4 to video tag
    displayContent = displayContent.replace(
      /<iframe[^>]*src="([^"]+\.mp4)"[^>]*><\/iframe>/gi,
      '<video controls class="w-full h-auto block bg-black rounded-2xl shadow-md my-6"><source src="$1" type="video/mp4" />Browser Anda tidak mendukung tag video.</video>'
    );
  }

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
          <article className="lg:flex-1 w-full min-w-0 prose prose-slate prose-lg max-w-[800px] prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full prose-img:object-cover ql-snow">
            
            {/* Admin Managed Media - Moved to top */}
            {data.mediaType !== 'none' && data.mediaUrl && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 w-full shadow-sm">
                {data.mediaType === 'image' ? (
                  <img src={data.mediaUrl} alt="Media tambahan" className="w-full h-auto m-0" referrerPolicy="no-referrer" />
                ) : data.mediaType === 'video' ? (
                  <div className="w-full overflow-hidden bg-black">
                    {data.mediaUrl.includes('youtube.com') || data.mediaUrl.includes('youtu.be') ? (
                      <div className="aspect-video w-full">
                        <iframe 
                          className="w-full h-full"
                          src={data.mediaUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
                          title="Video Edukasi"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : data.mediaUrl.includes('drive.google.com') ? (
                      <div className="aspect-video w-full">
                        <iframe 
                          className="w-full h-full"
                          src={data.mediaUrl.replace(/\/view.*$/, '/preview')} 
                          title="Video Edukasi (Google Drive)"
                          frameBorder="0" 
                          allow="autoplay" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <video key={data.mediaUrl} controls className="w-full h-auto block bg-black">
                        <source src={data.mediaUrl} type="video/mp4" />
                        Browser Anda tidak mendukung tag video.
                      </video>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            <div 
              className="ql-editor overflow-hidden"
              style={{ padding: 0 }}
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />

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
