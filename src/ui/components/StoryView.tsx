import React from 'react';
import { Scene, Choice, PlayerStats, Flags } from '../../domain/types';
import { gameEngine } from '../../domain/engine/gameEngine';
import { BookLayout } from '../layout/BookLayout';
import { TypewriterText } from './TypewriterText';
import { ChoiceList } from './ChoiceList';
import { StatsBar } from './StatsBar';

interface StoryViewProps {
  scene: Scene;
  stats: PlayerStats;
  flags: Flags;
  inventory: string[];
  onMakeChoice: (choice: Choice) => void;
  settings: {
    textSpeed: number;
    typingEnabled: boolean;
  };
}

const StoryView: React.FC<StoryViewProps> = ({ scene, stats, flags, inventory, onMakeChoice, settings }) => {
  // Use engine helper to evaluate conditions for new choices, or run old condition function
  const gameState = gameEngine.getState();

  const availableChoices = scene.choices.filter(choice => {
      // Legacy condition function
      if (typeof choice.condition === 'function') {
          return choice.condition(stats, flags, inventory);
      }
      // New condition object or legacy string
      return gameEngine.evaluateCondition(choice.condition, gameState);
  });

  const LeftPage = (
    <div className="h-full flex flex-col relative">
      <div className="text-center mb-8 animate-fade-in">
        <h3 className="font-title text-accent text-sm tracking-[0.3em] uppercase mb-2">
          {typeof scene.kapitel === 'number' ? `Kapitel ${scene.kapitel}` : scene.kapitel}
        </h3>
        <div className="w-8 h-0.5 bg-ink/20 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl text-ink font-bold italic leading-tight">
          {scene.titel}
        </h2>
      </div>

      {/* Atmosphere / Context Description */}
      <div className="flex-grow flex items-center justify-center opacity-10">
        <div className="text-6xl text-ink rotate-12 font-hand">
          {scene.atmosphere === 'danger' ? 'Gefahr' : 
           scene.atmosphere === 'mystic' ? 'Magie' : 
           scene.atmosphere === 'tense' ? 'Spannung' :
           scene.atmosphere === 'somber' ? 'Düster' : ''}
        </div>
      </div>

      <div className="mt-auto space-y-6">
        {inventory.length > 0 && (
            <div className="bg-white/30 p-4 rounded border border-ink/5">
                <h4 className="font-title text-xs uppercase tracking-widest text-ink/50 mb-2">Inventar</h4>
                <div className="flex flex-wrap gap-2">
                    {inventory.map((item, i) => (
                        <span key={i} className="px-2 py-1 bg-white/50 border border-ink/10 text-ink font-serif text-sm rounded-sm shadow-sm">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        )}

        {/* Pass global state to StatsBar to handle both legacy and new stats */}
        <StatsBar stats={stats} gameState={gameState} />
      </div>
    </div>
  );

  const RightPage = (
    <div className="h-full flex flex-col animate-ink-in">
      <div className="flex-grow overflow-y-auto scrollbar-custom pr-2">
        <TypewriterText 
            text={scene.narrative || scene.beschreibung || ''}
            speed={settings.textSpeed} 
            enabled={settings.typingEnabled}
            key={scene.id} // Force reset on scene change
        />
      </div>
      
      <div className="mt-8 border-t-2 border-ink/5 pt-4">
        <ChoiceList 
            choices={availableChoices} 
            onChoice={onMakeChoice} 
        />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex items-center justify-center p-2 md:p-8 animate-fade-in">
      <BookLayout 
        leftContent={LeftPage}
        rightContent={RightPage}
        className="transform transition-transform duration-500"
      />
    </div>
  );
};

export default StoryView;
