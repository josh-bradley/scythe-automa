import { AUTOMA_CARD_COUNT } from '../../constants'
import { AUTOMA_MOVE, GAME_FINISHED } from '../gameStatus'
import data from '../../assets/data'
import * as playerMethods from '../../player'
const totalNumberOfCards = AUTOMA_CARD_COUNT;

export default (state, payload) => {
  const currentPlayerIdx = state.currentTurn % state.players.length;
  const currentPlayer = Object.assign(state.players[currentPlayerIdx], playerMethods);
  
  let prevPlayer = state.players[(currentPlayerIdx + state.players.length - 1) % state.players.length];
  prevPlayer = Object.assign(prevPlayer, playerMethods);
  if(!prevPlayer.name) {
    updateStarTrackPosition(prevPlayer);
    if(prevPlayer.stars === 6){
      state.status = GAME_FINISHED;
      return;
    }
  }
  
  if(currentPlayer.name) {
    state.currentTurn = state.currentTurn + 1;
    return;
  }
  const discardedCards = currentPlayer.getDiscardedCards();
  const isReShuffle = discardedCards.length >= totalNumberOfCards - 1;
  const cardAlreadyDealt = discardedCards.some((x) => x === payload.card);
  if(!isReShuffle && cardAlreadyDealt)
    return;
  currentPlayer.dealtCards =  isReShuffle
                        ? [payload.card]
                        : [...currentPlayer.dealtCards, payload.card];
  currentPlayer.lastPlayedCard = payload.card;
  currentPlayer.dealtCombatCards = isReShuffle
                                    ? []
                                    : currentPlayer.dealtCombatCards;

  state.currentTurn = state.currentTurn + 1;
  state.inCombat = false;
  state.status = AUTOMA_MOVE;
}

let updateStarTrackPosition = function(player) {
  if(player.dealtCards.length === 0)
    return;
  const starCard = data.starCards[player.level];
  const automaCard = player.getCurrentCard();
  const schemeSpecific = player.getCurrentScheme();
  const playTurn = player.level > 1 ||  !schemeSpecific.noplay;
  const isCurrentCardStarCard = automaCard.star;
  const starCardPosition = isCurrentCardStarCard && playTurn ? player.starCardPosition + 1 : player.starCardPosition;
  player.starCardPosition = starCardPosition;
  player.stars = (starCard.starPositions.indexOf(starCardPosition) < 0 || !isCurrentCardStarCard || !playTurn) ? player.stars : player.stars + 1;
  if(isCurrentCardStarCard && starCardPosition === starCard.schemePosition) {
    player.dealtCards = [];
    player.dealtCombatCards = [];
  }
}