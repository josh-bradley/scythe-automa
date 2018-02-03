import { DEAL_CARD } from './types'
import mutations from './mutations'
const mutation = mutations[DEAL_CARD]; 
const payload = {
  card: 11
}

const getDefaultState = () => ({
  players: [
    { level: 1, dealtCards: [], starCardPosition:0, stars:0},
    { level: 1, dealtCards: [], starCardPosition:0, stars:0},
    { level: 1, dealtCards: [], starCardPosition:0, stars:0},
  ],
  currentTurn:0
})

describe('DEAL_CARD mutation test tests', () => {
  it('should set the card to the first player on the first turn', () => {
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].dealtCards[0]).toBe(11);
  })

  it('should up the turn count by 1 for a sucessful turn', () => {
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.currentTurn).toBe(1);
  })

  it('should set the card to the third player on the 6th turn', () => {
    const state = Object.assign(getDefaultState(), {currentTurn:5})
    mutation(state, payload);
    expect(state.players[2].dealtCards[0]).toBe(11);
  })

  it('should not add the same card twice', () => {
    const players = [{ level:1, dealtCards:[11]}]
    const state = Object.assign(getDefaultState(), { currentTurn:2, players:players})
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(1);
  })

  it('should return the card count to 0 once all cards have been dealt', () => {
    const players = [{level:1, dealtCards:[...Array.from(Array(19).keys())].map(x => ++x)}]
    const state = Object.assign(getDefaultState(), {players:players, currentTurn:20});
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(1);
    expect(state.players[0].dealtCards[0]).toBe(11);
  })

  it('should add a star position to the player when a star card is dealt', () => {
    const payload = {
      card:1,
    }
    
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].starCardPosition).toBe(1)
  })

  it('should not add a star position to the player when a non star card is dealt', () => {
    const payload ={
        card:4,
    }
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].starCardPosition).toBe(0)
  })

  it('should not add a star to count when star card position has no star', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].stars).toBe(0);
  })

  it('should add a star to count when star card position has a star', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState();
    state.players[0].starCardPosition = 9;
    mutation(state, payload);
    expect(state.players[0].stars).toBe(1);
  })

  it('should not add a star to count when star card card position stays on star', () => {
    const payload = {
      card:4
    }
    let state = getDefaultState();
    state.players[0].starCardPosition = 10;
    mutation(state, payload);
    expect(state.players[0].stars).toBe(0);
  })
})