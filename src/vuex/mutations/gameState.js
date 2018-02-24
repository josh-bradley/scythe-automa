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
  if(state.savedState)
    Object.assign(state, state.savedState);
  state.savedState = null;
}

export const clearSavedGame = (state) => {
  state.savedState = null;
  localStorage.setItem(SAVED_GAME_KEY, null);
}

export const startGame = (state) => {
  state.status = GAME_INITIATED;
}