
import React from 'react';

interface SFButtonProps {
  id: number;
  label: string;
  subtitle: string;
  locked?: boolean;
  onClick: () => void;
}

const SFButton: React.FC<SFButtonProps> = ({ id, label, subtitle, locked, onClick }) => {
  return (
    <div 
      className={`relative group transition-all duration-300 transform ${locked ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer'}`}
      onClick={onClick}
    >
      {/* SF 다각형 셰이프 */}
      <div 
        className={`
          ${locked ? 'bg-black/40 border-cyan-900/50' : 'bg-cyan-950/40 border-cyan-500 hover:bg-cyan-800/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]'}
          border-l-4 backdrop-blur-md relative overflow-hidden transition-all duration-500
          px-8 py-6
        `}
        style={{
          clipPath: 'polygon(0% 0%, 85% 0%, 100% 35%, 100% 100%, 15% 100%, 0% 65%)'
        }}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-1">
               <div className="w-1 h-3 bg-cyan-500/50"></div>
               <span className="text-[12px] font-orbitron tracking-[0.2em] text-cyan-400">
                  CHAPTER_0{id}
               </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-1">
              {label}
            </h3>
            <span className="text-[10px] font-orbitron text-cyan-500/60 tracking-wider">
              {subtitle}
            </span>
          </div>

          <div className="flex flex-col items-end">
             {locked ? (
               <div className="text-cyan-500/50">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                   <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                 </svg>
               </div>
             ) : id === 2 ? (
               /* 북마크 아이콘 (챕터 2) */
               <div className="text-cyan-500">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-8">
                   <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                 </svg>
               </div>
             ) : null}
             
             {/* 우측 하단 작은 바 장식 */}
             <div className="mt-4 w-1.5 h-6 bg-cyan-500/80 shadow-[0_0_10px_cyan]"></div>
          </div>
        </div>

        {/* 배경 디테일 */}
        {!locked && (
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent group-hover:animate-[scan_2s_infinite]"></div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SFButton;
