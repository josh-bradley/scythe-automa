import { COMBAT_INITIATED, GAME_INITIATED, COMBAT_INPROGRESS } from '../gameStatus'
import { getCombatPosition, currentCombatCard } from '../../player'

const adjustCombatPoints = (player) => {
  if(player.name)
    return;
  const combatPos = getCombatPosition(player);
  const combatCard = currentCombatCard(player);
  player.power = Math.max(player.power - combatCard.combatPoints[combatPos], 0);
}

export default (state, payload) => {
  if(state.status === COMBAT_INPROGRESS){
    let combatInitiate = state.players[state.combatInitiate];
    adjustCombatPoints(combatInitiate);
    adjustCombatPoints(state.players[state.opponentId]);
  }
  state.status = state.status === GAME_INITIATED 
                  ? COMBAT_INITIATED 
                  : state.status === COMBAT_INPROGRESS 
                    ? GAME_INITIATED
                    : COMBAT_INPROGRESS;  
  state.opponentId = state.status === COMBAT_INPROGRESS ? payload.opponentId : state.opponentId;
  state.combatInitiate = state.status === COMBAT_INITIATED ? payload.playerId : state.combatInitiate;
}