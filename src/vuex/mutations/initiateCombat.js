import { COMBAT_INITIATED } from '../gameStatus'

export default (state, payload) => {
  state.status = COMBAT_INITIATED;  
  state.combatInitiate = payload.playerId;
}