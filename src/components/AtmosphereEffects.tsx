import React, { useEffect, useState } from 'react';
import { Scene } from '../types';

interface AtmosphereEffectsProps {
  type?: Scene['atmosphere'];
}

export const AtmosphereEffects: React.FC<AtmosphereEffectsProps> = ({ type }) => {
  const [particles, setParticles] = useState<Array<{id: number, left: string, size: string, duration: string, delay: string}>>([]);

  useEffect(() => {
    // Generate random particles
    const count = type === 'mystic' ? 30 : type === 'dream' ? 15 : 5;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(newParticles);
  }, [type]);

  if (!type || type === 'normal') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* DANGER: Roter Puls & Vignette */}
      {type === 'danger' && (
        <div className="absolute inset-0 animate-danger mix-blend-multiply z-10" />
      )}

      {/* MYSTIC: Leuchtender Kern & viele Partikel */}
      {type === 'mystic' && (
        <>
          <div className="absolute inset-0 mystic-overlay" />
          {particles.map(p => (
             <div 
               key={p.id}
               className="particle bg-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
               style={{
                 left: p.left,
                 width: p.size,
                 height: p.size,
                 animationDuration: p.duration,
                 animationDelay: p.delay
               }}
             />
          ))}
        </>
      )}

      {/* DREAM: Nebel & weiche Partikel */}
      {type === 'dream' && (
        <>
           {/* Fallback Nebel wenn Bild nicht lädt: Einfacher Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-30" />
           
           {particles.map(p => (
             <div 
               key={p.id}
               className="particle bg-white/40 blur-[2px]"
               style={{
                 left: p.left,
                 width: p.size,
                 height: p.size,
                 animationDuration: `${parseInt(p.duration) * 2}s`, // Langsamer
                 animationDelay: p.delay
               }}
             />
          ))}
        </>
      )}

      {/* TENSE: Dunkle Schatten */}
      {type === 'tense' && (
         <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
      )}
      
       {/* SOMBER: Graustufen & Regen (simuliert durch schnelle Partikel) */}
       {type === 'somber' && (
         <div className="absolute inset-0 bg-slate-900/30 mix-blend-multiply" />
      )}
      
       {/* DARK: Fast schwarz */}
       {type === 'dark' && (
         <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
      )}

    </div>
  );
};
