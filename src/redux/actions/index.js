import * as types from './types'

export const dealCard = (deck, card) => {
  return {
    type: types.DEAL_CARD,
    payload:{
      card
    }
  }
}

export const addPlayer = (level) => {
  return {
    type: types.ADD_PLAYER,
    payload: {
      level:level
    }
  }
}