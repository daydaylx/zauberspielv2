import { GameState, Choice, Scene, Ending, Condition, Effect, ConditionOperator } from '../types';
import { scenes as legacyScenes, endings as legacyEndings, initialStats as legacyInitialStats } from '../../content/legacy/storyData';

// Placeholder for new content (will be loaded dynamically)
let nachtzugScenes: Record<string, Scene> = {};
let nachtzugEndings: Record<string, Ending> = {};
let activeManifestStart = '';

export class GameEngine {
  private state: GameState;
  private listeners: ((state: GameState) => void)[] = [];
  private readonly STORAGE_KEY = 'nachtzug19_savegame_v1';
  private useLegacy = true; // Default to legacy for now until switched

  constructor() {
    this.state = this.getInitialState();
  }

  // --- Initialization ---

  private getInitialState(): GameState {
    return {
      currentSceneId: this.useLegacy ? 'P0_Intro' : (activeManifestStart || 'start'),
      stats: { ...legacyInitialStats }, // Legacy support
      flags: {},
      inventory: [],

      // New Stats (Nachtzug 19)
      nachtzugStats: {
        tickets_truth: 0,
        tickets_escape: 0,
        tickets_guilt: 0,
        tickets_love: 0,
        conductor_attention: 0,
        memory_drift: 0,
        rel_comp7: 0,
        rel_boy: 0,
        rel_sleepless: 0,
      },
      items: {
        has_recorder: false,
        has_tag19: false,
        photo_anomaly: false,
      },

      history: [],
      isGameOver: false
    };
  }

  setMode(mode: 'legacy' | 'nachtzug19') {
    this.useLegacy = (mode === 'legacy');
    this.startGame();
  }

  // Inject scenes from loader
  loadContent(scenes: Record<string, Scene>, startId: string) {
      nachtzugScenes = scenes;
      activeManifestStart = startId;
      this.useLegacy = false;
      this.startGame();
  }

  getState(): GameState {
    return this.state;
  }

