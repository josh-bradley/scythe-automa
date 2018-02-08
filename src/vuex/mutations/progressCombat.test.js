import { PROGRESS_COMBAT } from '../types'
import mutations from '../mutations'
import { COMBAT_INITIATED, GAME_INITIATED, COMBAT_INPROGRESS } from '../gameStatus'
const mutation = mutations[PROGRESS_COMBAT];

const getDefaultState = () => ({
  players: [
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Nordic"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Polonia"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Crimean"},
  ],
  currentTurn:0,
  status:GAME_INITIATED
})

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

    mutation(state, { playerId: 0,  });
    
    expect(state.status).toBe(COMBAT_INPROGRESS);
  })

  it(`should set the combat status to ${GAME_INITIATED} after ${COMBAT_INPROGRESS}`, () => {
    let state = getDefaultState();
    state.status = COMBAT_INPROGRESS;

    mutation(state, { playerId: 0,  });
    
    expect(state.status).toBe(GAME_INITIATED);
  })
})
