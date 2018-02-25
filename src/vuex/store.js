import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import defaultState from './defaultState'
import { SAVED_GAME_KEY } from '../constants'
import * as getters from './getters'

Vue.use(Vuex);

const isStarCard = (card) => {
  return data
          .cards
          .filter(x => x.id === card)[0]
          .star;
}

const saveStatePlugin = store => {
  store.subscribe((mutation, state) => {
    if(state.currentTurn > 0)
      localStorage.setItem(SAVED_GAME_KEY, JSON.stringify(state));
  });
}

defaultState.savedState = JSON.parse(localStorage.getItem(SAVED_GAME_KEY))
export default new Vuex.Store({
  state:defaultState,
  mutations,
  plugins:[saveStatePlugin]
})