import { AUTOMA_CARD_COUNT } from '../../constants'
import { AUTOMA_MOVE } from '../gameStatus'
import data from '../../assets/data'
const totalNumberOfCards = AUTOMA_CARD_COUNT;

const isCardStarCard = (card) => {
  return data
          .cards
          .filter(x => x.id === card)[0]
          .star;
}

export default (state, payload) => {
  const currentPlayerIdx = state.currentTurn % state.players.length;
  const currentPlayer = state.players[currentPlayerIdx];
  if(currentPlayer.name) {
    state.currentTurn = state.currentTurn + 1;
    return;
  }
  const discardedCards = currentPlayer.dealtCards.concat(currentPlayer.dealtCombatCards);
  const isReShuffle = discardedCards.length >= totalNumberOfCards - 1;
  const cardAlreadyDealt = discardedCards.some((x) => x === payload.card);
  if(!isReShuffle && cardAlreadyDealt)
    return;
  currentPlayer.dealtCards =  isReShuffle
                        ? [payload.card]
                        : [...currentPlayer.dealtCards, payload.card];
  currentPlayer.dealtCombatCards = isReShuffle
                                    ? []
                                    : currentPlayer.dealtCombatCards;
  const isStarCard = isCardStarCard(payload.card);
  const automaCard = data
                      .cards
                      .filter(x => x.id === payload.card)[0];
  const playerLevel = state.players[currentPlayerIdx].level;
  const starCard = data.starCards[playerLevel];
  const playerScheme = starCard.schemePosition > currentPlayer.starCardPosition ? 0 : 1;

  const playTurn = currentPlayer.level > 1 ||  !automaCard.schemeSpecific[playerScheme].noplay;
  const starCardPosition = isStarCard && playTurn ? currentPlayer.starCardPosition + 1 : currentPlayer.starCardPosition;
  currentPlayer.starCardPosition = starCardPosition;
  currentPlayer.stars = starCard.starPositions.indexOf(starCardPosition) < 0 || !isStarCard || !playTurn ? currentPlayer.stars : currentPlayer.stars + 1;
  state.currentTurn = state.currentTurn + 1;
  state.inCombat = false;
  state.status = AUTOMA_MOVE;
}