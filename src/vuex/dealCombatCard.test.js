import { DEAL_COMBAT_CARD } from './types'
import mutations from './mutations'
const mutation = mutations[DEAL_COMBAT_CARD]; 

const getDefaultState = () => ({
  players: [
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Nordic"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Polonia"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Crimean"},
  ],
  currentTurn:0
})

describe('DEAL_COMBAT_CARD mutation tests', () => {
  it('should set the card to the correct player', () => {
    const payload = {
      playerId:1, 
      card:5
    }
    const state = getDefaultState();
    
    mutation(state, payload);

    expect(state.players[1].dealtCombatCards[0]).toBe(5);
  });

  it('should return the card count to 0 once all cards have been dealt across both discard piles', () => {
    const payload = { playerId:0, card:5};
    const players = [{level:1, dealtCards:[...Array.from(Array(18).keys())].map(x => ++x),dealtCombatCards:[19]}]
    const state = Object.assign(getDefaultState(), {players:players, currentTurn:20});
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(0);
    expect(state.players[0].dealtCombatCards.length).toBe(1);
    expect(state.players[0].dealtCombatCards[0]).toBe(5);
  })

  it('should subtract the correct amount of power points', () => {
    const payload = { playerId:0, card:1 };
    const state = getDefaultState();
    state.players[0].power = 8;

    mutation(state, payload);

    expect(state.players[0].power).toBe(1);
  });

  it('should bottom power points out at 0', () => {
    const payload = { playerId:0, card:1 };
    const state = getDefaultState();
    state.players[0].power = 4;

    mutation(state, payload);

    expect(state.players[0].power).toBe(0);
  });
});
