import React from 'react';

interface HeaderBarProps {
  title: string;
  onMenuToggle: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ title, onMenuToggle }) => {
  return (
    <div className="w-full h-12 flex items-center justify-between px-4 md:px-8 border-b border-white/5 bg-midnight/50 backdrop-blur-sm fixed top-0 z-50">
      <div className="font-title text-accent text-sm tracking-[0.2em] uppercase opacity-80">
        Nachtzug 19
      </div>
      
      <div className="font-serif text-parchment text-lg italic opacity-60 hidden md:block">
        {title}
      </div>

      <button 
        onClick={onMenuToggle}
        className="text-parchment hover:text-accent transition-colors p-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
           <line x1="3" y1="12" x2="21" y2="12"></line>
           <line x1="3" y1="6" x2="21" y2="6"></line>
           <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};
