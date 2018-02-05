import { AUTOMA_CARD_COUNT } from '../../constants'
import data from '../../assets/data'

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

  const rangeId = player.power < 8 ? 0 : player.power < 14 ? 1 : 2;
  const powerSpend = data.cards[payload.card].combatPoints[rangeId];
  player.power = Math.max(player.power - powerSpend, 0);
  state.inCombat = true;
}