import { describe, it, expect, beforeEach } from 'vitest';
import { applyEffects, evaluateCondition, transitionToNextScene } from './gameEngine';
import { createInitialState, GameState, Scene, Choice, Effect } from '../types/index';

describe('Game Engine Core', () => {
  let state: GameState;

  beforeEach(() => {
    state = createInitialState('start_scene');
  });

  describe('applyEffects', () => {
    it('should increment a value', () => {
      // Setup: tickets_truth starts at 0
      const effects: Effect[] = [{ type: 'inc', target: 'tickets_truth', value: 2 }];
      applyEffects(state, effects);
      expect(state.tickets.tickets_truth).toBe(2);
    });

    it('should decrement a value', () => {
        // Setup
        state.tickets.tickets_truth = 3;
        const effects: Effect[] = [{ type: 'dec', target: 'tickets_truth', value: 1 }];
        applyEffects(state, effects);
        expect(state.tickets.tickets_truth).toBe(2);
    });

    it('should set a value', () => {
        const effects: Effect[] = [{ type: 'set', target: 'chapter_index', value: 5 }];
        applyEffects(state, effects);
        expect(state.chapter_index).toBe(5);
    });

    it('should clamp values (max)', () => {
        // tickets_truth max is 5
        const effects: Effect[] = [{ type: 'inc', target: 'tickets_truth', value: 10 }];
        applyEffects(state, effects);
        expect(state.tickets.tickets_truth).toBe(5);
    });

    it('should clamp values (min)', () => {
        // tickets_truth min is 0
        state.tickets.tickets_truth = 1;
        const effects: Effect[] = [{ type: 'dec', target: 'tickets_truth', value: 5 }];
        applyEffects(state, effects);
        expect(state.tickets.tickets_truth).toBe(0);
    });

    it('should handle custom clamp range', () => {
        // Assuming applyEffects supports custom clamp ranges if defined in Effect
        // The implementation uses internal autoClamp, but also checks effect.clamp_min/max
        const effects: Effect[] = [{ type: 'clamp', target: 'tickets_truth', value: 0, clamp_min: 2, clamp_max: 4 }];
        state.tickets.tickets_truth = 5; // Start high
        applyEffects(state, effects);
        // It takes currentValue, then applies clamp if type is 'clamp'?
        // Looking at code:
        // case 'clamp':
        // newValue = currentValue;
        // if (effect.clamp_min ...) newValue = ...
        // So it clamps the current value.
        expect(state.tickets.tickets_truth).toBe(4);
    });
  });

  describe('evaluateCondition', () => {
    it('should evaluate == correctly', () => {
        state.tickets.tickets_truth = 2;
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '==', value: 2 })).toBe(true);
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '==', value: 3 })).toBe(false);
    });

    it('should evaluate != correctly', () => {
        state.tickets.tickets_truth = 2;
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '!=', value: 3 })).toBe(true);
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '!=', value: 2 })).toBe(false);
    });

    it('should evaluate >= correctly', () => {
        state.tickets.tickets_truth = 2;
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '>=', value: 1 })).toBe(true);
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '>=', value: 2 })).toBe(true);
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '>=', value: 3 })).toBe(false);
    });

    it('should evaluate <= correctly', () => {
        state.tickets.tickets_truth = 2;
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '<=', value: 3 })).toBe(true);
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '<=', value: 2 })).toBe(true);
        expect(evaluateCondition(state, { type: 'compare', target: 'tickets_truth', operator: '<=', value: 1 })).toBe(false);
    });

    it('should evaluate AND conditions', () => {
        state.tickets.tickets_truth = 2;
        state.tickets.tickets_escape = 3;
        const cond = {
            type: 'and' as const,
            conditions: [
                { type: 'compare' as const, target: 'tickets_truth', operator: '==' as const, value: 2 },
                { type: 'compare' as const, target: 'tickets_escape', operator: '>' as const, value: 1 }
            ]
        };
        expect(evaluateCondition(state, cond)).toBe(true);

        // Make one false
        cond.conditions[1].value = 5;
        expect(evaluateCondition(state, cond)).toBe(false);
    });

    it('should evaluate OR conditions', () => {
        state.tickets.tickets_truth = 2;
        const cond = {
            type: 'or' as const,
            conditions: [
                { type: 'compare' as const, target: 'tickets_truth', operator: '==' as const, value: 5 }, // False
                { type: 'compare' as const, target: 'tickets_truth', operator: '==' as const, value: 2 }  // True
            ]
        };
        expect(evaluateCondition(state, cond)).toBe(true);

        // Make both false
        cond.conditions[1].value = 1;
        expect(evaluateCondition(state, cond)).toBe(false);
    });
  });

  describe('transitionToNextScene', () => {
    it('should transition to next scene and update history', () => {
        const currentScene: Scene = { id: 's1', choices: [], narrative: 'Start' };
        const nextScene: Scene = { id: 's2', choices: [], narrative: 'End' };
        const choice: Choice = { next: 's2', effects: [] };
        const scenes = { 's1': currentScene, 's2': nextScene };

        // Ensure state matches current scene
        state.current_scene_id = 's1';

        transitionToNextScene(state, currentScene, choice, scenes);

        expect(state.current_scene_id).toBe('s2');
        expect(state.history).toHaveLength(1);
        expect(state.history[0].scene_id).toBe('s1');
        expect(state.visited_scene_ids).toContain('s2');
    });

    it('should handle ending transition', () => {
        const currentScene: Scene = { id: 's1', choices: [], narrative: 'Start' };
        const choice: Choice = { ending: 'end_A', effects: [] };
        const scenes = { 's1': currentScene };

        transitionToNextScene(state, currentScene, choice, scenes);

        expect(state.isGameOver).toBe(true);
        expect(state.endingId).toBe('end_A');
    });

    it('should apply station_end drift rule', () => {
        // Rule: If scene has tag 'station_end', memory_drift += 1, station_count += 1
        const currentScene: Scene = {
            id: 's_end',
            choices: [],
            narrative: 'Station',
            tags: ['station_end']
        };
        const nextScene: Scene = { id: 's_next', choices: [], narrative: 'Next' };
        const choice: Choice = { next: 's_next', effects: [] };
        const scenes = { 's_end': currentScene, 's_next': nextScene };

        state.pressure.memory_drift = 0;
        state.station_count = 0;

        transitionToNextScene(state, currentScene, choice, scenes);

        expect(state.pressure.memory_drift).toBe(1);
        expect(state.station_count).toBe(1);
    });
    
    it('should apply choice effects before transition', () => {
        const currentScene: Scene = { id: 's1', choices: [], narrative: 'Start' };
        const nextScene: Scene = { id: 's2', choices: [], narrative: 'Next' };
        const choice: Choice = {
            next: 's2',
            effects: [{ type: 'inc', target: 'tickets_truth', value: 1 }]
        };
        const scenes = { 's1': currentScene, 's2': nextScene };

        state.tickets.tickets_truth = 0;
        transitionToNextScene(state, currentScene, choice, scenes);

        expect(state.tickets.tickets_truth).toBe(1);
    });
  });
});
