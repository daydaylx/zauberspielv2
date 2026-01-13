
import { Scene } from '../types';

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export function validateScenes(scenes: Record<string, Scene>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const sceneIds = Object.keys(scenes);

  // Helper to check state keys
  const validStateKeys = [
    'tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love',
    'conductor_attention', 'memory_drift',
    'rel_comp7', 'rel_boy', 'rel_sleepless',
    'has_recorder', 'has_tag19', 'photo_anomaly',
    // legacy
    'mut', 'wissen', 'empathie'
  ];

  const checkStateKey = (key: string) => {
    if (!validStateKeys.includes(key) && !key.startsWith('has_') && !key.startsWith('flag_')) {
       // Warn?
    }
  };

  // Check 1: Graph integrity
  sceneIds.forEach(id => {
    const scene = scenes[id];

    // Check choices
    if (!scene.choices || scene.choices.length === 0) {
      if (!scene.tags?.includes('ending')) { // Unless it's an ending scene, but endings are usually separate
         warnings.push(`Scene '${id}' has no choices (Dead End?).`);
      }
    }

    scene.choices.forEach((choice) => {
      // Check next scene
      const nextId = choice.next || choice.naechsteSzeneId;
      if (!nextId) {
        errors.push(`Choice in '${id}' has no 'next' target.`);
      } else if (!scenes[nextId] && !nextId.startsWith('ENDING_') && nextId !== 'ending') {
        errors.push(`Choice in '${id}' points to missing scene '${nextId}'.`);
      }

      // Check effects presence
      if (!choice.effects || choice.effects.length === 0) {
        // warnings.push(`Choice in '${id}' has no effects.`);
      } else {
        choice.effects.forEach(eff => {
            checkStateKey(eff.target);
        });
      }

      // Check conditions keys
      if (choice.condition && typeof choice.condition === 'object' && 'type' in choice.condition && choice.condition.type === 'comparison') {
          if (choice.condition.target) checkStateKey(choice.condition.target);
      }
    });
  });

  // Rule: Chapter 2/3/5 need a control scene
  const chaptersWithControl = new Set<number>();
  Object.values(scenes).forEach(s => {
      if (s.tags?.includes('control')) {
          chaptersWithControl.add(Number(s.kapitel));
      }
  });

  [2, 3, 5].forEach(chap => {
      if (!chaptersWithControl.has(chap)) {
          // Check if we even have scenes for this chapter
          const hasChapScenes = Object.values(scenes).some(s => Number(s.kapitel) === chap);
          if (hasChapScenes) {
             warnings.push(`Chapter ${chap} is missing a 'control' scene.`);
          }
      }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
