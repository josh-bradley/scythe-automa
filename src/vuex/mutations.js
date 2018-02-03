import * as types from './types'
import data from '../assets/data'

const totalNumberOfCards = 19;
const isCardStarCard = (card) => {
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
        level: payload.level,
        stars:0
      });
    }           
  },
  [types.DEAL_CARD]: (state, payload) => {
    const currentPlayerIdx = state.currentTurn % state.players.length;
    const currentPlayer = state.players[currentPlayerIdx];
    const isReShuffle = currentPlayer.dealtCards.length >= totalNumberOfCards - 1;
    const cardAlreadyDealt = currentPlayer.dealtCards.some((x) => x === payload.card);
    if(!isReShuffle && cardAlreadyDealt)
      return;
    const newDealtCards =  isReShuffle
                          ? [payload.card]
                          : [...currentPlayer.dealtCards, payload.card];
    const isStarCard = isCardStarCard(payload.card);
    const starCardPosition = isStarCard ? currentPlayer.starCardPosition + 1 : currentPlayer.starCardPosition;
    currentPlayer.dealtCards = newDealtCards;
    currentPlayer.starCardPosition = starCardPosition;
    const playerLevel = state.players[currentPlayerIdx].level;
    const starCard = data.starCards[playerLevel - 1];
    currentPlayer.stars = starCard.starPositions.indexOf(starCardPosition) < 0 || !isStarCard ? currentPlayer.stars : currentPlayer.stars + 1;
    state.currentTurn = state.currentTurn + 1;
  }
}