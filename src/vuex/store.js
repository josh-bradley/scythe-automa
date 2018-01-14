import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);

const defaultState = {
  players:[],
  currentTurn:0
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