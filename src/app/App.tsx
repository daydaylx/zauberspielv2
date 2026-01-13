import { useState, useEffect } from 'react';
import { gameEngine } from '../domain/engine/gameEngine';
import { GameState } from '../domain/types';
import StoryView from '../ui/components/StoryView';
import { EndingView } from '../ui/components/EndingView';
import { StartScreen } from '../ui/components/StartScreen';
import { HeaderBar } from '../ui/components/HeaderBar';
import { OverlayMenu } from '../ui/components/OverlayMenu';
import { AtmosphereEffects } from '../ui/components/AtmosphereEffects';

function App() {
  const [gameState, setGameState] = useState<GameState>(gameEngine.getState());
  const [view, setView] = useState<'start' | 'game' | 'ending'>('start');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    textSpeed: 30,
    typingEnabled: true,
    soundEnabled: false
  });

  useEffect(() => {
    const unsubscribe = gameEngine.subscribe((newState) => {
      setGameState({ ...newState });
      if (newState.isGameOver) {
        setView('ending');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStart = () => {
    gameEngine.startGame();
    setView('game');
  };

  const handleRestart = () => {
    gameEngine.startGame();
    setView('game'); // Reset view
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Render Logic
  const currentScene = gameEngine.getCurrentScene();
  const currentEnding = gameEngine.getEnding();

  return (
    <div className="w-full min-h-screen bg-midnight text-ink overflow-hidden relative font-serif selection:bg-accent selection:text-midnight">
      
      {/* Hintergrund-Effekte */}
      <AtmosphereEffects type={currentScene?.atmosphere} />

      {/* Global Header (nur im Spiel sichtbar) */}
      {view === 'game' && (
        <HeaderBar 
            title={currentScene?.titel || ''} 
            onMenuToggle={() => setIsMenuOpen(true)} 
        />
      )}

      {/* Views */}
      <main className="w-full h-full relative z-10">
        {view === 'start' && (
            <StartScreen onStart={handleStart} onSettings={() => setIsMenuOpen(true)} />
        )}

        {view === 'game' && currentScene && (
            <div className="pt-16 h-screen overflow-hidden">
                <StoryView 
                    scene={currentScene}
                    stats={gameState.stats}
                    flags={gameState.flags}
                    inventory={gameState.inventory}
                    onMakeChoice={(choice) => gameEngine.makeChoice(choice)}
                    settings={settings}
                />
            </div>
        )}

        {view === 'ending' && currentEnding && (
             <div className="pt-16 h-screen overflow-hidden">
                <EndingView 
                    ending={currentEnding}
                    onRestart={handleRestart}
                />
            </div>
        )}
      </main>

      {/* Overlays */}
      <OverlayMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        settings={settings}
        onUpdateSettings={handleSettingChange}
        onSave={() => gameEngine.saveGame()}
        onLoad={() => gameEngine.loadGame()}
      />
      
      {/* Vignette Overlay immer aktiv für Atmosphäre */}
      <div className="pointer-events-none fixed inset-0 bg-vignette z-[5] opacity-40 mix-blend-multiply" />
    </div>
  );
}

export default App;
