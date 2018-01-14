import * as types from '../actions/types'
import scytheApp from './index'

const level1UserAction = {
  type: types.ADD_PLAYER,
  payload: {
    level: 1
  }
}

describe('ADD_PLAYER tests', () => {
  it('should add player to game', () => {
    const state = scytheApp(undefined, level1UserAction);
    expect(state.players.length).toBe(1)
  })


  it('should add player to game with correct level', () => {
    const state = scytheApp(undefined, level1UserAction);
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
    const state = scytheApp(originalState, level1UserAction);
    expect(state.players.length).toBe(6)
  })
});