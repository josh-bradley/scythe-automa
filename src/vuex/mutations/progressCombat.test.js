import { PROGRESS_COMBAT } from '../types'
import mutations from '../mutations'
import { COMBAT_INITIATED, GAME_INITIATED, COMBAT_INPROGRESS, AUTOMA_MOVE } from '../gameStatus'
const mutation = mutations[PROGRESS_COMBAT];

const getDefaultState = (currentTurn = 0) => ({
  players: [
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Nordic"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Polonia"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Crimean"},
    { name: 'bob'},
  ],
  currentTurn:currentTurn,
  status:GAME_INITIATED
})

const getCombatInProgressState = (startingPower = 8, currentTurn=0) => {
  let state = getDefaultState(currentTurn);
  state.status = COMBAT_INPROGRESS;
  state.combatInitiate = 0;
  state.opponentId = 1; 
  state.players[0].power = startingPower;
  state.players[0].dealtCombatCards.push(12);
  state.players[1].power = startingPower;
  state.players[1].dealtCombatCards.push(3);
  return state;
}

describe('INIATE_COMBAT tests', () => {
  it(`should set the combat status to ${COMBAT_INITIATED}`, () => {
    let state = getDefaultState();
    
    mutation(state, { playerId: 0,  });

    expect(state.status).toBe(COMBAT_INITIATED);
  })

  it('should set combat intiate to the current player.', () => {
    let state = getDefaultState();
    
    mutation(state, { playerId: 0,  });

    expect(state.combatInitiate).toBe(0);
  })

  it(`should set the combat status to ${COMBAT_INPROGRESS} after ${COMBAT_INITIATED}`, () => {
    let state = getDefaultState();
    state.status = COMBAT_INITIATED;

    mutation(state, { playerId: 0  });

    expect(state.status).toBe(COMBAT_INPROGRESS);
  })

  it(`should set the opponent id from the payload`, () => {
    let state = getDefaultState();
    state.status = COMBAT_INITIATED;

    mutation(state, { opponentId:1 });

    expect(state.opponentId).toBe(1);
  })

  it(`should set the co mbat status to ${GAME_INITIATED} after ${COMBAT_INPROGRESS}`, () => {
    let state = getCombatInProgressState(8,4);

    mutation(state, { playerId: 4  });

    expect(state.status).toBe(GAME_INITIATED);
  })

  it(`should set the combat status to ${AUTOMA_MOVE} after ${COMBAT_INPROGRESS} for automa`, () => {
    let state = getCombatInProgressState();

    mutation(state, { playerId: 0  });
    
    expect(state.status).toBe(AUTOMA_MOVE);
  })

  it('should subtract the correct amount of power points', () => {
    const payload = {};
    const state = getCombatInProgressState(8);

    mutation(state, payload);

    expect(state.players[0].power).toBe(3);
  });

  it('should subtract the correct amount of power points and bottom out at 0', () => {
    const payload = {};
    const state = getCombatInProgressState(2);

    mutation(state, payload);

    expect(state.players[0].power).toBe(0);
  });

  it('should the correct amout of points off the opponent.', () => {
    const payload = {};
    const state = getCombatInProgressState(15);

    mutation(state, payload);

    expect(state.players[1].power).toBe(8);
  });

  it('should the correct amout of points off the opponent and bottom out at 0.', () => {
    const payload = {};
    const state = getCombatInProgressState(1);

    mutation(state, payload);

    expect(state.players[1].power).toBe(0);
  });
})
