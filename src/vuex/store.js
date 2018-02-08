import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { GAME_INITIATED } from './gameStatus'

Vue.use(Vuex);

const defaultState = {
  players:[],
  currentTurn:0,
  inCombat:false,
  status: GAME_INITIATED
}

const isStarCard = (card) => {
  return data
          .cards
          .filter(x => x.id === card)[0]
          .star;
}

export default new Vuex.Store({
  state:defaultState,
  mutations
})