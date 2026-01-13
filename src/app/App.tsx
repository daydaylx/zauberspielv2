import { useState, useEffect } from 'react';
import { gameEngine } from '../domain/engine/gameEngine';
import { loadStory } from '../domain/engine/loader';
import { GameState } from '../domain/types';
import StoryView from '../ui/components/StoryView';
import { EndingView } from '../ui/components/EndingView';
import { StartScreen } from '../ui/components/StartScreen';
import { HeaderBar } from '../ui/components/HeaderBar';
import { OverlayMenu } from '../ui/components/OverlayMenu';
import { AtmosphereEffects } from '../ui/components/AtmosphereEffects';
import { DebugOverlay } from '../ui/components/DebugOverlay';

function App() {
  const [gameState, setGameState] = useState<GameState>(gameEngine.getState());
  const [view, setView] = useState<'start' | 'game' | 'ending'>('start');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
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

  const handleStartLegacy = () => {
    gameEngine.setMode('legacy');
    setView('game');
  };

  const handleStartNachtzug = () => {
    const { scenes, startSceneId } = loadStory();
    gameEngine.loadContent(scenes, startSceneId);
    setView('game');
  };

  const handleRestart = () => {
    gameEngine.startGame();
    setView('game'); // Reset view
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Keyboard shortcut for debug
  useEffect(() => {
      const down = (e: KeyboardEvent) => {
          if (e.key === 'd' && e.ctrlKey) {
              setDebugMode(prev => !prev);
          }
      }
      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
  }, []);

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
            <div className="flex flex-col gap-4 items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-8">Choose Story</h1>
                <button onClick={handleStartNachtzug} className="px-6 py-3 bg-accent text-white rounded hover:bg-opacity-90 transition">
                    Start NACHTZUG 19 (New)
                </button>
                <button onClick={handleStartLegacy} className="px-6 py-3 border border-ink/30 rounded hover:bg-ink/5 transition">
                    Start Legacy Story
                </button>
                <div className="mt-8">
                    <StartScreen onStart={handleStartLegacy} onSettings={() => setIsMenuOpen(true)} hideStartButton={true} />
                </div>
            </div>
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
      
      {debugMode && <DebugOverlay state={gameState} />}

      {/* Vignette Overlay immer aktiv für Atmosphäre */}
      <div className="pointer-events-none fixed inset-0 bg-vignette z-[5] opacity-40 mix-blend-multiply" />
    </div>
  );
}

export default App;
