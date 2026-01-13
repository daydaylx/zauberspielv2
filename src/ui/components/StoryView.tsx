import React from 'react';
import { Scene, Choice, PlayerStats, Flags, GameState } from '../../domain/types';
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
  gameState?: GameState;  // Optional: Für neues System
  storyMode?: 'nachtzug19' | 'legacy';  // Optional: Für StatsBar-Modus
}

const StoryView: React.FC<StoryViewProps> = ({
  scene,
  stats,
  flags,
  inventory,
  onMakeChoice,
  settings,
  gameState,
  storyMode = 'legacy'
}) => {
  // Filter available choices (Legacy-Funktion für alte Conditions)
  const availableChoices = scene.choices.filter(choice => {
    // Legacy: choice.condition als Funktion
    if (typeof choice.condition === 'function') {
      return choice.condition(stats, flags, inventory);
    }
    // Neue Conditions werden von der Engine gehandhabt (in App.tsx)
    // Daher hier immer true, wenn keine Legacy-Condition
    return true;
  });

  const LeftPage = (
    <div className="h-full flex flex-col relative">
      <div className="text-center mb-8 animate-fade-in">
        <h3 className="font-title text-accent text-sm tracking-[0.3em] uppercase mb-2">
          {scene.kapitel || `Kapitel ${scene.chapter}`}
        </h3>
        <div className="w-8 h-0.5 bg-ink/20 mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl text-ink font-bold italic leading-tight">
          {scene.title || scene.titel}
        </h2>
      </div>

      {/* Atmosphere / Context Description (Placeholder logic) */}
      <div className="flex-grow flex items-center justify-center opacity-10">
        <div className="text-6xl text-ink rotate-12 font-hand">
          {scene.atmosphere === 'danger' ? 'Gefahr' : 
           scene.atmosphere === 'mystic' ? 'Magie' : 
           scene.atmosphere === 'tense' ? 'Spannung' : 'Nareth'}
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

        {gameState ? (
          <StatsBar state={gameState} mode={storyMode} />
        ) : (
          <StatsBar state={{ stats, tickets: { tickets_truth: 0, tickets_escape: 0, tickets_guilt: 0, tickets_love: 0 }, pressure: { conductor_attention: 0, memory_drift: 0 }, relations: { rel_comp7: 0, rel_boy: 0, rel_sleepless: 0 }, items: { has_recorder: false, has_tag19: false, photo_anomaly: false }, current_scene_id: '', visited_scene_ids: [], chapter_index: 1, station_count: 0, history: [], isGameOver: false, save_version: 1 }} mode="legacy" />
        )}
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
