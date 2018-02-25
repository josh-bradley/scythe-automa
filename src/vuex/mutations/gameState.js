import defaultState from '../defaultState'
import { SAVED_GAME_KEY } from '../../constants'
import { GAME_INITIATED, GAME_SETUP, AUTOMA_MOVE } from '../gameStatus'

export const resetGame = (state) => {
  state.players = [];
  state.currentTurn = 0;
  state.status = GAME_SETUP;
  state.inCombat = false;
  state.savedState = null;
}

export const clearSavedGame = (state) => {
  state.savedState = null;
  localStorage.setItem(SAVED_GAME_KEY, null);
}

export const startGame = (state) => {
  state.status = GAME_INITIATED;
}

export const cancelCombat = (state) => {
  const currentPlayer = state.players[Math.max(state.currentTurn -1, 0) % state.players.length];
  state.status = currentPlayer.name ? GAME_INITIATED : AUTOMA_MOVE;
}