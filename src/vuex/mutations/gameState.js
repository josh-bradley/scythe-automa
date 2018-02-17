import defaultState from '../defaultState'
import { SAVED_GAME_KEY } from '../../constants'
import { GAME_INITIATED } from '../gameStatus'

export const resetGame = (state, payload) => {
  Object.assign(state, defaultState);
}

export const loadSavedGame = (state) => {
  if(state.savedState)
    Object.assign(state, state.savedState);
  state.savedState = null;
  state.status = GAME_INITIATED;
}

export const clearSavedGame = (state) => {
  state.savedState = null;
}

export const startGame = (state) => {
  state.status = GAME_INITIATED;
}