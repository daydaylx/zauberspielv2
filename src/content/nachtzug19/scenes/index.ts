// ============================================================================
// NACHTZUG 19 - Szenen Export
// ============================================================================
// Zentraler Export aller Szenen für NACHTZUG 19
// ============================================================================

import { ScenesCollection } from '../../../domain/types';
import { chapter1Scenes } from './c1';
import { chapter2Scenes } from './c2';
import { chapter3Scenes } from './c3';

/**
 * Alle Szenen der NACHTZUG 19 Story
 */
export const nachtzug19Scenes: ScenesCollection = {
  ...chapter1Scenes,
  ...chapter2Scenes,
  ...chapter3Scenes
};
