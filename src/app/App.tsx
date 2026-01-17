import { useState, useEffect } from 'react';
import { GameEngine } from '../domain/engine/gameEngine';
import { GameState } from '../domain/types';
import { loadNachtzug19Story, StoryBundle } from '../domain/engine/loadStory';
import { validateContent, printValidationResult } from '../domain/engine/validateContent';
import StoryView from '../ui/components/StoryView';
import { EndingView } from '../ui/components/EndingView';
import { StartScreen } from '../ui/components/StartScreen';
import { HeaderBar } from '../ui/components/HeaderBar';
import { OverlayMenu } from '../ui/components/OverlayMenu';
import { AtmosphereEffects } from '../ui/components/AtmosphereEffects';
import { DebugOverlay } from '../ui/components/DebugOverlay';
import { DebugPlayer } from '../ui/debug';

function App() {
  const [engine, setEngine] = useState<GameEngine | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [storyBundle, setStoryBundle] = useState<StoryBundle | null>(null);
  const [view, setView] = useState<'story-select' | 'start' | 'game' | 'ending' | 'debug'>('story-select');
  const [selectedStory, setSelectedStory] = useState<'nachtzug19' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    textSpeed: 30,
    typingEnabled: true,
    soundEnabled: false
  });

  // Subscribe to engine state changes
  useEffect(() => {
    if (!engine) return;

    const unsubscribe = engine.subscribe((newState) => {
      setGameState({ ...newState });
      if (newState.isGameOver) {
        setView('ending');
      }
    });
    return () => unsubscribe();
  }, [engine]);

  // Load Story
  const handleSelectStory = async (nextView: 'start' | 'debug' = 'start') => {
    setIsLoading(true);
    try {
      const storyBundle = await loadNachtzug19Story();
      console.log('[App] Loaded NACHTZUG 19 story');

      // Validate Content
      const validationResult = validateContent(
        storyBundle.startSceneId,
        storyBundle.scenes,
        storyBundle.endings
      );
      printValidationResult(validationResult);

      if (!validationResult.valid) {
        alert('Content-Validierung fehlgeschlagen! Siehe Konsole für Details.');
      }

      // Create Engine
      const newEngine = new GameEngine(
        storyBundle.scenes,
        storyBundle.endings,
        storyBundle.startSceneId
      );

      setEngine(newEngine);
      setGameState(newEngine.getState());
      setSelectedStory('nachtzug19');
      setStoryBundle(storyBundle);
      setView(nextView);
    } catch (error) {
      console.error('[App] Failed to load story:', error);
      alert('Fehler beim Laden der Story. Siehe Konsole für Details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    if (!engine) return;
    engine.startGame();
    setView('game');
  };

  const handleRestart = () => {
    if (!engine) return;
    engine.startGame();
    setView('game');
  };

  const handleOpenDebug = () => {
    if (storyBundle) {
      setView('debug');
      return;
    }
    handleSelectStory('debug');
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Render Logic
  const currentScene = engine?.getCurrentScene() || null;
  const currentEnding = engine?.getEnding() || null;
  const availableChoices = engine?.getAvailableChoices() || [];

  if (view === 'debug') {
    return (
      <DebugPlayer
        storyBundle={storyBundle}
        onExit={() => setView('start')}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-midnight text-ink overflow-hidden relative font-serif selection:bg-accent selection:text-midnight">

      {/* Hintergrund-Effekte */}
      <AtmosphereEffects type={currentScene?.atmosphere} />

      {/* Global Header (nur im Spiel sichtbar) */}
      {view === 'game' && (
        <HeaderBar
            title={currentScene?.title || currentScene?.titel || ''}
            onMenuToggle={() => setIsMenuOpen(true)}
        />
      )}

      {/* Views */}
      <main className="w-full h-full relative z-10">
        {/* Story Select */}
        {view === 'story-select' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="max-w-2xl w-full space-y-6">
              <h1 className="font-title text-4xl text-center text-accent uppercase tracking-wide">
                Story Auswählen
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {/* Nachtzug19 */}
                <button
                  onClick={() => handleSelectStory()}
                  disabled={isLoading}
                  className="border-2 border-accent bg-paper hover:bg-accent/10 p-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  <h2 className="font-title text-2xl text-accent uppercase mb-2">
                    🚂 NACHTZUG 19
                  </h2>
                  <p className="text-sm text-ink/60">
                    Psychologisches Mystery-Adventure. Ein Zug, der offiziell nicht existiert.
                    Erinnerungen, die sich verändern.
                  </p>
                  <div className="mt-4 text-xs text-accent/60">
                    MVP: Kapitel 1-2 spielbar
                  </div>
                </button>
              </div>

              {isLoading && (
                <div className="text-center text-accent animate-pulse">
                  Lade Story...
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'start' && (
            <StartScreen
              onStart={handleStart}
              onSettings={() => setIsMenuOpen(true)}
              onDebug={handleOpenDebug}
            />
        )}

        {view === 'game' && currentScene && engine && gameState && (
            <div className="pt-16 h-screen overflow-hidden">
                <StoryView
                    scene={currentScene}
                    stats={gameState.stats}
                    flags={{}}
                    inventory={[]}
                    onMakeChoice={(choice) => engine.makeChoice(choice)}
                    settings={settings}
                    gameState={gameState}
                    storyMode={selectedStory || 'nachtzug19'}
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
      {engine && (
        <OverlayMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          settings={settings}
          onUpdateSettings={handleSettingChange}
          onSave={() => engine.saveGame()}
          onLoad={() => {
            const success = engine.loadGame();
            if (success) setView('game');
          }}
        />
      )}

      {/* Debug Overlay (nur im Spiel) */}
      {view === 'game' && gameState && currentScene && (
        <DebugOverlay
          state={gameState}
          currentScene={currentScene}
          availableChoices={availableChoices}
        />
      )}

      {/* Vignette Overlay immer aktiv für Atmosphäre */}
      <div className="pointer-events-none fixed inset-0 bg-vignette z-[5] opacity-40 mix-blend-multiply" />
    </div>
  );
}

export default App;
