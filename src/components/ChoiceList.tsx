import React from 'react';
import { Choice } from '../types';

interface ChoiceListProps {
  choices: Choice[];
  onChoice: (choice: Choice) => void;
  disabled?: boolean;
}

export const ChoiceList: React.FC<ChoiceListProps> = ({ choices, onChoice, disabled }) => {
  return (
    <div className="flex flex-col space-y-4 mt-8 px-4 pb-8">
      {choices.map((choice, idx) => (
        <button
          key={idx}
          onClick={() => onChoice(choice)}
          disabled={disabled}
          className={`
            group relative w-full text-left py-2 pl-6 pr-4
            transition-all duration-500 ease-out
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
            {/* Hover Marker (Feder/Pfeil) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent text-xl">
                ❧
            </div>

            {/* Text mit 'Handgeschrieben'-Feeling */}
            <span className="relative z-10 font-serif text-lg md:text-xl leading-relaxed text-ink/90 group-hover:text-ink transition-colors duration-300 border-b border-transparent group-hover:border-accent/50 pb-1">
               {choice.text}
            </span>

            {/* Belohnungs-Indikatoren (Subtiler) */}
            <div className="flex flex-wrap gap-3 mt-1 pl-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                {choice.itemBelohnung && (
                    <span className="text-xs font-title uppercase tracking-widest text-amber-800/80 flex items-center gap-1">
                        <span className="text-lg leading-none">⚱</span> {choice.itemBelohnung}
                    </span>
                )}
                
                {choice.werteAenderung && (
                    <div className="flex gap-2 text-xs font-title tracking-widest text-ink/50">
                        {choice.werteAenderung.mut ? <span>+MUT</span> : null}
                        {choice.werteAenderung.wissen ? <span>+WISSEN</span> : null}
                        {choice.werteAenderung.empathie ? <span>+EMPATHIE</span> : null}
                    </div>
                )}
            </div>
        </button>
      ))}
    </div>
  );
};
