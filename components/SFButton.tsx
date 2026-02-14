
import React from 'react';
import { Faction } from '../types';

interface SFButtonProps {
  faction: Faction;
  label: string;
  onClick: () => void;
}

const SFButton: React.FC<SFButtonProps> = ({ faction, label, onClick }) => {
  const isBlue = faction === Faction.SPACE_FEDERATION;
  
  const baseStyles = "relative group cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 w-full";
  
  const colors = isBlue 
    ? {
        border: "border-blue-500",
        bg: "bg-blue-900/40",
        hoverBg: "hover:bg-blue-600/50",
        text: "text-blue-100",
        glow: "shadow-[0_0_25px_rgba(59,130,246,0.5)]",
        line: "bg-blue-400",
        accent: "text-blue-400"
      } 
    : {
        border: "border-red-500",
        bg: "bg-red-900/40",
        hoverBg: "hover:bg-red-600/50",
        text: "text-red-100",
        glow: "shadow-[0_0_25px_rgba(239,68,68,0.5)]",
        line: "bg-red-400",
        accent: "text-red-400"
      };

  return (
    <div className={baseStyles} onClick={onClick}>
      {/* Aggressive SF Hexagonal/Slanted Shape */}
      <div className={`
        ${colors.bg} ${colors.hoverBg} ${colors.glow}
        border-l-4 ${colors.border}
        backdrop-blur-md relative overflow-hidden transition-all duration-500
        px-12 py-6
      `}
      style={{
        clipPath: 'polygon(0% 0%, 90% 0%, 100% 30%, 100% 100%, 10% 100%, 0% 70%)'
      }}>
        {/* Animated Scanning Effect */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[scan_2s_infinite]`}></div>
        </div>

        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="flex items-center space-x-2 mb-2">
             <div className={`w-1 h-1 ${colors.line} animate-ping`}></div>
             <span className={`text-[9px] font-orbitron tracking-[0.2em] ${colors.accent}`}>
                {isBlue ? 'U.S.F_CORE_PROTOCOL' : 'E.U.N_TERRA_LINK'}
             </span>
             <div className={`w-1 h-1 ${colors.line} animate-ping`}></div>
          </div>
          
          <span className={`text-2xl font-black tracking-[0.2em] ${colors.text} uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]`}>
            {label.split('(')[0].trim()}
          </span>
          
          <div className="mt-1 flex items-center space-x-4 opacity-40">
              <div className={`h-[1px] w-8 ${colors.line}`}></div>
              <span className={`text-[10px] font-mono-tech ${colors.text}`}>
                {label.includes('(') ? label.match(/\(([^)]+)\)/)?.[1] : 'IDENTITY_VERIFIED'}
              </span>
              <div className={`h-[1px] w-8 ${colors.line}`}></div>
          </div>
        </div>

        {/* Decorative HUD Elements */}
        <div className={`absolute top-2 left-4 w-1 h-4 ${colors.line} opacity-30`}></div>
        <div className={`absolute bottom-2 right-4 w-1 h-4 ${colors.line} opacity-30`}></div>
        
        {/* Animated Corner Glitch Line */}
        <div className={`absolute top-0 right-0 w-20 h-1 ${colors.line} opacity-0 group-hover:opacity-100 transition-opacity group-hover:animate-pulse`}></div>
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
