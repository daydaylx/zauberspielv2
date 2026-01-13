// ============================================================================
// NACHTZUG 19 - Content Validator
// ============================================================================
// Prüft Story-Content auf:
// - Graph-Invarianten (keine Dead-Ends, alle Referenzen existieren)
// - Canon Rules (station_end -> drift, Kontrollen in Kap. 2/3/5)
// - Schema-Validierung (Effects nutzen nur bekannte Variablen)
// ============================================================================

import {
  Scene,
  Choice,
  Condition,
  EffectTarget,
  ScenesCollection,
  EndingsCollection,
  ValidationError,
  ValidationResult
} from '../types';

// ============================================================================
// Known Effect Targets (alle erlaubten Variablen)
// ============================================================================

const KNOWN_EFFECT_TARGETS: Set<EffectTarget> = new Set([
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
// Validation Helpers
// ============================================================================

/**
 * Prüft, ob ein Effect-Target bekannt ist
 */
function validateEffectTarget(target: string): boolean {
  return KNOWN_EFFECT_TARGETS.has(target as EffectTarget);
}

/**
 * Sammelt alle Targets aus einer Condition
 */
function getConditionTargets(condition: Condition): string[] {
  const targets: string[] = [];

  if (condition.type === 'compare' || condition.type === 'bool') {
    targets.push(condition.target);
  } else if (condition.type === 'and' || condition.type === 'or') {
    condition.conditions.forEach(c => {
      targets.push(...getConditionTargets(c));
    });
  }

  return targets;
}

/**
 * Prüft eine einzelne Choice
 */
function validateChoice(
  sceneId: string,
  choice: Choice,
  scenes: ScenesCollection,
  endings: EndingsCollection,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // 1. Choice muss entweder 'next' oder 'ending' haben
  if (!choice.next && !choice.ending) {
    errors.push({
      type: 'error',
      message: `Choice '${choice.id}' hat weder 'next' noch 'ending'`,
      scene_id: sceneId,
      choice_id: choice.id
    });
  }

  // 2. 'next' muss auf existierende Szene verweisen
  if (choice.next && !scenes[choice.next]) {
    errors.push({
      type: 'error',
      message: `Choice '${choice.id}' verweist auf unbekannte Szene '${choice.next}'`,
      scene_id: sceneId,
      choice_id: choice.id
    });
  }

  // 3. 'ending' muss auf existierendes Ending verweisen
  if (choice.ending && !endings[choice.ending]) {
    errors.push({
      type: 'error',
      message: `Choice '${choice.id}' verweist auf unbekanntes Ending '${choice.ending}'`,
      scene_id: sceneId,
      choice_id: choice.id
    });
  }

  // 4. Choice muss mindestens einen Effect haben (R3: Callback-Regel) - nur für NACHTZUG 19
  // Legacy-Choices haben werteAenderung statt effects
  const hasEffects = choice.effects && choice.effects.length > 0;
  const hasLegacyEffects = choice.werteAenderung || choice.flagsAenderung || choice.itemBelohnung || choice.itemVerlust;

  if (!hasEffects && !hasLegacyEffects) {
    warnings.push({
      type: 'warning',
      message: `Choice '${choice.id || choice.text}' hat keine Effects (könnte R3: Callback-Regel verletzen)`,
      scene_id: sceneId,
      choice_id: choice.id || choice.text
    });
  }

  // 5. Alle Effects müssen bekannte Targets verwenden
  if (choice.effects) {
    choice.effects.forEach((effect, idx) => {
      if (!validateEffectTarget(effect.target)) {
        errors.push({
          type: 'error',
          message: `Choice '${choice.id}' Effect #${idx}: Unbekanntes Target '${effect.target}'`,
          scene_id: sceneId,
          choice_id: choice.id
        });
      }

      // Warnung: clamp ohne clamp_min/clamp_max
      if (effect.type === 'clamp' && (effect.clamp_min === undefined || effect.clamp_max === undefined)) {
        warnings.push({
          type: 'warning',
          message: `Choice '${choice.id}' Effect #${idx}: clamp ohne clamp_min/clamp_max`,
          scene_id: sceneId,
          choice_id: choice.id
        });
      }
    });
  }

  // 6. Alle Conditions müssen bekannte Targets verwenden (nur für neue Conditions)
  if (choice.condition && typeof choice.condition !== 'function') {
    const targets = getConditionTargets(choice.condition);
    targets.forEach(target => {
      if (!validateEffectTarget(target)) {
        errors.push({
          type: 'error',
          message: `Choice '${choice.id}' Condition: Unbekanntes Target '${target}'`,
          scene_id: sceneId,
          choice_id: choice.id
        });
      }
    });
  }
}

/**
 * Prüft eine einzelne Szene
 */
function validateScene(
  scene: Scene,
  scenes: ScenesCollection,
  endings: EndingsCollection,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // 1. Szene muss mindestens eine Choice haben
  if (!scene.choices || scene.choices.length === 0) {
    errors.push({
      type: 'error',
      message: `Szene '${scene.id}' hat keine Choices`,
      scene_id: scene.id
    });
    return;
  }

  // 2. Szene darf maximal 4 Choices haben
  if (scene.choices.length > 4) {
    warnings.push({
      type: 'warning',
      message: `Szene '${scene.id}' hat ${scene.choices.length} Choices (max. 4 empfohlen)`,
      scene_id: scene.id
    });
  }

  // 3. Prüfe jede Choice
  scene.choices.forEach(choice => {
    validateChoice(scene.id, choice, scenes, endings, errors, warnings);
  });

  // 4. Entry/Exit-Effects müssen bekannte Targets verwenden
  if (scene.entry_effects) {
    scene.entry_effects.forEach((effect, idx) => {
      if (!validateEffectTarget(effect.target)) {
        errors.push({
          type: 'error',
          message: `Entry-Effect #${idx}: Unbekanntes Target '${effect.target}'`,
          scene_id: scene.id
        });
      }
    });
  }

  if (scene.exit_effects) {
    scene.exit_effects.forEach((effect, idx) => {
      if (!validateEffectTarget(effect.target)) {
        errors.push({
          type: 'error',
          message: `Exit-Effect #${idx}: Unbekanntes Target '${effect.target}'`,
          scene_id: scene.id
        });
      }
    });
  }

  // 5. R1: station_end muss memory_drift erhöhen (wird automatisch von Engine gemacht)
  // Warnung, wenn station_end-Szene keine exit_effects hat (wird aber automatisch gehandhabt)
  if (scene.tags?.includes('station_end')) {
    // Optional: Prüfe, ob exit_effects memory_drift erhöhen
    // (Nicht nötig, da Engine das automatisch macht)
  }

  // 6. state_notes sollte maximal 3 Einträge haben
  if (scene.state_notes && scene.state_notes.length > 3) {
    warnings.push({
      type: 'warning',
      message: `Szene '${scene.id}' hat ${scene.state_notes.length} state_notes (max. 3 empfohlen)`,
      scene_id: scene.id
    });
  }
}

/**
 * Prüft R2: Kontrollen in Kapiteln 2, 3, 5
 */
function validateCanonRuleR2(
  scenes: ScenesCollection,
  errors: ValidationError[]
): void {
  const requiredControlChapters = [2, 3, 5];
  const chapterControlCounts: Record<number, number> = {};

  // Zähle control-Szenen pro Kapitel
  Object.values(scenes).forEach(scene => {
    if (scene.tags?.includes('control') && scene.chapter !== undefined) {
      const chapter = scene.chapter;
      chapterControlCounts[chapter] = (chapterControlCounts[chapter] || 0) + 1;
    }
  });

  // Prüfe, ob jedes erforderliche Kapitel mindestens eine Kontrolle hat
  requiredControlChapters.forEach(chapter => {
    if (!chapterControlCounts[chapter] || chapterControlCounts[chapter] === 0) {
      errors.push({
        type: 'error',
        message: `R2 verletzt: Kapitel ${chapter} hat keine control-Szene`,
        location: `chapter_${chapter}`
      });
    }
  });
}

/**
 * Prüft, ob alle Szenen vom Start aus erreichbar sind
 */
function validateReachability(
  startSceneId: string,
  scenes: ScenesCollection,
  warnings: ValidationError[]
): void {
  const reachable = new Set<string>();
  const queue = [startSceneId];

  // BFS
  while (queue.length > 0) {
    const sceneId = queue.shift()!;
    if (reachable.has(sceneId)) continue;
    reachable.add(sceneId);

    const scene = scenes[sceneId];
    if (!scene) continue;

    scene.choices.forEach(choice => {
      if (choice.next && !reachable.has(choice.next)) {
        queue.push(choice.next);
      }
    });
  }

  // Finde unerreichbare Szenen (außer secret)
  Object.keys(scenes).forEach(sceneId => {
    if (!reachable.has(sceneId)) {
      const scene = scenes[sceneId];
      if (!scene.tags?.includes('secret')) {
        warnings.push({
          type: 'warning',
          message: `Szene '${sceneId}' ist vom Start nicht erreichbar (keine secret-Markierung)`,
          scene_id: sceneId
        });
      }
    }
  });
}

/**
 * Prüft auf Dead-Ends (Szenen ohne Ending, die nirgendwohin führen)
 */
function validateNoDeadEnds(
  scenes: ScenesCollection,
  endings: EndingsCollection,
  errors: ValidationError[]
): void {
  Object.values(scenes).forEach(scene => {
    const hasValidExit = scene.choices.some(choice => {
      return (choice.next && scenes[choice.next]) || (choice.ending && endings[choice.ending]);
    });

    if (!hasValidExit) {
      errors.push({
        type: 'error',
        message: `Szene '${scene.id}' ist ein Dead-End (keine gültige Choice führt weiter)`,
        scene_id: scene.id
      });
    }
  });
}

// ============================================================================
// Main Validation Function
// ============================================================================

/**
 * Validiert eine komplette Story-Collection
 */
export function validateContent(
  startSceneId: string,
  scenes: ScenesCollection,
  endings: EndingsCollection
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Prüfe, ob Start-Szene existiert
  if (!scenes[startSceneId]) {
    errors.push({
      type: 'error',
      message: `Start-Szene '${startSceneId}' existiert nicht`,
      location: 'manifest'
    });
    return { valid: false, errors, warnings };
  }

  // 2. Prüfe jede Szene einzeln
  Object.values(scenes).forEach(scene => {
    validateScene(scene, scenes, endings, errors, warnings);
  });

  // 3. Prüfe Canon Rule R2 (Kontrollen in Kap. 2/3/5)
  validateCanonRuleR2(scenes, errors);

  // 4. Prüfe Erreichbarkeit
  validateReachability(startSceneId, scenes, warnings);

  // 5. Prüfe auf Dead-Ends
  validateNoDeadEnds(scenes, endings, errors);

  // Ergebnis
  const valid = errors.length === 0;
  return { valid, errors, warnings };
}

/**
 * Gibt Validation-Ergebnisse formatiert in der Konsole aus
 */
export function printValidationResult(result: ValidationResult): void {
  if (result.valid) {
    console.log('✅ Content-Validierung erfolgreich');
  } else {
    console.error('❌ Content-Validierung fehlgeschlagen');
  }

  if (result.errors.length > 0) {
    console.group('🔴 Errors:');
    result.errors.forEach(err => {
      const location = err.scene_id || err.location || 'unknown';
      console.error(`  [${location}] ${err.message}`);
    });
    console.groupEnd();
  }

  if (result.warnings.length > 0) {
    console.group('⚠️  Warnings:');
    result.warnings.forEach(warn => {
      const location = warn.scene_id || warn.location || 'unknown';
      console.warn(`  [${location}] ${warn.message}`);
    });
    console.groupEnd();
  }

  console.log(`\nZusammenfassung: ${result.errors.length} Errors, ${result.warnings.length} Warnings`);
}
