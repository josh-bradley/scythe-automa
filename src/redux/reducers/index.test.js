import * as types from '../actions/types'
import scytheApp from './index'

test('should add player to game', () => {
  const action = {
    type: types.ADD_PLAYER,
    payload: {
      level: 1
    }
  }

  const state = scytheApp(undefined, action);
  expect(state.players.length).toBe(1)
})