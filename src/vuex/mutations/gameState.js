import defaultState from '../defaultState'
import { SAVED_GAME_KEY } from '../../constants'

export const resetGame = (state, payload) => {
  Object.assign(state, defaultState);
}

export const loadSavedGame = (state) => {
  if(state.savedState)
    Object.assign(state, state.savedState);
  state.savedState = null;
}

export const clearSavedGame = (state) => {
  state.savedState = null;
}