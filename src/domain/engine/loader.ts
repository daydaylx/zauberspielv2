import { manifest } from '../../content/nachtzug19/manifest';
import { scenes as c1 } from '../../content/nachtzug19/scenes/c1';
import { scenes as c2 } from '../../content/nachtzug19/scenes/c2';
import { Scene } from '../types';

// Simple loader that aggregates all scenes.
// In a real app, this might lazy load or fetch from API/JSON.
export function loadStory() {
  const allScenes: Record<string, Scene> = {
    ...c1,
    ...c2
  };

  return {
    manifest,
    scenes: allScenes,
    startSceneId: manifest.start
  };
}
