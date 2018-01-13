import scytheApp from './index'
import { DEAL_CARD } from '../actions/types'

const action = {
  type: DEAL_CARD,
  payload: {
    card: 11
  }
}

const originalState = {
  players: [
    { level: 1, dealtCards: []},
    { level: 1, dealtCards: []},
    { level: 1, dealtCards: []},
  ],
  currentTurn:0
}

describe('DEAL_CARD reducer tests', () => {
  it('should set the card to the first player on the first turn', () => {
    const state = scytheApp(originalState, action);
    expect(state.players[0].dealtCards[0]).toBe(11);
  })

  it('should set the card to the third player on the 6th turn', () => {
    const temp = Object.assign({}, originalState, {currentTurn:5})
    const state = scytheApp(temp, action);
    expect(state.players[2].dealtCards[0]).toBe(11);
  })
})