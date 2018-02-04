import { AUTOMA_CARD_COUNT } from '../../constants'

export default (state, payload) => {
  const player = state.players[payload.playerId];
  const discardedCards = player.dealtCards.concat(player.dealtCombatCards);
  const isReShuffle = discardedCards.length >= AUTOMA_CARD_COUNT - 1;
  if(!isReShuffle){
    player.dealtCombatCards.push(payload.card);
  }
  else{
    player.dealtCards = [];
    player.dealtCombatCards = [payload.card];
  }
}