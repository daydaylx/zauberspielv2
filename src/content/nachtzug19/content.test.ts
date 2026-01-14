import { describe, it, expect } from 'vitest';
import { nachtzug19Scenes } from './scenes';
import { nachtzug19Endings } from './manifest';
import { validateScenes } from '../../domain/engine/validateContent';

describe('Nachtzug 19 Content Smoke Test', () => {
  it('should validate all scenes c1-c4 without errors', () => {
    // Merge scenes is already done in nachtzug19Scenes

    const result = validateScenes(nachtzug19Scenes, nachtzug19Endings);

    // Filter out expected warnings if any
    // Task says: "Warnung ok" (e.g. missing station_end in some chapters)
    // But we expect errors to be empty.

    if (!result.ok) {
        console.error('Validation Errors:', JSON.stringify(result.errors, null, 2));
    }

    expect(result.ok).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
