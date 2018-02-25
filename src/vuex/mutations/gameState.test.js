import { GAME_INITIATED, GAME_SETUP, COMBAT_INITIATED, COMBAT_INPROGRESS, AUTOMA_MOVE } from '../gameStatus'
import mutations from '../mutations'
import * as types from '../types'

const clearGameMutation = mutations[types.CLEAR_SAVED_GAME];
const cancelCombatMutation = mutations[types.CANCEL_COMBAT];

describe('reset game mutation', () => {
  it(`should not change state from ${GAME_SETUP}`, () => {
    localStorage = { setItem: () => {} }
    let state = { status:GAME_SETUP};

    clearGameMutation(state);

    expect(state.status).toBe(GAME_SETUP);
  })
});

describe('cancel combat mutation', () => {
  it(`should return to ${GAME_INITIATED} from ${COMBAT_INITIATED} when it is the persons turn`, () => {
    const state = { status: COMBAT_INITIATED, players: [ { name:'bob' }, { faction:'Nordic'} ], currentTurn:1};

    cancelCombatMutation(state);

    expect(state.status).toBe(GAME_INITIATED);
  })

  it(`should return to ${AUTOMA_MOVE} from ${COMBAT_INITIATED} when it is the automas turn`, () => {
    const state = { status: COMBAT_INITIATED, players: [ { name:'bob' }, { faction:'Nordic'} ], currentTurn:2};

    cancelCombatMutation(state);

    expect(state.status).toBe(AUTOMA_MOVE);
  })

  it(`should return to ${GAME_INITIATED} from ${COMBAT_INPROGRESS} when it is the persons turn`, () => {
    const state = { status: COMBAT_INPROGRESS, players: [ { name:'bob' }, { faction:'Nordic'} ], currentTurn:1};

    cancelCombatMutation(state);

    expect(state.status).toBe(GAME_INITIATED);
  })

  it(`should return to ${AUTOMA_MOVE} from ${COMBAT_INPROGRESS} when it is the automas turn`, () => {
    const state = { status: COMBAT_INPROGRESS, players: [ { name:'bob' }, { faction:'Nordic'} ], currentTurn:2};

    cancelCombatMutation(state);

    expect(state.status).toBe(AUTOMA_MOVE);
  })
});