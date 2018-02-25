import * as playerMethods from  '../player'

export const currentPlayer = function(state){
    return state.players.length > 0 ? 
      Object.assign(state.players[Math.max(state.currentTurn -1, 0) % state.players.length], playerMethods) :
      null;
}

export const wrappedPlayers = (state) => {
  return state
          .players
          .map(player => Object.assign(player, playerMethods));
}
