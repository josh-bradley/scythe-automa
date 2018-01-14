import * as types from '../actions/types'
import data from '../../assets/data'

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
const totalNumberOfCards = 19;

const isStarCard = (card) => {
  return data
          .cards
          .filter(x => x.id === card)[0]
          .star;
}

const handlers = {
  [types.ADD_PLAYER]: (state, action) => {
    if(state.currentTurn === 0 && state.players.length < 6){
      let players = [...state.players, {
        dealtCards: [],
        starCardPosition:0,
        level: action.payload.level
      }]
      return Object.assign({}, state, { players:players })
    } 
    
    return state;
  },
  [types.DEAL_CARD]: (state, action) => {
    const currentPlayerIdx = state.currentTurn % state.players.length;
    const newPlayers = state.players.slice();
    const currentPlayer = newPlayers[currentPlayerIdx];
    const isReShuffle = currentPlayer.dealtCards.length >= totalNumberOfCards - 1;
    if(!isReShuffle && currentPlayer.dealtCards.some((x) => x === action.payload.card))
      return state;
    const newDealtCards =  isReShuffle
                          ? [action.payload.card]
                          : [...currentPlayer.dealtCards, action.payload.card];
    const starCardPosition = isStarCard(action.payload.card) ? currentPlayer.starCardPosition + 1 : currentPlayer.starCardPosition;
    newPlayers[currentPlayerIdx] = Object.assign({}, currentPlayer, { dealtCards: newDealtCards, starCardPosition:starCardPosition })    
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