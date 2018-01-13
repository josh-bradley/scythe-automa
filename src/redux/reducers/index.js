import * as types from '../actions/types'

/*
  {
    players:[
      { dealtCards: []},
      level: 1|2|3|4
    ],
    currentTurn:
  }
*/

const defaultState = {
  players:[],
  currentTurn:0
}

const handlers = {
  [types.ADD_PLAYER]: (state, action) => {
    if(state.currentTurn === 0){
      let players = [...state.players, {
        dealtCards: [],
        level: action.payload.level
      }]
      return Object.assign({}, state, { players:players })
    } 
    
    return state;
  },
  [types.DEAL_CARD]: (state, action) => {
    const currentPlayerIdx = state.currentTurn % state.players.length % 2;
    const newPlayers = state.players.slice();
    const currentPlayer = newPlayers[currentPlayerIdx];
    const newDealtCards = currentPlayerIdx.dealtCards.length === totalNumberOfCards - 1 ? [] : [...currentPlayer.dealtCards, action.payload.card];
    newPlayers[currentPlayerIdx] = Object.assign({}, currentPlayer, { dealtCards: newDealtCards })    
    return Object.assign({}, state, { players: newPlayers, currentTurn: state.currentTurn + 1});
  }
}

const scytheApp = (state = defaultState, action) => {
  if(handlers[action.type]){
    return handlers[action.type](state, action);
  }
  return state;
}

export default scytheApp