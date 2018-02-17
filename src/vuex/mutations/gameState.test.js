import { GAME_INITIATED } from '../gameStatus'
import mutations from '../mutations'
import * as types from '../types'

const loadSavedGameMutation = mutations[types.LOAD_SAVED_GAME];
const clearGameMutation = mutations[types.CLEAR_SAVED_GAME];
const startGameMutation = mutations[types.START_GAME];

describe('load saved game mutation', () => {
  it(`should set the state to ${GAME_INITIATED}`, () => {
    let state = {};

    loadSavedGameMutation(state);

    expect(state.status).toBe(GAME_INITIATED);
  })
});

describe('reset game mutation', () => {
  it(`should set the state to ${GAME_INITIATED}`, () => {
    let state = {};

    clearGameMutation(state);

    expect(state.status).toBe(GAME_INITIATED);
  })
});

describe('game start mutation', () => {
  it(`should set the state to ${GAME_INITIATED}`, () => {
    let state = {};

    startGameMutation(state);

    expect(state.status).toBe(GAME_INITIATED);
  })
});