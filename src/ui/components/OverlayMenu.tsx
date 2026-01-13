import React from 'react';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    textSpeed: number;
    typingEnabled: boolean;
  };
  onUpdateSettings: (key: string, value: any) => void;
  onSave: () => void;
  onLoad: () => void;
}

export const OverlayMenu: React.FC<OverlayMenuProps> = ({ isOpen, onClose, settings, onUpdateSettings, onSave, onLoad }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md p-8 bg-midnight border border-accent rounded shadow-2xl transform transition-all scale-100">
        <h2 className="font-title text-2xl text-accent mb-6 text-center tracking-widest uppercase border-b border-accent/30 pb-4">
          Einstellungen
        </h2>

        <div className="space-y-6 text-parchment">
            {/* Typing Toggle */}
            <div className="flex items-center justify-between">
                <span className="font-serif text-lg">Feder-Effekt</span>
                <button 
                    onClick={() => onUpdateSettings('typingEnabled', !settings.typingEnabled)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.typingEnabled ? 'bg-accent' : 'bg-white/20'}`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-midnight rounded-full transition-all duration-300 ${settings.typingEnabled ? 'left-7' : 'left-1'}`} />
                </button>
            </div>

            {/* Speed Slider */}
            <div className="space-y-2">
                <div className="flex justify-between font-serif text-lg">
                    <span>Schreibgeschwindigkeit</span>
                    <span className="text-white/50 text-sm">{settings.textSpeed}ms</span>
                </div>
                <input 
                    type="range" 
                    min="5" 
                    max="100" 
                    value={settings.textSpeed} 
                    onChange={(e) => onUpdateSettings('textSpeed', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-white/30 font-title">
                    <span>Schnell</span>
                    <span>Langsam</span>
                </div>
            </div>

            {/* Save / Load Section */}
            <div className="border-t border-white/10 pt-6 mt-6">
                <h3 className="font-title text-sm text-accent/70 uppercase tracking-widest mb-4">Spielstand</h3>
                <div className="flex gap-4">
                    <button 
                        onClick={() => { onSave(); onClose(); }}
                        className="flex-1 py-2 border border-accent/40 text-parchment hover:bg-accent/20 hover:border-accent transition-all rounded font-serif"
                    >
                        Speichern
                    </button>
                    <button 
                        onClick={() => { onLoad(); onClose(); }}
                        className="flex-1 py-2 border border-accent/40 text-parchment hover:bg-accent/20 hover:border-accent transition-all rounded font-serif"
                    >
                        Laden
                    </button>
                </div>
            </div>
        </div>

        <button 
            onClick={onClose}
            className="mt-8 w-full py-3 border border-accent/50 text-accent hover:bg-accent hover:text-midnight transition-all duration-300 font-title tracking-widest uppercase rounded"
        >
            Schließen
        </button>
      </div>
    </div>
  );
};
