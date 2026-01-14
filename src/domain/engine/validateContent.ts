// ============================================================================
// NACHTZUG 19 - Content Validator
// ============================================================================
// Validiert ScenesCollection und EndingsCollection auf Konsistenz und Regeln.
// ============================================================================

import {
  ScenesCollection,
  EndingsCollection,
  Scene,
  Choice,
  Effect,
  Condition,
  EffectTarget
} from '../types';

// ============================================================================
// Types
// ============================================================================

export type ValidationError = {
  code: string;
  message: string;
  sceneId?: string;
  choiceId?: string;
};

export type ValidationResult = {
  ok: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
};

// ============================================================================
// Whitelists
// ============================================================================

const ALLOWED_TARGETS: Set<string> = new Set([
  // Legacy Stats
  'mut', 'wissen', 'empathie',
  // Tickets
  'tickets_truth', 'tickets_escape', 'tickets_guilt', 'tickets_love',
  // Pressure
  'conductor_attention', 'memory_drift',
  // Relations
  'rel_comp7', 'rel_boy', 'rel_sleepless',
  // Items
  'has_recorder', 'has_tag19', 'photo_anomaly',
  // Meta
  'chapter_index', 'station_count'
]);

// ============================================================================
// Validator Implementation
// ============================================================================

export function validateScenes(
  scenes: ScenesCollection,
  endings: Record<string, unknown> = {} // Using generic record for endings availability check
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  const sceneIds = new Set(Object.keys(scenes));
  const endingIds = new Set(Object.keys(endings));
  const chapterScenes: Record<number, string[]> = {};
  const stationEndCounts: Record<number, number> = {};
  const controlSceneCounts: Record<number, number> = {};

  // 1. Iterate over all scenes
  for (const sceneId of sceneIds) {
    const scene = scenes[sceneId];

    // Track Chapter Info
    const chapter = scene.chapter ?? 0;
    if (!chapterScenes[chapter]) {
      chapterScenes[chapter] = [];
      stationEndCounts[chapter] = 0;
      controlSceneCounts[chapter] = 0;
    }
    chapterScenes[chapter].push(sceneId);

    if (scene.tags?.includes('station_end')) {
      stationEndCounts[chapter]++;
    }
    if (scene.tags?.includes('control')) {
      controlSceneCounts[chapter]++;
    }

    // Rule 1: Mandatory Fields
    if (!scene.id) errors.push({ code: 'MISSING_ID', message: `Scene ${sceneId} is missing 'id'.`, sceneId });
    if (!scene.narrative && !scene.beschreibung) {
      // Allow if it has description (legacy) or narrative
      errors.push({ code: 'MISSING_TEXT', message: `Scene ${sceneId} is missing 'narrative'.`, sceneId });
    }
    if (!scene.choices || scene.choices.length === 0) {
       // Station end scenes might auto-transition but usually have a "Continue" choice.
       // Assuming all scenes need choices for now.
       errors.push({ code: 'NO_CHOICES', message: `Scene ${sceneId} has no choices.`, sceneId });
    }

    // Check Choices
    if (scene.choices) {
      scene.choices.forEach((choice, index) => {
        const choiceId = choice.id || `choice_${index}`;

        // Rule 2: Choice Requirements
        // Must have effects (>=1) AND (next OR ending)
        // Note: Task says "Every Choice has effects (>=1)".
        if (!choice.effects || choice.effects.length === 0) {
          // Warning if strict, Error per requirements "Jede Choice hat effects (>=1)"
          // Wait, usually simple navigation might not have effects, but "HARTE REGELN" says "Jede Choice hat effects".
          // Let's mark as Error.
          errors.push({ code: 'CHOICE_NO_EFFECTS', message: `Choice ${choiceId} in ${sceneId} has no effects.`, sceneId, choiceId });
        }

        if (!choice.next && !choice.ending) {
           errors.push({ code: 'CHOICE_DEAD_END', message: `Choice ${choiceId} in ${sceneId} has neither 'next' nor 'ending'.`, sceneId, choiceId });
        }

        // Rule 3: next refers to existing scene
        if (choice.next) {
          if (!sceneIds.has(choice.next)) {
            errors.push({ code: 'INVALID_NEXT', message: `Choice ${choiceId} refers to unknown scene '${choice.next}'.`, sceneId, choiceId });
          }
        }

        // Rule 4: ending refers to existing ending
        if (choice.ending) {
          if (endingIds.size > 0 && !endingIds.has(choice.ending)) {
             // Only error if endings are provided
             errors.push({ code: 'INVALID_ENDING', message: `Choice ${choiceId} refers to unknown ending '${choice.ending}'.`, sceneId, choiceId });
          } else if (endingIds.size === 0) {
             warnings.push({ code: 'ENDING_UNCHECKED', message: `Choice ${choiceId} refers to ending '${choice.ending}' but no endings provided for validation.`, sceneId, choiceId });
          }
        }

        // Rule 5: Unknown State Keys in Effects
        if (choice.effects) {
          choice.effects.forEach(eff => {
            if (!ALLOWED_TARGETS.has(eff.target)) {
              errors.push({ code: 'INVALID_EFFECT_TARGET', message: `Effect target '${eff.target}' is not in allowed list.`, sceneId, choiceId });
            }
          });
        }

        // Rule 5: Unknown State Keys in Conditions
        if (choice.condition && typeof choice.condition !== 'function') {
           validateCondition(choice.condition, sceneId, choiceId, errors);
        }
      });
    }

    // Check Scene Entry/Exit Effects
    if (scene.entry_effects) {
      scene.entry_effects.forEach(eff => {
         if (!ALLOWED_TARGETS.has(eff.target)) {
            errors.push({ code: 'INVALID_ENTRY_EFFECT', message: `Entry effect target '${eff.target}' is not in allowed list.`, sceneId });
         }
      });
    }
    if (scene.exit_effects) {
      scene.exit_effects.forEach(eff => {
         if (!ALLOWED_TARGETS.has(eff.target)) {
            errors.push({ code: 'INVALID_EXIT_EFFECT', message: `Exit effect target '${eff.target}' is not in allowed list.`, sceneId });
         }
      });
    }
  }

  // Rule 6: station_end scenes per chapter (Warning ok)
  // Assuming chapters are numbered 1..X. "Kapitel" usually implies meaningful content chapters.
  // We can just iterate what we found.
  for (const chapterNumStr in chapterScenes) {
    const ch = parseInt(chapterNumStr, 10);
    // Maybe exclude chapter 0 or special chapters if any.
    if (stationEndCounts[ch] === 0) {
      warnings.push({ code: 'MISSING_STATION_END', message: `Chapter ${ch} has no scene with tag 'station_end'.` });
    }
  }

  // Rule 7: Chapters 2/3/5 have `control` scene (Fehler)
  const requiredControlChapters = [2, 3, 5];
  for (const ch of requiredControlChapters) {
    if (chapterScenes[ch] && controlSceneCounts[ch] === 0) {
      // Only error if the chapter actually exists in the provided scenes.
      // If we only validate a subset (e.g. c1..c4), we shouldn't error on c5 if it's not loaded?
      // "Content-Smoke-Tests" loads c1-c4.
      // Task says: "Nachtzug19-Content (c1–c4) als Smoke-Test".
      // But Validator should implement the rule.
      // If the chapter is present in the map, it means we have scenes for it.
      errors.push({ code: 'MISSING_CONTROL_SCENE', message: `Chapter ${ch} must have a 'control' scene.` });
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings
  };
}

// Helper to validate conditions recursively
function validateCondition(
  condition: Condition,
  sceneId: string,
  choiceId: string,
  errors: ValidationError[]
) {
  if (condition.type === 'compare' || condition.type === 'bool') {
    if (!ALLOWED_TARGETS.has(condition.target)) {
      errors.push({ code: 'INVALID_CONDITION_TARGET', message: `Condition target '${condition.target}' is not in allowed list.`, sceneId, choiceId });
    }
  } else if (condition.type === 'and' || condition.type === 'or') {
    condition.conditions.forEach(c => validateCondition(c, sceneId, choiceId, errors));
  }
}
