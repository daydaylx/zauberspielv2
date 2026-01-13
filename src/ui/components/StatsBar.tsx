import React from 'react';
import { PlayerStats, GameState } from '../../domain/types';

interface StatsBarProps {
  // We can pass the full game state to access all new stats
  gameState?: GameState;
  // Legacy support props
  stats?: PlayerStats;
}

export const StatsBar: React.FC<StatsBarProps> = ({ gameState, stats }) => {
  // If we have full game state and valid nachtzug stats, use them
  if (gameState && gameState.nachtzugStats) {
      const ns = gameState.nachtzugStats;
      const items = gameState.items;

      return (
        <div className="flex flex-col w-full border-t border-ink/10 py-2 bg-paper-dark/30">
            {/* Top Row: Tickets & Drift */}
            <div className="flex justify-center space-x-6 pb-2">
                <div className="flex space-x-2">
                    <StatBadge label="Truth" value={ns.tickets_truth} color="text-blue-600" />
                    <StatBadge label="Escape" value={ns.tickets_escape} color="text-green-600" />
                    <StatBadge label="Guilt" value={ns.tickets_guilt} color="text-red-600" />
                    <StatBadge label="Love" value={ns.tickets_love} color="text-pink-600" />
                </div>
                <div className="w-px bg-ink/20 mx-2"></div>
                <div className="flex space-x-4">
                    <StatMeter label="Drift" value={ns.memory_drift} max={6} />
                    <StatMeter label="Attention" value={ns.conductor_attention} max={6} color="bg-red-500" />
                </div>
            </div>

            {/* Bottom Row: Relations & Items */}
            <div className="flex justify-between px-8 text-xs text-ink/60">
                <div className="flex space-x-4">
                    <span>Rel. Boy: {ns.rel_boy}</span>
                    <span>Rel. Sleepless: {ns.rel_sleepless}</span>
                </div>
                <div className="flex space-x-2">
                    {items.has_recorder && <span title="Recorder">🎙️</span>}
                    {items.has_tag19 && <span title="Tag 19">🎫</span>}
                </div>
            </div>
        </div>
      );
  }

  // Legacy fallback
  if (stats) {
      return (
        <div className="flex justify-center space-x-8 py-4 border-t border-ink/10 mt-auto">
          <StatItem label="Mut" value={stats.mut} icon={<path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />} />
          <StatItem label="Wissen" value={stats.wissen} icon={<path d="M12 2l9 4v12l-9 4-9-4V6l9-4z" />} />
          <StatItem label="Empathie" value={stats.empathie} icon={<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />} />
        </div>
      );
  }

  return null;
};

const StatItem = ({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) => (
  <div className="flex flex-col items-center group">
    <div className="w-8 h-8 mb-1 text-accent group-hover:text-accent-light transition-colors duration-300">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
        {icon}
      </svg>
    </div>
    <span className="font-title text-xs tracking-widest text-ink/60 uppercase">{label}</span>
    <span className="font-serif font-bold text-lg text-ink">{value}</span>
  </div>
);

const StatBadge = ({ label, value, color }: { label: string, value: number, color?: string }) => (
    <div className="flex flex-col items-center min-w-[3rem]">
        <span className={`text-lg font-bold ${color || 'text-ink'}`}>{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-ink/50">{label}</span>
    </div>
);

const StatMeter = ({ label, value, max, color }: { label: string, value: number, max: number, color?: string }) => (
    <div className="flex flex-col w-24">
        <div className="flex justify-between text-[10px] uppercase text-ink/50 mb-1">
            <span>{label}</span>
            <span>{value}/{max}</span>
        </div>
        <div className="h-1 bg-ink/10 rounded-full overflow-hidden">
            <div
                className={`h-full ${color || 'bg-ink'} transition-all duration-500`}
                style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
            />
        </div>
    </div>
);
