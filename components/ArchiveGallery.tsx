
import React from 'react';

interface ArchiveGalleryProps {
  onBack: () => void;
}

const ArchiveGallery: React.FC<ArchiveGalleryProps> = ({ onBack }) => {
  const images = [
    { id: 1, title: '붉은 행성의 아침', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=400&auto=format&fit=crop', unlocked: true },
    { id: 2, title: '지구 궤도의 격전', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop', unlocked: true },
    { id: 3, title: '미확인 성운 발견', url: '', unlocked: false },
    { id: 4, title: '최후의 보루', url: '', unlocked: false },
    { id: 5, title: '심연의 부름', url: '', unlocked: false },
    { id: 6, title: '새로운 시작', url: '', unlocked: false },
    { id: 7, title: '침묵의 우주', url: '', unlocked: false },
    { id: 8, title: '희망의 빛', url: '', unlocked: false },
  ];

  return (
    <div className="w-full h-full bg-black flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      {/* Header */}
      <div className="relative z-50 p-6 pt-10 flex justify-between items-center bg-black/80 border-b border-cyan-900/40">
        <div>
          <h2 className="font-orbitron font-black text-2xl italic text-white uppercase tracking-tighter">Visual_Archive</h2>
          <p className="text-[8px] font-mono-tech text-cyan-500/60 uppercase">Encoded CG Log</p>
        </div>
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
        <div className="grid grid-cols-2 gap-3 pb-32">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-[4/3] group cursor-pointer border border-cyan-900/40 hover:border-cyan-400 transition-all overflow-hidden bg-cyan-950/10">
              {img.unlocked ? (
                <>
                  <img src={img.url} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt={img.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                    <span className="text-[6px] font-mono-tech text-cyan-400 uppercase">IMG_00{img.id}</span>
                    <p className="text-[9px] font-bold text-white truncate uppercase">{img.title}</p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-1 opacity-20">
                   <span className="text-xl">🔒</span>
                   <span className="text-[7px] font-mono-tech tracking-[0.2em] uppercase">Locked</span>
                </div>
              )}
              {/* Corner Glitch Effect Decor */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400/30"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400/30"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent pointer-events-none text-center">
         <span className="text-[8px] font-mono-tech text-cyan-500/30 uppercase tracking-[0.4em]">Arteria Protocol v1.0 // Archive Integrity: 25%</span>
      </div>

      <div className="scanlines"></div>
    </div>
  );
};

export default ArchiveGallery;
