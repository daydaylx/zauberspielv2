import React from 'react';
import { Choice } from '../types';

interface ChoiceListProps {
  choices: Choice[];
  onChoice: (choice: Choice) => void;
  disabled?: boolean;
}

export const ChoiceList: React.FC<ChoiceListProps> = ({ choices, onChoice, disabled }) => {
  return (
    <div className="flex flex-col space-y-3 mt-6 px-2 pb-6">
      {choices.map((choice, idx) => (
        <button
          key={idx}
          onClick={() => onChoice(choice)}
          disabled={disabled}
          className={`
            group relative w-full text-left p-4 
            bg-white/40 hover:bg-white/80 border border-ink/10 hover:border-accent
            rounded-sm transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md hover:-translate-y-0.5
          `}
        >
            {/* Dekoratives Element links */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/0 group-hover:bg-accent transition-all duration-300 rounded-l-sm" />
            
            <span className="relative z-10 font-serif text-lg leading-snug text-ink group-hover:text-ink pr-8">
               {choice.text}
            </span>

            {choice.itemBelohnung && (
                <div className="absolute right-4 top-4 md:top-1/2 md:-translate-y-1/2 flex items-center gap-1.5 text-amber-700 font-title text-xs uppercase tracking-wider bg-amber-100/50 px-2 py-1 rounded border border-amber-200/50 animate-fade-in">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                       <path d="M20,6h-4V4c0-1.1-0.9-2-2-2h-4C8.9,2,8,2.9,8,4v2H4C2.9,6,2,6.9,2,8v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M10,4h4v2h-4V4z"/>
                    </svg>
                    <span>{choice.itemBelohnung}</span>
                </div>
            )}
            
            {choice.werteAenderung && (
                <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-title text-ink/60">
                    {choice.werteAenderung.mut ? <span>+Mut</span> : null}
                    {choice.werteAenderung.wissen ? <span>+Wissen</span> : null}
                    {choice.werteAenderung.empathie ? <span>+Empathie</span> : null}
                </div>
            )}
        </button>
      ))}
    </div>
  );
};
