import { INITIATE_COMBAT } from '../types'
import mutations from '../mutations'
import { COMBAT_INITIATED } from '../gameStatus'
const mutation = mutations[INITIATE_COMBAT];

const getDefaultState = () => ({
  players: [
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Nordic"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Polonia"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Crimean"},
  ],
  currentTurn:0
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
})
