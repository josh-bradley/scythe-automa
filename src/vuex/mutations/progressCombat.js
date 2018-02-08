import { COMBAT_INITIATED, GAME_INITIATED, COMBAT_INPROGRESS } from '../gameStatus'

export default (state, payload) => {
  state.status = state.status === GAME_INITIATED 
                  ? COMBAT_INITIATED 
                  : state.status === COMBAT_INPROGRESS 
                    ? GAME_INITIATED
                    : COMBAT_INPROGRESS;  
  state.combatInitiate = state.status === COMBAT_INITIATED ? payload.playerId : state.combatInitiate;
}