import { GAME_INITIATED, GAME_SETUP } from '../gameStatus'
import mutations from '../mutations'
import * as types from '../types'

const loadSavedGameMutation = mutations[types.LOAD_SAVED_GAME];
const clearGameMutation = mutations[types.CLEAR_SAVED_GAME];
const startGameMutation = mutations[types.START_GAME];

describe('reset game mutation', () => {
  it(`should not change state from ${GAME_SETUP}`, () => {
    localStorage = { setItem: () => {} }
    let state = { status:GAME_SETUP};

    clearGameMutation(state);

    expect(state.status).toBe(GAME_SETUP);
  })
});