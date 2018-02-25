import * as playerMethods from  '../player'

export const getCurrentPlayer = function(state){
  Object.assign(state.players[Math.max(state.currentTurn -1, 0) % state.players.length], playerMethods);
}