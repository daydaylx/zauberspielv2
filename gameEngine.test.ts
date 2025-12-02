import { describe, it, expect, beforeEach } from 'vitest'
import { GameEngine } from './src/gameEngine'
import { scenes, initialStats } from './src/storyData'

describe('GameEngine Core', () => {
  let engine: GameEngine;

  beforeEach(() => {
    engine = new GameEngine();
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

  it('should handle game over', () => {
    const endingChoice = {
        text: "Test Ending",
        beschreibungFolge: "Test",
        naechsteSzeneId: "E1_RETTUNG_VERLUST"
    };

    engine.makeChoice(endingChoice);

    expect(engine.getState().isGameOver).toBe(true);
    expect(engine.getState().endingId).toBe("E1_RETTUNG_VERLUST");
  });
});

describe('New Story Features', () => {
  let engine: GameEngine;

  beforeEach(() => {
    engine = new GameEngine();
    engine.startGame();
  });

  it('should allow finding the secret sketch in the Scriptorium', () => {
    // Manuell in die neue Szene springen
    engine.getState().currentSceneId = 'K1_skriptorium_extra';
    
    const scene = scenes['K1_skriptorium_extra'];
    const searchChoice = scene.choices.find(c => c.text.includes("Unter Liras Tisch"));
    
    if (!searchChoice) throw new Error("Choice 'Unter Liras Tisch' not found");

    engine.makeChoice(searchChoice);

    expect(engine.getState().inventory).toContain("Skizze des Schachts");
    expect(engine.getState().currentSceneId).toBe("K1_flur_echo");
  });

  it('should allow the loyalty oath (Schwur) in K2', () => {
    // Manuell kurz vor das Finale springen
    engine.getState().currentSceneId = 'K2_geister_nachklang';
    
    const scene = scenes['K2_geister_nachklang'];
    const oathChoice = scene.choices.find(c => c.text.includes("Schwur leisten"));
    
    if (!oathChoice) throw new Error("Choice 'Schwur leisten' not found");

    engine.makeChoice(oathChoice);

    expect(engine.getState().flags.loyalty_max).toBe(true);
    expect(engine.getState().stats.empathie).toBeGreaterThanOrEqual(2); // +2 Empathie
  });

  it('should reveal the secret weakness when freeing the ghost', () => {
    // Manuell zum Geist springen
    engine.getState().currentSceneId = 'K2_geisterraum';
    
    const scene = scenes['K2_geisterraum'];
    const freeChoice = scene.choices.find(c => c.text.includes("Ihn lösen"));
    
    if (!freeChoice) throw new Error("Choice 'Ihn lösen' not found");

    engine.makeChoice(freeChoice);

    expect(engine.getState().flags.geist_befreit).toBe(true);
    expect(engine.getState().flags.knows_secret_weakness).toBe(true); // Der neue Hinweis
    expect(engine.getState().currentSceneId).toBe("K2_geister_nachklang");
  });
});
