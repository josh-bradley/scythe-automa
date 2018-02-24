import defaultState from '../defaultState'
import { SAVED_GAME_KEY } from '../../constants'
import { GAME_INITIATED, GAME_SETUP } from '../gameStatus'

export const resetGame = (state) => {
  state.players = [];
  state.currentTurn = 0;
  state.status = GAME_SETUP;
  state.inCombat = false;
  state.savedState = null;
}

export const loadSavedGame = (state) => {
  if(state.savedState) {
    state.players = state.savedState.players;
    state.currentTurn = state.savedState.currentTurn;
    state.status = state.savedState.status;
    state.inCombat = state.savedState.inCombat;
  }
  state.savedState = null;
}

export const clearSavedGame = (state) => {
  state.savedState = null;
  localStorage.setItem(SAVED_GAME_KEY, null);
}

export const startGame = (state) => {
  state.status = GAME_INITIATED;
}