  subscribe(listener: (state: GameState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.state));
  }

  startGame() {
    this.state = this.getInitialState();
    this.notify();
  }

  // --- Logic for New Engine ---

  private evaluateSingleCondition(cond: { target: string, operator: ConditionOperator, value: any }, state: GameState): boolean {
    // Resolve value from state
    const resolveValue = (target: string): any => {
      // Check nachtzugStats
      if (target in state.nachtzugStats) return (state.nachtzugStats as any)[target];
      // Check items
      if (target in state.items) return state.items[target];
      // Check legacy stats
      if (target in state.stats) return (state.stats as any)[target];
      // Check flags
      if (state.flags[target] !== undefined) return state.flags[target];

      return 0; // Default or undefined
    };

    const targetVal = resolveValue(cond.target || '');
    const compVal = cond.value;

    switch (cond.operator) {
      case 'eq': return targetVal == compVal;
      case 'neq': return targetVal != compVal;
      case 'gt': return typeof targetVal === 'number' && targetVal > (compVal as number);
      case 'lt': return typeof targetVal === 'number' && targetVal < (compVal as number);
      case 'gte': return typeof targetVal === 'number' && targetVal >= (compVal as number);
      case 'lte': return typeof targetVal === 'number' && targetVal <= (compVal as number);
      case 'has': return !!targetVal; // Check if truthy/exists
      default: return false;
    }
  }

  evaluateCondition(condition: Condition | undefined, state: GameState): boolean {
    if (!condition) return true;

    // Legacy function support
    if (typeof condition === 'function') {
        return condition(state.stats, state.flags, state.inventory);
    }

    if (typeof condition === 'string') {
        return true;
    }

    // Narrowing types safely
    if (typeof condition === 'object') {
        if (condition.type === 'bool') {
            const val = (state.items as any)[condition.target] || (state.flags as any)[condition.target] || false;
            return val === condition.value;
        }

        if (condition.type === 'comparison') {
            return this.evaluateSingleCondition(condition, state);
        }

        if (condition.type === 'and' && condition.conditions) {
            return condition.conditions.every(c => this.evaluateCondition(c, state));
        }

        if (condition.type === 'or' && condition.conditions) {
            return condition.conditions.some(c => this.evaluateCondition(c, state));
        }
    }

    return true;
  }

  applyEffects(effects: Effect[], state: GameState) {
    effects.forEach(effect => {
      let currentVal: any;
      let targetObj: any;
      let key = effect.target;

      // Determine where the target lives
      if (key in state.nachtzugStats) {
        targetObj = state.nachtzugStats;
        currentVal = targetObj[key];
      } else if (key in state.items) {
        targetObj = state.items;
        currentVal = targetObj[key];
      } else if (key in state.stats) {
        targetObj = state.stats;
        currentVal = targetObj[key];
      } else {
         // Fallback to flags
         targetObj = state.flags;
         currentVal = targetObj[key];
      }

      switch (effect.type) {
        case 'set':
          targetObj[key] = effect.value;
          break;
        case 'inc':
          if (typeof currentVal === 'number') targetObj[key] = currentVal + (effect.value as number);
          break;
        case 'dec':
          if (typeof currentVal === 'number') targetObj[key] = currentVal - (effect.value as number);
          break;
        case 'clamp':
             if (typeof currentVal === 'number') {
                 const max = effect.value as number;
                 if (currentVal > max) targetObj[key] = max;
                 if (currentVal < 0) targetObj[key] = 0;
             }
          break;
      }
    });
  }

  // --- Main Interaction ---

  getCurrentScene(): Scene | null {
    if (this.useLegacy) {
      return legacyScenes[this.state.currentSceneId] || null;
    }
    return nachtzugScenes[this.state.currentSceneId] || null;
  }

  getEnding(): Ending | null {
    if (this.state.endingId) {
        if (this.useLegacy) return legacyEndings[this.state.endingId] || null;
        return nachtzugEndings[this.state.endingId] || null;
    }
    return null;
  }

  makeChoice(choice: Choice) {
    if (this.state.isGameOver) return;

    // --- Legacy Logic Support ---
    if (this.useLegacy) {
        if (choice.werteAenderung) {
            this.state.stats.mut += choice.werteAenderung.mut || 0;
            this.state.stats.wissen += choice.werteAenderung.wissen || 0;
            this.state.stats.empathie += choice.werteAenderung.empathie || 0;
        }
        if (choice.flagsAenderung) {
            this.state.flags = { ...this.state.flags, ...choice.flagsAenderung };
        }
        if (choice.itemBelohnung && !this.state.inventory.includes(choice.itemBelohnung)) {
            this.state.inventory.push(choice.itemBelohnung);
        }
        if (choice.itemVerlust) {
            this.state.inventory = this.state.inventory.filter(item => item !== choice.itemVerlust);
        }
    }
    
    // --- New Logic ---
    if (choice.effects) {
        this.applyEffects(choice.effects, this.state);
    }

    // History
    this.state.history.push(this.state.currentSceneId);

    // Determine Next Scene
    const nextId = choice.next || choice.naechsteSzeneId;

    if (nextId && (nextId.startsWith('ENDING_') || nextId.startsWith('E1_') || nextId === 'ending')) {
         this.state.isGameOver = true;
         this.state.endingId = nextId;
    } else if (nextId) {
        const nextScene = this.useLegacy ? legacyScenes[nextId] : nachtzugScenes[nextId];
        
        if (nextScene) {
            this.state.currentSceneId = nextId;

            // Canon Rules:
            // R1: Drift nach Station
            if (nextScene.tags?.includes('station_end')) {
                this.state.nachtzugStats.memory_drift += 1;
            }

            // Legacy Entry Effects
            if (this.useLegacy && nextScene.effekteBeimBetreten) {
                 const eff = nextScene.effekteBeimBetreten;
                 if (eff.mut) this.state.stats.mut += eff.mut;
                 if (eff.wissen) this.state.stats.wissen += eff.wissen;
                 if (eff.empathie) this.state.stats.empathie += eff.empathie;
                 if (eff.flagsAenderung) this.state.flags = { ...this.state.flags, ...eff.flagsAenderung };
            }
        } else {
            console.error(`Scene not found: ${nextId}`);
        }
    }

    this.notify();
    this.saveGame(); // Auto-save on move
  }

  // --- Persistence ---

  saveGame() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
          state: this.state,
          useLegacy: this.useLegacy,
          activeManifestStart
      }));
    } catch (e) {
      console.error("Speichern fehlgeschlagen", e);
    }
  }

  loadGame() {
    try {
      const savedStr = localStorage.getItem(this.STORAGE_KEY);
      if (savedStr) {
        const saved = JSON.parse(savedStr);
        // Validate if saved state matches structure or migrate?
        if (saved.state) {
            this.state = saved.state;
            this.useLegacy = saved.useLegacy ?? true;
            activeManifestStart = saved.activeManifestStart || '';
            this.notify();
        }
      }
    } catch (e) {
      console.error("Laden fehlgeschlagen", e);
    }
  }
}

export const gameEngine = new GameEngine();
