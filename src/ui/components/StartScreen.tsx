import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onSettings: () => void;
  hideStartButton?: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onSettings, hideStartButton = false }) => {
  return (
    <div className="flex flex-col items-center justify-center relative overflow-hidden">
      {/* Note: Background is handled by parent or layout mostly now, but kept clean here */}

      <div className="relative z-10 text-center px-4 animate-fade-in">
        {/* Logo / Buch Icon */}
        <div className="w-24 h-24 mx-auto mb-4 text-accent animate-float opacity-90">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_15px_rgba(192,160,98,0.3)]">
                <path d="M12 3v18c0-4.42 3.58-8 8-8V3c-4.42 0-8 3.58-8 8zm0 0c0-4.42-3.58-8-8-8v10c4.42 0 8 3.58 8 8V3z" />
             </svg>
        </div>

        {!hideStartButton && (
          <>
            <h1 className="font-title text-4xl md:text-6xl lg:text-7xl text-parchment mb-4 tracking-widest drop-shadow-lg">
              Schattenbibliothek
            </h1>
            <h2 className="font-serif text-xl md:text-2xl text-accent/80 italic mb-12">
              Ein Abenteuer in Nareth
            </h2>

             <button
                onClick={onStart}
                className="w-64 py-4 bg-accent text-midnight font-title font-bold text-lg tracking-[0.2em] uppercase rounded hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(192,160,98,0.2)] mb-6"
              >
                Buch öffnen
              </button>
          </>
        )}

        <button
          onClick={onSettings}
          className="text-parchment/60 hover:text-accent font-title tracking-widest text-sm uppercase transition-colors p-2 border-b border-transparent hover:border-accent"
        >
          Einstellungen
        </button>

        <p className="mt-8 text-white/20 text-xs font-mono">
          v1.0 • Interaktives Textadventure
        </p>
      </div>
    </div>
  );
};
