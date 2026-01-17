import React, { useState } from 'react';
import { Scene, Choice, GameState } from '../../../domain/types';
import { PlayerSettings } from './state/settings';
import { Topbar } from './components/Topbar';
import { ReaderCard } from './components/ReaderCard';
import { ChoiceTray } from './components/ChoiceTray';
import { StatusDrawer } from './components/StatusDrawer';
import { StationOverlay } from './components/StationOverlay';
import { AnnouncementBanner } from './components/AnnouncementBanner';

interface PlayerScreenProps {
  scene: Scene;
  choices: Choice[];
  gameState: GameState;
  onChoice: (c: Choice) => void;
  settings: PlayerSettings;
  onUpdateSettings: <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => void;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({
  scene,
  choices,
  gameState,
  onChoice,
  settings,
  onUpdateSettings
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  const handleChoice = (c: Choice) => {
    setProcessing(true);
    // Visual delay for "punching" ticket
    setTimeout(() => {
      onChoice(c);
      setProcessing(false);
    }, 250);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-stone-950 text-stone-200 overflow-hidden">
      {/* Noise Overlay */}
      {settings.immersionFx && <div className="noise-overlay" />}

      <Topbar 
        gameState={gameState} 
        onToggleStatus={() => setDrawerOpen(!isDrawerOpen)} 
        showStatus={settings.showStatus}
      />

      <div className="flex-1 flex flex-col pt-14 relative">
        <AnnouncementBanner scene={scene} />
        
        <ReaderCard 
          scene={scene} 
          textSize={settings.textSize} 
          driftEnabled={settings.immersionFx && gameState.pressure.memory_drift > 2}
        />

        <ChoiceTray 
          choices={choices} 
          onChoose={handleChoice} 
          isProcessing={isProcessing}
        />
      </div>

      <StatusDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        gameState={gameState} 
      />

      <StationOverlay scene={scene} />
      
    </div>
  );
};
