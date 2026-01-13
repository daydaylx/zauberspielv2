import { describe, it, expect, beforeEach } from 'vitest';
import { validateScenes } from './validateContent';
import { Scene } from '../types';

describe('validateContent', () => {
  it('should pass valid scenes', () => {
    const scenes: Record<string, Scene> = {
      'start': {
        id: 'start',
        kapitel: 1,
        titel: 'Start',
        beschreibung: 'Start description',
        choices: [
          {
            id: 'c1',
            text: 'Go',
            effects: [{ type: 'inc', target: 'tickets_truth', value: 1 }],
            next: 'next_scene'
          }
        ]
      },
      'next_scene': {
        id: 'next_scene',
        kapitel: 1,
        titel: 'Next',
        beschreibung: 'Next description',
        choices: []
      }
    };

    const result = validateScenes(scenes);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should detect missing next scene', () => {
    const scenes: Record<string, Scene> = {
      'start': {
        id: 'start',
        kapitel: 1,
        titel: 'Start',
        beschreibung: 'Start',
        choices: [
          {
            id: 'c1',
            text: 'Go',
            effects: [],
            next: 'missing_scene'
          }
        ]
      }
    };

    const result = validateScenes(scenes);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Choice in 'start' points to missing scene 'missing_scene'.");
  });

  it('should detect missing next property', () => {
    const scenes: Record<string, Scene> = {
      'start': {
        id: 'start',
        kapitel: 1,
        titel: 'Start',
        beschreibung: 'Start',
        choices: [
          {
            id: 'c1',
            text: 'Go',
            effects: [],
            // @ts-ignore
            next: ''
          }
        ]
      }
    };

    const result = validateScenes(scenes);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Choice in 'start' has no 'next' target.");
  });

  it('should warn about missing control scene in chapter 2', () => {
      const scenes: Record<string, Scene> = {
          'c2_start': {
              id: 'c2_start',
              kapitel: 2,
              titel: 'C2',
              beschreibung: '...',
              choices: []
          }
      };

      const result = validateScenes(scenes);
      expect(result.warnings).toContain("Chapter 2 is missing a 'control' scene.");
  });
});
