import React from 'react';
import { PlayerStats } from '../types';

interface StatsBarProps {
  stats: PlayerStats;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <div className="flex justify-center space-x-8 py-4 border-t border-ink/10 mt-auto">
      <StatItem label="Mut" value={stats.mut} icon={<path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />} />
      <StatItem label="Wissen" value={stats.wissen} icon={<path d="M12 2l9 4v12l-9 4-9-4V6l9-4z" />} />
      <StatItem label="Empathie" value={stats.empathie} icon={<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />} />
    </div>
  );
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
