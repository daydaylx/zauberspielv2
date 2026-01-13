import React from 'react';
import { GameState } from '../../domain/types';

interface StatsBarProps {
  state: GameState;
  mode?: 'nachtzug19' | 'legacy';
}

export const StatsBar: React.FC<StatsBarProps> = ({ state, mode = 'nachtzug19' }) => {
  if (mode === 'legacy') {
    return <LegacyStatsBar stats={state.stats} />;
  }

  return (
    <div className="flex flex-col py-4 border-t border-ink/10 mt-auto space-y-3">
      {/* Tickets */}
      <div className="flex justify-center space-x-4">
        <TicketItem label="Wahrheit" value={state.tickets.tickets_truth} max={5} color="blue" />
        <TicketItem label="Flucht" value={state.tickets.tickets_escape} max={5} color="purple" />
        <TicketItem label="Schuld" value={state.tickets.tickets_guilt} max={5} color="red" />
        <TicketItem label="Liebe" value={state.tickets.tickets_love} max={5} color="pink" />
      </div>

      {/* Pressure & Relations */}
      <div className="flex justify-center space-x-6 text-xs">
        <PressureItem label="Drift" value={state.pressure.memory_drift} max={6} />
        <PressureItem label="Druck" value={state.pressure.conductor_attention} max={6} />
        <RelationItem label="Comp7" value={state.relations.rel_comp7} />
      </div>

      {/* Items */}
      {(state.items.has_recorder || state.items.has_tag19 || state.items.photo_anomaly) && (
        <div className="flex justify-center space-x-2 text-xs">
          {state.items.has_recorder && <ItemBadge label="Rekorder" />}
          {state.items.has_tag19 && <ItemBadge label="Tag 19" />}
          {state.items.photo_anomaly && <ItemBadge label="Foto" />}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Nachtzug19 Components
// ============================================================================

const TicketItem = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const colors = {
    blue: 'bg-blue-500/20 text-blue-600',
    purple: 'bg-purple-500/20 text-purple-600',
    red: 'bg-red-500/20 text-red-600',
    pink: 'bg-pink-500/20 text-pink-600'
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`px-2 py-1 rounded ${colors[color as keyof typeof colors]}`}>
        <span className="font-title text-xs tracking-wide uppercase">{label}</span>
      </div>
      <span className="font-mono text-sm mt-1">{value}/{max}</span>
    </div>
  );
};

const PressureItem = ({ label, value, max }: { label: string; value: number; max: number }) => {
  const percentage = (value / max) * 100;
  const color = percentage > 66 ? 'bg-red-500' : percentage > 33 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="flex items-center space-x-2">
      <span className="font-title text-xs tracking-wide uppercase text-ink/60">{label}</span>
      <div className="w-16 h-2 bg-ink/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${percentage}%` }} />
      </div>
      <span className="font-mono text-xs">{value}</span>
    </div>
  );
};

const RelationItem = ({ label, value }: { label: string; value: number }) => {
  const color = value >= 2 ? 'text-green-600' : value >= 0 ? 'text-ink/60' : 'text-red-600';
  const sign = value > 0 ? '+' : '';

  return (
    <div className="flex items-center space-x-1">
      <span className="font-title text-xs tracking-wide uppercase text-ink/60">{label}</span>
      <span className={`font-mono text-xs font-bold ${color}`}>{sign}{value}</span>
    </div>
  );
};

const ItemBadge = ({ label }: { label: string }) => (
  <div className="px-2 py-1 bg-accent/20 text-accent rounded-sm">
    <span className="font-title text-xs tracking-wide uppercase">{label}</span>
  </div>
);

// ============================================================================
// Legacy Stats Bar
// ============================================================================

const LegacyStatsBar = ({ stats }: { stats: { mut: number; wissen: number; empathie: number } }) => {
  return (
    <div className="flex justify-center space-x-8 py-4 border-t border-ink/10 mt-auto">
      <StatItem label="Mut" value={stats.mut} icon={<path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />} />
      <StatItem label="Wissen" value={stats.wissen} icon={<path d="M12 2l9 4v12l-9 4-9-4V6l9-4z" />} />
      <StatItem label="Empathie" value={stats.empathie} icon={<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />} />
    </div>
  );
};

const StatItem = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
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
