// ============================================================================
// Debug Overlay
// ============================================================================
// Zeigt Debug-Informationen über den aktuellen State und verfügbare Choices
// Aktivierbar per Tastenkombination (Ctrl+D) oder Toggle-Button
// ============================================================================

import React, { useState, useEffect } from 'react';
import { GameState, Scene, Choice } from '../../domain/types';

interface DebugOverlayProps {
  state: GameState;
  currentScene: Scene | null;
  availableChoices: Choice[];
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  state,
  currentScene,
  availableChoices
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'state' | 'choices' | 'history'>('state');

  // Keyboard shortcut: Ctrl+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-accent text-paper px-3 py-2 rounded shadow-lg hover:bg-accent-light transition-colors text-xs font-mono z-50"
        title="Debug-Overlay öffnen (Ctrl+D)"
      >
        DEBUG
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-paper max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg shadow-2xl border-2 border-accent">
        {/* Header */}
        <div className="bg-accent text-paper p-4 flex justify-between items-center">
          <h2 className="font-title text-lg uppercase tracking-wide">Debug Overlay</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-accent-light px-3 py-1 rounded transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-ink/10">
          <TabButton
            label="State"
            active={activeTab === 'state'}
            onClick={() => setActiveTab('state')}
          />
          <TabButton
            label="Choices"
            active={activeTab === 'choices'}
            onClick={() => setActiveTab('choices')}
          />
          <TabButton
            label="History"
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          />
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {activeTab === 'state' && <StateTab state={state} currentScene={currentScene} />}
          {activeTab === 'choices' && <ChoicesTab choices={availableChoices} state={state} currentScene={currentScene} />}
          {activeTab === 'history' && <HistoryTab history={state.history} />}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Tab Button
// ============================================================================

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({
  label,
  active,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-title text-sm uppercase tracking-wide transition-colors ${
      active
        ? 'bg-accent/10 text-accent border-b-2 border-accent'
        : 'text-ink/60 hover:bg-ink/5'
    }`}
  >
    {label}
  </button>
);

// ============================================================================
// State Tab
// ============================================================================

const StateTab: React.FC<{ state: GameState; currentScene: Scene | null }> = ({ state, currentScene }) => {
  return (
    <div className="space-y-4">
      {/* Current Scene */}
      <Section title="Current Scene">
        <KeyValue label="ID" value={state.current_scene_id} />
        <KeyValue label="Chapter" value={state.chapter_index} />
        <KeyValue label="Title" value={currentScene?.title || 'N/A'} />
        <KeyValue label="Tags" value={currentScene?.tags?.join(', ') || 'none'} />
      </Section>

      {/* Tickets */}
      <Section title="Tickets">
        <KeyValue label="Truth" value={`${state.tickets.tickets_truth}/5`} />
        <KeyValue label="Escape" value={`${state.tickets.tickets_escape}/5`} />
        <KeyValue label="Guilt" value={`${state.tickets.tickets_guilt}/5`} />
        <KeyValue label="Love" value={`${state.tickets.tickets_love}/5`} />
      </Section>

      {/* Pressure */}
      <Section title="Pressure">
        <KeyValue label="Memory Drift" value={`${state.pressure.memory_drift}/6`} />
        <KeyValue label="Conductor Attention" value={`${state.pressure.conductor_attention}/6`} />
      </Section>

      {/* Relations */}
      <Section title="Relations">
        <KeyValue label="Comp7" value={state.relations.rel_comp7} />
        <KeyValue label="Boy" value={state.relations.rel_boy} />
        <KeyValue label="Sleepless" value={state.relations.rel_sleepless} />
      </Section>

      {/* Items */}
      <Section title="Items">
        <KeyValue label="Recorder" value={state.items.has_recorder ? '✓' : '✗'} />
        <KeyValue label="Tag 19" value={state.items.has_tag19 ? '✓' : '✗'} />
        <KeyValue label="Photo Anomaly" value={state.items.photo_anomaly ? '✓' : '✗'} />
      </Section>

      {/* Meta */}
      <Section title="Meta">
        <KeyValue label="Station Count" value={state.station_count} />
        <KeyValue label="Visited Scenes" value={state.visited_scene_ids.length} />
        <KeyValue label="Save Version" value={state.save_version} />
      </Section>

      {/* Legacy Stats */}
      <Section title="Legacy Stats (deprecated)">
        <KeyValue label="Mut" value={state.stats.mut} />
        <KeyValue label="Wissen" value={state.stats.wissen} />
        <KeyValue label="Empathie" value={state.stats.empathie} />
      </Section>
    </div>
  );
};

// ============================================================================
// Choices Tab
// ============================================================================

const ChoicesTab: React.FC<{ choices: Choice[]; state: GameState; currentScene: Scene | null }> = ({
  choices,
  currentScene
}) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-ink/60">
        Showing {choices.length} available choice(s) for scene: {currentScene?.id}
      </div>

      {choices.map((choice, idx) => (
        <div key={idx} className="border border-ink/10 rounded p-3 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-title text-sm uppercase text-accent">{choice.id}</div>
              <div className="text-sm">{choice.label}</div>
            </div>
            <div className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">
              Available
            </div>
          </div>

          {/* Condition */}
          {choice.condition && (
            <div className="text-xs space-y-1">
              <div className="font-mono text-ink/60">Condition:</div>
              <pre className="bg-ink/5 p-2 rounded overflow-x-auto">
                {JSON.stringify(choice.condition, null, 2)}
              </pre>
            </div>
          )}

          {/* Effects */}
          {choice.effects && choice.effects.length > 0 && (
            <div className="text-xs space-y-1">
              <div className="font-mono text-ink/60">Effects ({choice.effects.length}):</div>
              <div className="space-y-1">
                {choice.effects.map((effect, eidx) => (
                  <div key={eidx} className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded font-mono">
                    {effect.type} {effect.target} = {String(effect.value)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next */}
          {choice.next && (
            <div className="text-xs">
              <span className="font-mono text-ink/60">Next:</span>{' '}
              <span className="font-mono text-accent">{choice.next}</span>
            </div>
          )}

          {/* Ending */}
          {choice.ending && (
            <div className="text-xs">
              <span className="font-mono text-ink/60">Ending:</span>{' '}
              <span className="font-mono text-red-600">{choice.ending}</span>
            </div>
          )}
        </div>
      ))}

      {/* Hidden Choices */}
      {currentScene && currentScene.choices.length > choices.length && (
        <div className="border border-red-500/20 rounded p-3 bg-red-500/5">
          <div className="text-sm text-red-600 mb-2">
            {currentScene.choices.length - choices.length} choice(s) hidden (conditions not met)
          </div>
          {currentScene.choices
            .filter(c => !choices.includes(c))
            .map((choice, idx) => (
              <div key={idx} className="text-xs text-ink/60 font-mono">
                • {choice.id} - {choice.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// History Tab
// ============================================================================

const HistoryTab: React.FC<{ history: GameState['history'] }> = ({ history }) => {
  const recentHistory = [...history].reverse().slice(0, 20);

  return (
    <div className="space-y-2">
      <div className="text-sm text-ink/60">
        Showing last {recentHistory.length} of {history.length} entries
      </div>

      {recentHistory.map((entry, idx) => (
        <div key={idx} className="border border-ink/10 rounded p-2 text-xs">
          <div className="flex justify-between">
            <div className="font-mono text-accent">{entry.scene_id}</div>
            <div className="text-ink/60">
              {new Date(entry.timestamp).toLocaleTimeString()}
            </div>
          </div>
          <div className="text-ink/60">Choice: {entry.choice_id}</div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// Helper Components
// ============================================================================

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border border-ink/10 rounded p-3">
    <h3 className="font-title text-sm uppercase tracking-wide text-accent mb-2">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const KeyValue: React.FC<{ label: string; value: string | number | boolean }> = ({ label, value }) => (
  <div className="flex justify-between text-xs">
    <span className="text-ink/60 font-mono">{label}:</span>
    <span className="font-mono font-bold">{String(value)}</span>
  </div>
);
