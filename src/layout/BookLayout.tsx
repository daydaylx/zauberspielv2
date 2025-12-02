import React from 'react';

interface BookLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export const BookLayout: React.FC<BookLayoutProps> = ({ leftContent, rightContent, className = '' }) => {
  return (
    <div className={`relative w-full max-w-6xl mx-auto perspective-1000 ${className}`}>
      
      {/* Buchdeckel Hintergrund (Desktop) */}
      <div className="hidden md:block absolute inset-0 bg-[#3e2c22] rounded-lg transform translate-y-4 translate-x-4 shadow-2xl" />
      <div className="hidden md:block absolute inset-0 bg-[#5a3e32] rounded-lg shadow-inner border-4 border-[#2b1d16]" />

      {/* Seiten Container */}
      <div className="relative flex flex-col md:flex-row w-full h-full bg-parchment rounded overflow-hidden book-shadow md:min-h-[80vh]">
        
        {/* Linke Seite (Mobil: Oben/Hidden, Desktop: Links) */}
        <div className="w-full md:w-1/2 relative p-6 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-ink/10 page-texture">
             {/* Dekorativer Innenrahmen */}
            <div className="absolute inset-4 md:inset-6 border border-ink/5 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col">
                {leftContent}
            </div>
            
            {/* Seitenzahl Links */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-ink/40 font-title text-xs hidden md:block">
                — I —
            </div>
        </div>

        {/* Buchfalz (Nur Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-black/10 to-transparent z-20 pointer-events-none mix-blend-multiply" />

        {/* Rechte Seite */}
        <div className="w-full md:w-1/2 relative p-6 md:p-12 lg:p-16 page-texture min-h-[60vh]">
            {/* Dekorativer Innenrahmen */}
            <div className="absolute inset-4 md:inset-6 border border-ink/5 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col">
                {rightContent}
            </div>

             {/* Seitenzahl Rechts */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-ink/40 font-title text-xs">
                — II —
            </div>
        </div>
      </div>
    </div>
  );
};
