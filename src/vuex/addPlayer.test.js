import * as types from './types'
import mutations from './mutations'

const payload = {
    level: 1
}
const state = {
  players:[],
  currentTurn:0
}

const mutator = mutations[types.ADD_PLAYER];

describe('ADD_PLAYER tests', () => {
  it('should add player to game', () => {
    mutator(state, payload)
    expect(state.players.length).toBe(1)
  })


  it('should add player to game with correct level', () => {
    mutator(state, payload)
    expect(state.players[0].level).toBe(1)
    expect(state.players[0].dealtCards).toEqual([]);
    expect(state.players[0].starCardPosition).toBe(0);
  })

  it('should not add more then 6 players to a game', () => {
    const originalState = {
      currentTurn:0,
      players:[
        { level: 1},
        { level: 1},
        { level: 1},
        { level: 1},
        { level: 1},
        { level: 1},
      ]
    }
    mutator(originalState, payload);
    expect(originalState.players.length).toBe(6)
  })
});