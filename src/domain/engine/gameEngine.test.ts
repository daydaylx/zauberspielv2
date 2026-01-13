import { describe, it, expect, beforeEach } from 'vitest'
import { GameEngine } from './gameEngine'
import { scenes, initialStats } from '../../content/legacy/storyData'
import { Scene, Effect, Condition } from '../types';

describe('GameEngine Legacy Core', () => {
  let engine: GameEngine;

  beforeEach(() => {
    engine = new GameEngine();
    // Default mode is legacy
    engine.startGame();
  });

  it('should initialize with start scene', () => {
    expect(engine.getState().currentSceneId).toBe('P0_Intro');
    expect(engine.getState().stats).toEqual(initialStats);
  });

  it('should update stats when making a choice', () => {
    const startScene = scenes['P0_Intro'];
    const choice = startScene.choices[0]; // "Amulett betrachten" -> Wissen +1

    engine.makeChoice(choice);

    expect(engine.getState().stats.wissen).toBe(1);
    expect(engine.getState().stats.empathie).toBe(0);
  });

  it('should transition to next scene', () => {
    const startScene = scenes['P0_Intro'];
    const choice = startScene.choices[0]; // -> P1_ankunft

    engine.makeChoice(choice);

    expect(engine.getState().currentSceneId).toBe('P1_ankunft');
    expect(engine.getState().history).toContain('P0_Intro');
  });
});

describe('GameEngine Nachtzug 19 Mechanics', () => {
    let engine: GameEngine;
    
    // Mock scenes for testing new mechanics
    const mockScenes: Record<string, Scene> = {
        'start': {
            id: 'start',
            kapitel: 1,
            titel: 'Start',
            beschreibung: 'Test start',
            choices: [
                {
                    id: 'c1',
                    text: 'Inc Truth',
                    effects: [{ type: 'inc', target: 'tickets_truth', value: 1 }],
                    next: 's2'
                },
                {
                    id: 'c2',
                    text: 'Set Item',
                    effects: [{ type: 'set', target: 'has_tag19', value: true }],
                    next: 's2'
                }
            ]
        },
        's2': {
            id: 's2',
            kapitel: 1,
            titel: 'Scene 2',
            beschreibung: 'Desc',
            tags: ['station_end'],
            choices: [
                {
                    id: 'c3',
                    text: 'Condition Check',
                    condition: { type: 'bool', target: 'has_tag19', value: true },
                    effects: [],
                    next: 's3'
                }
            ]
        },
        's3': {
             id: 's3',
             kapitel: 1,
             titel: 'Scene 3',
             beschreibung: 'Final',
             choices: []
        }
    };

    beforeEach(() => {
        engine = new GameEngine();
        engine.loadContent(mockScenes, 'start');
    });

    it('should apply effects correctly (inc/set)', () => {
        const start = mockScenes['start'];
        engine.makeChoice(start.choices[0]); // Inc Truth

        expect(engine.getState().nachtzugStats.tickets_truth).toBe(1);
        expect(engine.getState().currentSceneId).toBe('s2');
    });

    it('should auto-increment memory_drift on station_end', () => {
        const start = mockScenes['start'];
        engine.makeChoice(start.choices[0]); // Go to s2 which has station_end tag

        expect(engine.getState().currentSceneId).toBe('s2');
        expect(engine.getState().nachtzugStats.memory_drift).toBe(1);
    });
    
    it('should evaluate boolean conditions', () => {
        // First set the item
        const start = mockScenes['start'];
        engine.makeChoice(start.choices[1]); // Set has_tag19 = true

        expect(engine.getState().items.has_tag19).toBe(true);

        // Now check condition in next choice
        const s2 = mockScenes['s2'];
        const condChoice = s2.choices[0];
        const isVisible = engine.evaluateCondition(condChoice.condition, engine.getState());

        expect(isVisible).toBe(true);
    });

    it('should evaluate comparison conditions', () => {
        // Manually set state for test
        engine.getState().nachtzugStats.conductor_attention = 5;

        const cond: Condition = {
            type: 'comparison',
            target: 'conductor_attention',
            operator: 'gt',
            value: 3
        };

        expect(engine.evaluateCondition(cond, engine.getState())).toBe(true);

        const condFail: Condition = {
            type: 'comparison',
            target: 'conductor_attention',
            operator: 'lt',
            value: 2
        };

        expect(engine.evaluateCondition(condFail, engine.getState())).toBe(false);
    });
    
    it('should clamp values (test implementation pending in engine, but basic inc should work)', () => {
         // If we implement clamp in engine
         const effect: Effect = { type: 'clamp', target: 'conductor_attention', value: 6 };
         engine.getState().nachtzugStats.conductor_attention = 10;
         engine.applyEffects([effect], engine.getState());

         expect(engine.getState().nachtzugStats.conductor_attention).toBe(6);

         engine.getState().nachtzugStats.conductor_attention = -5;
         engine.applyEffects([effect], engine.getState());
         expect(engine.getState().nachtzugStats.conductor_attention).toBe(0);
    });
});
