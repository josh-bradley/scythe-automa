import * as playerMethods from  '../player'
import playerGetters from '../playerGetters'

export const currentPlayer = function(state){
    return state.players.length > 0 ? 
      Object.assign(state.players[Math.max(state.currentTurn -1, 0) % state.players.length], playerMethods) :
      null;
}

export const wrappedPlayers = (state) => {
  const players = state
          .players
          .map(player => Object.assign(player, playerMethods));
  players.forEach(player => Object.getOwnPropertyNames(playerGetters).forEach(propName => {
    Object.defineProperty(player, propName, { get: playerGetters[propName] });
  }));
  return players;
}
