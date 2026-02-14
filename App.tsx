
import React, { useState } from 'react';
import SFButton from './components/SFButton';
import { Faction } from './types';

const App: React.FC = () => {
  const [currentFaction, setCurrentFaction] = useState<Faction | null>(null);

  const backgroundUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"; // Earth from space

  const handleFactionSelect = (faction: Faction) => {
    setCurrentFaction(faction);
    const factionName = faction === Faction.SPACE_FEDERATION ? '우주연방 [U.S.F]' : '지구연합 [E.U.N]';
    alert(`${factionName}에 충성을 맹세하셨습니다. 시스템 초기화 중...`);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Earth Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s] ease-linear scale-110 animate-[slow-zoom_30s_infinite_alternate]"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-grid opacity-20"></div>
      </div>

      {/* Floating Starfield Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
         <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
         <div className="absolute top-1/3 left-2/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse delay-700"></div>
         <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
         <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-red-300 rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Background Decor - HUD Elements */}
      <div className="absolute top-32 left-10 opacity-30 pointer-events-none hidden lg:block">
         <div className="border border-cyan-500/50 w-48 h-48 rounded-full animate-spin-slow flex items-center justify-center">
            <div className="border-t-2 border-cyan-400 w-40 h-40 rounded-full opacity-50"></div>
            <div className="absolute text-[8px] font-mono-tech text-cyan-400 tracking-widest">SCANNING_ORBIT</div>
         </div>
      </div>

      <div className="absolute bottom-10 right-10 opacity-30 pointer-events-none hidden lg:block text-right">
         <div className="font-mono-tech text-[10px] text-cyan-500 mb-1">ATMOSPHERE_LEVEL: STABLE</div>
         <div className="w-64 h-1 bg-cyan-900/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-cyan-500 w-[92%] animate-pulse"></div>
         </div>
      </div>

      {/* Choice Buttons Overlay - Centered and Focused */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40 px-6 backdrop-blur-[2px]">
        <div className="mb-12 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
                <h2 className="font-orbitron font-black text-3xl tracking-[0.5em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">CHOOSE_PATH</h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
            </div>
            <p className="text-cyan-400/60 font-mono-tech text-xs tracking-widest uppercase">Select your allegiance to proceed with the mission</p>
        </div>
        
        <div className="w-full max-w-md space-y-2">
            <SFButton 
              faction={Faction.SPACE_FEDERATION} 
              label="우주연방 (Space Federation)" 
              onClick={() => handleFactionSelect(Faction.SPACE_FEDERATION)} 
            />
            <div className="h-4"></div>
            <SFButton 
              faction={Faction.EARTH_UNION} 
              label="지구연합 (Earth Union)" 
              onClick={() => handleFactionSelect(Faction.EARTH_UNION)} 
            />
        </div>

        {/* Decorative corner brackets for the selection area */}
        <div className="absolute top-[30%] left-[25%] w-10 h-10 border-t-2 border-l-2 border-white/10 pointer-events-none"></div>
        <div className="absolute bottom-[30%] right-[25%] w-10 h-10 border-b-2 border-r-2 border-white/10 pointer-events-none"></div>
      </div>

      {/* UI Elements - Header */}
      <div className="fixed top-0 left-0 w-full p-8 flex justify-between items-start z-50">
        <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-1">
                <div className="w-1.5 h-8 bg-cyan-500 shadow-[0_0_15px_cyan]"></div>
                <h1 className="font-orbitron font-black text-4xl tracking-tighter text-white">NEXUS_OS</h1>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-mono-tech text-cyan-400/70">
                <span className="animate-pulse">● SYSTEM_IDLE</span>
                <span className="opacity-50">|</span>
                <span>GEO_SYNC: EARTH_ORBIT</span>
            </div>
        </div>
        
        <div className="flex space-x-6 items-center">
            <div className="text-right hidden sm:block">
                <div className="text-[10px] font-orbitron text-cyan-500/50 tracking-widest">ENCRYPTION</div>
                <div className="text-sm font-mono-tech text-white/80">RSA-4096-ECC</div>
            </div>
            <div className="w-12 h-12 border border-cyan-500/30 flex items-center justify-center backdrop-blur-md relative group cursor-help">
                <div className="grid grid-cols-2 gap-1.5">
                    {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-cyan-400 group-hover:scale-125 transition-transform duration-300"></div>)}
                </div>
            </div>
        </div>
      </div>

      {/* Advanced Scanline Overlay */}
      <div className="scanlines"></div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.2); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;
