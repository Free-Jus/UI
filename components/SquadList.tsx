
import React, { useState } from 'react';

interface SquadListProps {
  characters: any[];
  affection: Record<string, number>;
  onBack: () => void;
}

const SquadList: React.FC<SquadListProps> = ({ characters, affection, onBack }) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [filter, setFilter] = useState('전체');

  const ranks = ['전체', 'S', 'A', 'B', 'C', 'D', 'E', 'F', 'ETC'];

  const filteredCharacters = filter === '전체' 
    ? characters 
    : filter === 'ETC' 
      ? characters.filter(c => !['S','A','B','C','D','E','F'].includes(c.rank))
      : characters.filter(c => c.rank === filter);

  return (
    <div className="w-full h-full bg-[#020508] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      {/* Header */}
      <div className="relative z-50 p-6 pt-12 flex justify-between items-center bg-black/80 border-b border-cyan-900/40">
        <div>
          <h2 className="font-orbitron font-black text-2xl italic text-white uppercase tracking-tighter">Agent_Database</h2>
          <p className="text-[8px] font-mono-tech text-cyan-500/60 uppercase tracking-widest">Active_Personnel_List</p>
        </div>
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center border border-cyan-500/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all">✕</button>
      </div>

      {/* RANK FILTER BAR */}
      <div className="relative z-50 flex space-x-3 overflow-x-auto p-4 bg-cyan-950/10 no-scrollbar border-b border-cyan-900/20">
        {ranks.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`flex-shrink-0 px-4 py-1 font-orbitron text-[10px] tracking-widest transition-all border ${filter === r ? 'bg-cyan-500 border-cyan-400 text-black font-bold shadow-[0_0_10px_cyan]' : 'bg-black/40 border-cyan-900/50 text-cyan-500/60'}`}
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* AGENT CARD GRID (3 COLUMNS) */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="grid grid-cols-3 gap-3 pb-24">
          {filteredCharacters.map((char) => (
            <div 
              key={char.id} 
              onClick={() => setSelected(char)}
              className="relative aspect-[2/3] bg-cyan-950/20 border border-cyan-400/20 group cursor-pointer transition-all active:scale-95 overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              
              {/* Image Placeholder with Technical Silhouette (No Broken Image) */}
              <div className="w-full h-full flex items-center justify-center bg-cyan-900/10 relative">
                 <div className="w-16 h-16 border-2 border-cyan-500/10 rounded-full animate-pulse"></div>
                 <span className="absolute inset-0 flex items-center justify-center text-3xl font-black font-orbitron text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors">{char.name[0]}</span>
              </div>

              {/* Rank Badge */}
              <div className="absolute top-1 left-1 z-20 px-1 bg-black/70 border border-cyan-500/50 text-[8px] font-black font-orbitron text-cyan-400 leading-none py-0.5">
                {char.rank}
              </div>

              {/* Card Info Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-2 z-20">
                <p className="text-[10px] font-black font-orbitron text-white uppercase truncate drop-shadow-md">{char.name}</p>
                <div className="mt-1 w-full h-[1.5px] bg-cyan-900/40 overflow-hidden">
                  <div className="h-full bg-cyan-400 shadow-[0_0_3px_cyan]" style={{ width: `${affection[char.id] || 0}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL OVERLAY */}
      {selected && (
        <div className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 animate-fade-in">
           <div className="relative w-full max-w-sm flex flex-col bg-cyan-950/10 border border-cyan-400/30 clip-sf-slant p-6">
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-cyan-400 text-xl font-bold p-2 hover:bg-cyan-400/20 transition-all"
              >✕</button>

              <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 clip-sf-hex border-2 border-cyan-400 bg-black flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                    <span className="text-5xl font-black font-orbitron text-cyan-800 animate-pulse">{selected.name[0]}</span>
                </div>
                <div className="flex items-center space-x-2">
                   <span className="bg-cyan-500 text-black px-1.5 py-0.5 text-[9px] font-black font-orbitron uppercase">{selected.rank} Rank</span>
                   <h3 className="text-3xl font-black font-orbitron italic tracking-tighter text-white uppercase drop-shadow-[0_0_10px_cyan]">{selected.name}</h3>
                </div>
                <span className="text-[10px] font-mono-tech text-cyan-400/60 uppercase tracking-[0.3em] mt-1">ID_{selected.id.toUpperCase()}_LOG_NODE</span>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                   <div className="bg-cyan-900/20 p-3 border-l-2 border-cyan-400">
                      <span className="text-[8px] font-orbitron text-cyan-500 uppercase block mb-1">Role</span>
                      <span className="text-xs font-bold text-white uppercase truncate">{selected.role}</span>
                   </div>
                   <div className="bg-cyan-900/20 p-3 border-l-2 border-cyan-400">
                      <span className="text-[8px] font-orbitron text-cyan-500 uppercase block mb-1">Affection</span>
                      <span className="text-xs font-bold text-white font-mono-tech">{affection[selected.id]}%</span>
                   </div>
                </div>
                <div className="bg-cyan-900/20 p-3 border-l-2 border-cyan-400">
                   <span className="text-[8px] font-orbitron text-cyan-500 uppercase block mb-1">Equipment</span>
                   <span className="text-xs font-bold text-white uppercase">{selected.weapon}</span>
                </div>
                <div className="p-3">
                   <span className="text-[8px] font-orbitron text-cyan-500 uppercase block mb-1">Bio_Data</span>
                   <p className="text-[11px] text-white/70 leading-relaxed italic font-light">"{selected.bio}"</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                 <button className="py-3 bg-cyan-500 text-black font-black font-orbitron text-[10px] tracking-widest uppercase shadow-[0_0_15px_cyan] active:scale-95 transition-transform">Access_Log</button>
                 <button className="py-3 border border-cyan-500 text-cyan-400 font-black font-orbitron text-[10px] tracking-widest uppercase hover:bg-cyan-400/10 active:scale-95 transition-transform" onClick={() => setSelected(null)}>Close</button>
              </div>
           </div>
        </div>
      )}

      <div className="scanlines"></div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.25s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default SquadList;
