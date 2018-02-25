import { GAME_INITIATED, GAME_SETUP, COMBAT_INITIATED, COMBAT_INPROGRESS, AUTOMA_MOVE } from '../gameStatus'
import mutations from '../mutations'
import * as types from '../types'

const clearGameMutation = mutations[types.CLEAR_SAVED_GAME];

describe('reset game mutation', () => {
  it(`should not change state from ${GAME_SETUP}`, () => {
    localStorage = { setItem: () => {} }
    let state = { status:GAME_SETUP};

    clearGameMutation(state);

    expect(state.status).toBe(GAME_SETUP);
  })
});