import { GAME_INITIATED, GAME_SETUP, COMBAT_INITIATED, COMBAT_INPROGRESS, AUTOMA_MOVE, GAME_FINISHED } from '../gameStatus'
import mutations from '../mutations'
import * as types from '../types'

const clearGameMutation = mutations[types.CLEAR_SAVED_GAME];
const finishGameMutation = mutations[types.END_GAME];

describe('reset game mutation', () => {
  it(`should not change state from ${GAME_SETUP}`, () => {
    localStorage = { setItem: () => {} }
    let state = { status:GAME_SETUP};

    clearGameMutation(state);

    expect(state.status).toBe(GAME_SETUP);
  })
});

describe('finish game', () => {
  it(`should set the state to ${GAME_FINISHED}`, () => {
    let state = {status:GAME_INITIATED};

    finishGameMutation(state);

    expect(state.status).toBe(GAME_FINISHED);
  })
})