import { useState, useEffect } from 'react';

export type TextSize = 'S' | 'M' | 'L';

export interface PlayerSettings {
  textSize: TextSize;
  reduceMotion: boolean;
  immersionFx: boolean;
  showStatus: boolean;
  autoSave: boolean;
}

const DEFAULT_SETTINGS: PlayerSettings = {
  textSize: 'M',
  reduceMotion: false,
  immersionFx: true,
  showStatus: true,
  autoSave: true,
};

const STORAGE_KEY = 'nachtzug19_player_settings';

export function usePlayerSettings() {
  const [settings, setSettings] = useState<PlayerSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting };
}
