import React from 'react';
import { GameState } from '../../domain/types';
import { gameEngine } from '../../domain/engine/gameEngine';

interface DebugOverlayProps {
  state: GameState;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({ state }) => {
  const currentScene = gameEngine.getCurrentScene();

  if (!currentScene) return null;

  return (
    <div className="fixed top-0 right-0 w-96 h-screen bg-black/90 text-green-400 font-mono text-xs z-[100] overflow-auto p-4 border-l border-green-500/30">
        <h2 className="text-sm font-bold border-b border-green-500/50 mb-2 pb-1">DEBUG MODE</h2>

        <Section title="State">
            <pre className="whitespace-pre-wrap">{JSON.stringify(state.nachtzugStats || state.stats, null, 2)}</pre>
            <div className="mt-2 text-yellow-400">Items: {JSON.stringify(state.items || state.inventory)}</div>
            <div className="mt-2 text-blue-400">Flags: {JSON.stringify(state.flags)}</div>
        </Section>

        <Section title="Current Scene">
            <div>ID: <span className="text-white">{currentScene.id}</span></div>
            <div>Tags: {JSON.stringify(currentScene.tags || [])}</div>
            <div>Atmosphere: {currentScene.atmosphere}</div>
        </Section>

        <Section title="Choices">
            {currentScene.choices.map((c, i) => (
                <div key={i} className="mb-2 p-1 border border-green-500/20 rounded">
                    <div className="font-bold text-white">{c.text || c.label}</div>
                    <div className="text-gray-400">Next: {c.next || c.naechsteSzeneId}</div>
                    {c.condition && <div className="text-yellow-500">Cond: {JSON.stringify(c.condition)}</div>}
                    {c.effects && <div className="text-blue-500">Effects: {JSON.stringify(c.effects)}</div>}
                </div>
            ))}
        </Section>

        <Section title="History (Last 5)">
            {state.history.slice(-5).map((h, i) => (
                <div key={i}>{h}</div>
            ))}
        </Section>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-4">
        <h3 className="uppercase opacity-50 mb-1 font-bold">{title}</h3>
        <div className="pl-2 border-l border-green-500/10">
            {children}
        </div>
    </div>
);
