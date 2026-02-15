
import React, { useState, useEffect } from 'react';
import SFButton from './components/SFButton';
import SquadList from './components/SquadList';
import ArchiveGallery from './components/ArchiveGallery';

type Scene = 'START' | 'LOBBY' | 'CHRONICLES' | 'SQUAD' | 'ARCHIVE';

const App: React.FC = () => {
  const [scene, setScene] = useState<Scene>('START');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0); // 내부 연산용
  const [loadingText, setLoadingText] = useState('SYSTEM_INIT');

  const [affection, setAffection] = useState<Record<string, number>>({
    sylvia: 82,
    momo: 45,
    aisha: 12,
    lina: 5,
    vera: 0,
    coco: 30,
    rumi: 10
  });

  const characters = [
    { id: 'sylvia', name: '실비아', rank: 'S', faction: 'SPACE_FEDERATION', role: '지휘관 / 전술 리더', color: 'cyan', weapon: '레일건 펜리르', bio: '공정하고 차가워 보이지만 지휘관에게는 따뜻한 면모를 보인다.', img: '' },
    { id: 'momo', name: '모모', rank: 'A', faction: 'EARTH_UNION', role: '중화기 전문가', color: 'red', weapon: '플라즈마 캐논', bio: '지구연합의 최전방을 지키는 말괄량이 전사.', img: '' },
    { id: 'aisha', name: '아이샤', rank: 'A', faction: 'SPACE_FEDERATION', role: '전자전 특화', color: 'blue', weapon: '해킹 나노봇', bio: '말수가 적고 기계와 대화하는 것을 즐긴다.', img: '' },
    { id: 'lina', name: '리나', rank: 'B', faction: 'EARTH_UNION', role: '근접 암살', color: 'purple', weapon: '빔 소드', bio: '어둠 속에서 적을 소리 없이 제거하는 그림자.', img: '' },
    { id: 'vera', name: '베라', rank: 'B', faction: 'EARTH_UNION', role: '의무병 / 서포터', color: 'green', weapon: '치료 광선', bio: '전투의 참혹함 속에서도 미소를 잃지 않는 천사.', img: '' },
    { id: 'coco', name: '코코', rank: 'C', faction: 'SPACE_FEDERATION', role: '정찰 / 저격', color: 'yellow', weapon: '장거리 볼트 액션', bio: '호기심이 많아 늘 앞장서서 사고를 치곤 한다.', img: '' },
    { id: 'rumi', name: '루미', rank: 'D', faction: 'SPACE_FEDERATION', role: '기술지원', color: 'orange', weapon: '수리용 렌치', bio: '무엇이든 고쳐내는 아르테리아의 만능 기술자.', img: '' },
  ];

  const chronicles = [
    { id: 1, title: "오리진: 붉은 행성", subtitle: "ORIGIN: RED PLANET", locked: false },
    { id: 2, title: "지구 궤도 전투", subtitle: "EARTH ORBIT BATTLE", locked: false },
    { id: 3, title: "심우주 탐사선", subtitle: "DEEP SPACE PROBE", locked: true },
    { id: 4, title: "미공개 작전", subtitle: "CLASSIFIED", locked: true },
  ];

  const handleDeploy = () => {
    setIsLoading(true);
    setLoadingPercent(0);
    setLoadingText('ALYN_CORE_SYNC');
    
    const messages = ['FED_AUTH_LINK', 'UNION_GRID_LINK', 'MAP_SYNC_COMPLETE', 'READY_FOR_TRANS'];
    let step = 0;
    
    // 2초 동안 진행 (100ms 마다 업데이트)
    const interval = setInterval(() => {
      setLoadingPercent(prev => {
        const next = prev + 5;
        if (next >= 25 && step === 0) { setLoadingText(messages[0]); step++; }
        if (next >= 50 && step === 1) { setLoadingText(messages[1]); step++; }
        if (next >= 75 && step === 2) { setLoadingText(messages[2]); step++; }
        if (next >= 95 && step === 3) { setLoadingText(messages[3]); step++; }
        
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setScene('CHRONICLES');
          }, 300);
          return 100;
        }
        return next;
      });
    }, 80);
  };

  const getAdjutantDialogue = () => {
    const aff = affection.sylvia;
    if (aff >= 80) return "지휘관님, 오늘따라 얼굴이 좋아 보이시네요. 곁에 있는 것만으로도 힘이 됩니다.";
    if (aff >= 50) return "작전 브리핑은 이미 끝냈습니다. 잠시 티타임이라도 가지실까요?";
    return "신호 수집 완료. 지휘관님, 다음 작전지로의 이동을 준비해 주십시오.";
  };

  const handleToLobby = () => setScene('LOBBY');

  if (isLoading) {
    return (
      <div className="w-full h-full bg-[#020508] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

        {/* Side Rails (Vertical Energy) */}
        <div className="absolute inset-y-0 left-8 w-[2px] bg-cyan-900/30">
          <div 
            className="absolute top-0 left-0 w-full bg-cyan-400 shadow-[0_0_15px_cyan] transition-all duration-300" 
            style={{ height: `${loadingPercent}%` }}
          ></div>
        </div>
        <div className="absolute inset-y-0 right-8 w-[2px] bg-cyan-900/30">
          <div 
            className="absolute bottom-0 right-0 w-full bg-white shadow-[0_0_15px_white] transition-all duration-300" 
            style={{ height: `${loadingPercent}%` }}
          ></div>
        </div>

        {/* Central Matrix Grid */}
        <div className="relative z-10 grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => {
            const isActive = (i + 1) * (100 / 16) <= loadingPercent;
            return (
              <div 
                key={i} 
                className={`w-10 h-10 border transition-all duration-300 transform ${isActive ? 'bg-cyan-500/40 border-cyan-400 rotate-0' : 'bg-transparent border-cyan-900/20 rotate-45 scale-75'}`}
              >
                {isActive && (
                  <div className="w-full h-full bg-white/20 animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Technical Data Readout (Center bottom) */}
        <div className="mt-16 w-full px-16 flex flex-col">
           <div className="flex justify-between items-end mb-1">
              <span className="text-[7px] font-mono-tech text-cyan-500/50 uppercase tracking-widest leading-none">Status: {loadingPercent}%</span>
              <span className="text-[10px] font-orbitron font-black text-white italic tracking-tighter uppercase leading-none">{loadingText}</span>
           </div>
           <div className="w-full h-[1px] bg-cyan-900/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-400 transition-all duration-300" style={{ width: `${loadingPercent}%` }}></div>
           </div>
           
           {/* Fast scrolling logs (Fake) */}
           <div className="mt-6 h-12 overflow-hidden opacity-20 pointer-events-none">
              <div className="flex flex-col space-y-1 animate-[log-scroll_2s_linear_infinite]">
                 <span className="text-[6px] font-mono-tech text-cyan-400 uppercase">> INITIALIZING_GRID_ARRAY_X001</span>
                 <span className="text-[6px] font-mono-tech text-cyan-400 uppercase">> AUTHENTICATING_FEDERATION_SIGNATURE</span>
                 <span className="text-[6px] font-mono-tech text-cyan-400 uppercase">> BALANCING_UNION_RESONANCE</span>
                 <span className="text-[6px] font-mono-tech text-cyan-400 uppercase">> CALIBRATING_NEURAL_SYNAPSE_LINK</span>
                 <span className="text-[6px] font-mono-tech text-cyan-400 uppercase">> SYNCING_CHRONICLE_DATABASE</span>
                 <span className="text-[6px] font-mono-tech text-cyan-400 uppercase">> CORE_OUTPUT_STABILITY_100%</span>
                 <span className="text-[6px] font-mono-tech text-cyan-400 uppercase">> READY_FOR_DEPLOYMENT</span>
              </div>
           </div>
        </div>

        {/* Screen Glitch Overlay at 100% */}
        {loadingPercent >= 98 && (
          <div className="absolute inset-0 bg-cyan-400/20 animate-pulse z-[100]"></div>
        )}

        <div className="scanlines"></div>
        <style>{`
          @keyframes log-scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
        `}</style>
      </div>
    );
  }

  if (scene === 'START') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale scale-110" 
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="font-orbitron font-black text-6xl tracking-[0.15em] text-white drop-shadow-[0_0_20px_cyan] mb-2">ARTERIA</h1>
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-4"></div>
          <p className="font-mono-tech text-cyan-400 text-[10px] tracking-[0.4em] uppercase">Tactical_VN_Interface</p>
        </div>
        <button onClick={handleToLobby} className="absolute bottom-24 group">
          <div className="px-10 py-3 border border-cyan-500/50 bg-cyan-950/20 backdrop-blur-md relative overflow-hidden active:scale-95 transition-all">
            <span className="font-orbitron font-bold text-lg tracking-[0.3em] text-white">SYSTEM LINK</span>
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </button>
        <div className="scanlines"></div>
      </div>
    );
  }

  if (scene === 'LOBBY') {
    return (
      <div className="w-full h-full flex flex-col bg-[#020508] relative">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

        {/* TOP HUD */}
        <div className="relative z-50 px-5 pt-10 flex justify-between items-start">
          <div className="flex items-start space-x-3">
             <div className="flex flex-col items-center justify-center bg-cyan-950/40 border border-cyan-400/30 p-2 w-16 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_5px_cyan]"></div>
                <span className="text-[18px] font-black font-orbitron text-white leading-none">24</span>
                <span className="text-[8px] font-mono-tech text-cyan-400 font-bold tracking-widest uppercase mt-0.5">DEC</span>
             </div>
             <div className="flex flex-col justify-center h-full pt-1">
                <div className="flex items-center space-x-2">
                   <span className="text-[14px] font-orbitron font-black text-white italic tracking-tighter uppercase leading-none">Winter_Phase</span>
                   <div className="w-1.5 h-1.5 bg-cyan-400 rotate-45 animate-pulse"></div>
                </div>
                <div className="flex items-center mt-1">
                   <span className="text-[8px] font-mono-tech text-cyan-500/60 uppercase tracking-[0.2em]">Stellar_Year_2042</span>
                   <div className="ml-2 flex space-x-0.5">
                      <div className="w-1 h-1 bg-cyan-500/40"></div>
                      <div className="w-1 h-1 bg-cyan-500/40"></div>
                      <div className="w-1 h-1 bg-cyan-500/40"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-end space-y-3">
            <div className="flex space-x-2">
              <div className="bg-cyan-950/40 border border-cyan-400/20 px-2 py-0.5 flex items-center space-x-2 backdrop-blur-md">
                <div className="w-1.5 h-1.5 bg-cyan-400 rotate-45"></div>
                <span className="text-[10px] font-mono-tech">37,096,410</span>
              </div>
              <div className="bg-cyan-950/40 border border-cyan-400/20 px-2 py-0.5 flex items-center space-x-2 backdrop-blur-md">
                <div className="w-1.5 h-1.5 bg-white rotate-45"></div>
                <span className="text-[10px] font-mono-tech">67,469</span>
              </div>
            </div>
            
            <div className="bg-cyan-950/40 border-r-4 border-cyan-400 p-2 pr-4 flex flex-col items-end backdrop-blur-md">
              <span className="text-[7px] font-orbitron text-cyan-400 uppercase tracking-widest opacity-60">Objective</span>
              <p className="text-[11px] text-white font-black uppercase tracking-tighter">Origin: Red Planet</p>
            </div>
          </div>
        </div>

        {/* MAIN HUD AREA */}
        <div className="flex-1 relative flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 flex items-center justify-center opacity-40">
             <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-4 border border-cyan-500/5 rounded-full animate-reverse-spin"></div>
             <div className="absolute w-full h-px bg-cyan-500/20 shadow-[0_0_10px_cyan]"></div>
             <div className="absolute h-full w-px bg-cyan-500/20 shadow-[0_0_10px_cyan]"></div>
             <div className="flex flex-col items-center z-10">
                <span className="text-[10px] font-mono-tech text-cyan-400 animate-pulse uppercase tracking-[0.5em]">System_Standby</span>
                <span className="text-[40px] font-black font-orbitron text-cyan-400/20">ARTERIA</span>
             </div>
          </div>
          
          <div className="absolute bottom-[20%] w-[92%] border-l-4 border-cyan-400 bg-black/80 backdrop-blur-2xl p-5 z-20 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <div className="flex justify-between items-center mb-1.5">
               <span className="text-[8px] font-orbitron text-cyan-400 tracking-[0.3em] uppercase opacity-70">Log_Transmission: SYLVIA</span>
               <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyan-400 animate-pulse"></div>
                  <div className="w-1 h-1 bg-cyan-400 animate-pulse [animation-delay:0.2s]"></div>
               </div>
            </div>
            <p className="text-white text-[14px] leading-relaxed font-medium tracking-tight">"{getAdjutantDialogue()}"</p>
            <div className="mt-3 flex items-center space-x-2">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/40 to-transparent"></div>
              <span className="text-[8px] font-mono-tech text-cyan-400/50 uppercase">Sync_Level: {affection.sylvia}%</span>
            </div>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="relative z-50 p-6 pb-12 flex justify-between items-end bg-gradient-to-t from-black via-black/40 to-transparent">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "SQUAD", icon: "▢", action: () => setScene('SQUAD') },
              { label: "ARCHIVE", icon: "▤", action: () => setScene('ARCHIVE') },
              { label: "LOGS", icon: "▧", action: () => alert('Logs history system') }
            ].map((m, i) => (
              <div key={i} onClick={m.action} className="flex flex-col items-center group cursor-pointer transition-transform active:scale-90">
                <div className="w-12 h-12 bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-center clip-sf-hex group-hover:border-cyan-400 transition-all">
                  <span className="text-cyan-400 text-xl">{m.icon}</span>
                </div>
                <span className="text-[8px] font-orbitron text-cyan-400/50 mt-1 uppercase tracking-widest">{m.label}</span>
              </div>
            ))}
          </div>

          <button onClick={handleDeploy} className="w-48 h-20 bg-cyan-950/40 border-2 border-cyan-400 clip-sf-slant relative group transition-all active:scale-95 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-cyan-400"></div>
            <div className="flex flex-col items-start px-8 justify-center h-full">
              <span className="text-2xl font-black font-orbitron text-white italic drop-shadow-[0_0_10px_cyan] uppercase leading-none">Deploy</span>
              <span className="text-[9px] font-mono-tech text-cyan-400/70 uppercase tracking-widest mt-1">Combat_Ready</span>
            </div>
          </button>
        </div>
        <div className="scanlines"></div>
      </div>
    );
  }

  if (scene === 'SQUAD') return <SquadList characters={characters} affection={affection} onBack={handleToLobby} />;
  if (scene === 'ARCHIVE') return <ArchiveGallery onBack={handleToLobby} />;
  
  if (scene === 'CHRONICLES') {
    return (
      <div className="w-full h-full bg-[#020508] flex flex-col relative overflow-y-auto pt-28 pb-32 px-5">
        <div className="fixed inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="fixed top-0 left-0 w-full p-8 z-50 bg-gradient-to-b from-black to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-10 bg-cyan-500 shadow-[0_0_15px_cyan]"></div>
            <h2 className="font-orbitron font-black text-4xl text-white uppercase italic tracking-tighter">Index</h2>
          </div>
        </div>
        <div className="relative z-10 space-y-6">
          {chronicles.map((ch) => (
            <SFButton key={ch.id} id={ch.id} label={ch.title} subtitle={ch.subtitle} locked={ch.locked} onClick={() => !ch.locked && alert(`Deploying...`)} />
          ))}
        </div>
        <button onClick={handleToLobby} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-12 py-3 border border-cyan-500/50 bg-cyan-950/60 text-cyan-400 font-orbitron text-[10px] tracking-[0.4em] uppercase hover:bg-cyan-500 hover:text-white transition-all">
          Back_to_Base
        </button>
        <div className="scanlines"></div>
      </div>
    );
  }

  return null;
};

export default App;
