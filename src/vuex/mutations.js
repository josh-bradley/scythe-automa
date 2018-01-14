import * as types from './types'
import data from '../assets/data'

const totalNumberOfCards = 19;
const isStarCard = (card) => {
  return data
          .cards
          .filter(x => x.id === card)[0]
          .star;
}

export default {
  [types.ADD_PLAYER]: (state, payload) => {
    if(state.currentTurn === 0 && state.players.length < 6){
      state.players.push({
        dealtCards: [],
        starCardPosition:0,
        level: payload.level
      });
    }           
  },
  [types.DEAL_CARD]: (state, payload) => {
    const currentPlayerIdx = state.currentTurn % state.players.length;
    const newPlayers = state.players.slice();
    const currentPlayer = newPlayers[currentPlayerIdx];
    const isReShuffle = currentPlayer.dealtCards.length >= totalNumberOfCards - 1;
    if(!isReShuffle && currentPlayer.dealtCards.some((x) => x === payload.card))
      return;
    const newDealtCards =  isReShuffle
                          ? [payload.card]
                          : [...currentPlayer.dealtCards, payload.card];
    const starCardPosition = isStarCard(payload.card) ? currentPlayer.starCardPosition + 1 : currentPlayer.starCardPosition;
    newPlayers[currentPlayerIdx] = Object.assign({}, currentPlayer, { dealtCards: newDealtCards, starCardPosition:starCardPosition })    
    state.players = newPlayers;
    state.currentTurn = state.currentTurn + 1;
  }
}