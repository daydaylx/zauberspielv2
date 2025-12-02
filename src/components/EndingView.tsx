import React from 'react';
import { Ending } from '../types';
import { BookLayout } from '../layout/BookLayout';

interface EndingViewProps {
  ending: Ending;
  onRestart: () => void;
}

export const EndingView: React.FC<EndingViewProps> = ({ ending, onRestart }) => {
  
  const LeftPage = (
    <div className="h-full flex flex-col justify-center items-center text-center">
       <div className="text-6xl mb-6 text-accent animate-pulse">
          Ω
       </div>
       <h2 className="font-title text-4xl text-ink mb-4 tracking-widest uppercase">
         Ende
       </h2>
       <div className="w-16 h-1 bg-ink/80 mx-auto rounded" />
    </div>
  );

  const RightPage = (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-8">
      <h3 className="font-serif text-3xl italic text-ink font-bold">
        {ending.titel}
      </h3>
      
      <p className="text-lg text-ink/80 font-serif leading-relaxed">
        {ending.beschreibung}
      </p>

      <div className="pt-12">
        <button 
            onClick={onRestart}
            className="btn-primary"
        >
            Geschichte neu schreiben
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in">
       <BookLayout leftContent={LeftPage} rightContent={RightPage} />
    </div>
  );
};