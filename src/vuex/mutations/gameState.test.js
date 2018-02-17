import { GAME_INITIATED, GAME_SETUP } from '../gameStatus'
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
  it(`should not change state from ${GAME_SETUP}`, () => {
    let state = { status:GAME_SETUP};

    clearGameMutation(state);

    expect(state.status).toBe(GAME_SETUP);
  })
});