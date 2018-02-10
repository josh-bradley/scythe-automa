import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { GAME_INITIATED } from './gameStatus'
import defaultState from './defaultState'

Vue.use(Vuex);

const isStarCard = (card) => {
  return data
          .cards
          .filter(x => x.id === card)[0]
          .star;
}

const stateKey = 'saved_state'
const saveStatePlugin = store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem(stateKey, JSON.stringify(state));
  });
}

const savedState = JSON.parse(localStorage.getItem(stateKey))
if(savedState)
  savedState.shouldLoadState = true
const startState = savedState || defaultState;
export default new Vuex.Store({
  state:startState,
  mutations,
  plugins:[saveStatePlugin]
})