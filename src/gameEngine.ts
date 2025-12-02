import { GameState, Choice, Scene, Ending } from './types';
import { scenes, endings, initialStats } from './storyData';

export class GameEngine {
  private state: GameState;
  private listeners: ((state: GameState) => void)[] = [];
  private readonly STORAGE_KEY = 'nareth_savegame_v1';

  constructor() {
    // Versuche Auto-Load oder starte neu
    this.state = this.getInitialState();
  }

  private getInitialState(): GameState {
    return {
      currentSceneId: 'P0_Intro',
      stats: { ...initialStats },
      flags: {},
      inventory: [],
      history: [],
      isGameOver: false
    };
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

  saveGame() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      alert("Spielstand gespeichert.");
    } catch (e) {
      console.error("Speichern fehlgeschlagen", e);
    }
  }

  loadGame() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        this.state = JSON.parse(saved);
        this.notify();
        alert("Spielstand geladen.");
      } else {
        alert("Kein Spielstand gefunden.");
      }
    } catch (e) {
      console.error("Laden fehlgeschlagen", e);
    }
  }

  getCurrentScene(): Scene | null {
    return scenes[this.state.currentSceneId] || null;
  }

  getEnding(): Ending | null {
    if (this.state.endingId) {
      return endings[this.state.endingId] || null;
    }
    return null;
  }

  makeChoice(choice: Choice) {
    if (this.state.isGameOver) return;

    // Stats
    if (choice.werteAenderung) {
      this.state.stats.mut += choice.werteAenderung.mut || 0;
      this.state.stats.wissen += choice.werteAenderung.wissen || 0;
      this.state.stats.empathie += choice.werteAenderung.empathie || 0;
    }

    // Flags
    if (choice.flagsAenderung) {
      this.state.flags = { ...this.state.flags, ...choice.flagsAenderung };
    }

    // Items
    if (choice.itemBelohnung && !this.state.inventory.includes(choice.itemBelohnung)) {
      this.state.inventory.push(choice.itemBelohnung);
    }
    
    // Items entfernen
    if (choice.itemVerlust) {
      this.state.inventory = this.state.inventory.filter(item => item !== choice.itemVerlust);
    }

    this.state.history.push(this.state.currentSceneId);

    // Transition
    if (choice.naechsteSzeneId.startsWith('ENDING_') || choice.naechsteSzeneId.startsWith('E1_') || choice.naechsteSzeneId.startsWith('E2_') || choice.naechsteSzeneId.startsWith('E3_') || choice.naechsteSzeneId.startsWith('E4_') || choice.naechsteSzeneId.startsWith('E5_')) {
      this.state.isGameOver = true;
      this.state.endingId = choice.naechsteSzeneId;
    } else {
      if (scenes[choice.naechsteSzeneId]) {
        this.state.currentSceneId = choice.naechsteSzeneId;
        
        // Entry Effects
        const nextScene = scenes[choice.naechsteSzeneId];
        if (nextScene.effekteBeimBetreten) {
             const eff = nextScene.effekteBeimBetreten;
             if (eff.mut) this.state.stats.mut += eff.mut;
             if (eff.wissen) this.state.stats.wissen += eff.wissen;
             if (eff.empathie) this.state.stats.empathie += eff.empathie;
             if (eff.flagsAenderung) this.state.flags = { ...this.state.flags, ...eff.flagsAenderung };
             if (eff.itemBelohnung && !this.state.inventory.includes(eff.itemBelohnung)) {
                 this.state.inventory.push(eff.itemBelohnung);
             }
        }
      } else {
        console.error(`Scene not found: ${choice.naechsteSzeneId}`);
      }
    }

    this.notify();
  }
}

export const gameEngine = new GameEngine();