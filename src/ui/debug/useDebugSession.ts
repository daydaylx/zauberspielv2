import { useCallback, useEffect, useState } from 'react';
import { createInitialState, GameState } from '../../domain/types';
import { StoryBundle } from '../../domain/engine/loadStory';

type StoredSession = {
  state: GameState;
};

function readSession(storageKey: string): GameState | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession | GameState;
    if (parsed && typeof parsed === 'object' && 'state' in parsed) {
      return (parsed as StoredSession).state;
    }
    return parsed as GameState;
  } catch (error) {
    console.warn('[DebugPlayer] Failed to read session:', error);
    return null;
  }
}

function writeSession(storageKey: string, state: GameState): void {
  try {
    const payload: StoredSession = { state };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch (error) {
    console.warn('[DebugPlayer] Failed to persist session:', error);
  }
}

function clearSession(storageKey: string): void {
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.warn('[DebugPlayer] Failed to clear session:', error);
  }
}

export function useDebugSession(bundle: StoryBundle | null, storageKey: string) {
  const [state, setState] = useState<GameState | null>(null);
  const [persistSession, setPersistSession] = useState(false);

  useEffect(() => {
    if (!bundle) return;
    const stored = readSession(storageKey);
    if (stored) {
      setState(stored);
      setPersistSession(true);
    } else {
      setState(createInitialState(bundle.startSceneId));
    }
  }, [bundle, storageKey]);

  useEffect(() => {
    if (!state || !persistSession) return;
    writeSession(storageKey, state);
  }, [persistSession, state, storageKey]);

  const restart = useCallback(() => {
    if (!bundle) return;
    setState(createInitialState(bundle.startSceneId));
  }, [bundle]);

  const resetStorage = useCallback(() => {
    clearSession(storageKey);
  }, [storageKey]);

  return {
    state,
    setState,
    persistSession,
    setPersistSession,
    restart,
    resetStorage
  };
}
