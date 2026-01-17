import { describe, it, expect, beforeAll } from 'vitest';
import { loadNachtzug19Story, StoryBundle } from './loadStory';
import { createInitialState } from '../types';
import { getAvailableChoices, transitionToNextScene } from './gameEngine';

let bundle: StoryBundle;

beforeAll(async () => {
  bundle = await loadNachtzug19Story();
});

describe('NACHTZUG 19 engine integration', () => {
  it('loads the story and resolves the start scene', () => {
    expect(bundle.startSceneId).toBeTruthy();
    expect(bundle.scenes[bundle.startSceneId]).toBeTruthy();
  });

  it('applies choice effects and moves to the next scene', () => {
    const state = createInitialState(bundle.startSceneId);
    const scene = bundle.scenes[state.current_scene_id];
    const choice = scene.choices.find((entry) => entry.id === 'try_leave');

    if (!choice || !choice.next) {
      throw new Error('Expected try_leave choice with next scene');
    }

    transitionToNextScene(state, scene, choice, bundle.scenes);

    expect(state.current_scene_id).toBe(choice.next);
    expect(state.tickets.tickets_guilt).toBe(1);
    expect(state.pressure.conductor_attention).toBe(1);
  });

  it('hides choices when conditions are not met', () => {
    const state = createInitialState(bundle.startSceneId);
    const scene = bundle.scenes['c1_interlude_02_silence'];
    const hiddenChoice = scene.choices.find((entry) => entry.id === 'stay_quiet');
    const available = getAvailableChoices(state, scene);

    expect(hiddenChoice).toBeTruthy();
    if (!hiddenChoice) return;
    expect(available).not.toContain(hiddenChoice);
  });
});
