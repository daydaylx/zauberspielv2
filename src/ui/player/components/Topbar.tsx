import React from 'react';
import { GameState } from '../../../domain/types';

interface TopbarProps {
  gameState: GameState | null;
  onToggleStatus: () => void;
  showStatus: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ gameState, onToggleStatus, showStatus }) => {
  const chapter = gameState ? gameState.chapter_index : 0;
  
  // Fake Time based on drift/progress? Or just static noir time
  const time = "02:47"; 

  return (
    <header className="fixed top-0 inset-x-0 h-14 bg-stone-950/90 backdrop-blur-sm border-b border-stone-800 flex items-center justify-between px-4 z-30 select-none">
      
      {/* Chapter */}
      <div className="text-stone-500 font-mono text-sm tracking-widest w-20">
        K{chapter}
      </div>

      {/* Title */}
      <div className="text-stone-300 font-bold tracking-[0.2em] text-sm md:text-base">
        NACHTZUG 19
      </div>

      {/* Status Toggle / Time */}
      <div className="w-20 flex justify-end">
        {showStatus ? (
          <button 
            onClick={onToggleStatus}
            className="text-amber-500/80 hover:text-amber-400 font-mono text-sm border border-stone-800 px-2 py-0.5 rounded bg-stone-900 transition-colors"
          >
            STATUS
          </button>
        ) : (
             <span className="text-stone-600 font-mono text-sm">{time}</span>
        )}
      </div>
    </header>
  );
};
