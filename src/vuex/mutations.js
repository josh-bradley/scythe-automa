import * as types from './types'
import data from '../assets/data'
import { AUTOMA_CARD_COUNT } from '../constants'
import dealCombatCardMutation from './mutations/dealCombatCard'
import intiateCombatMutation from './mutations/progressCombat'
import resetGame from './mutations/resetGame'
import completeMove from './mutations/completeMove'
import completeBuild from './mutations/completeBuild'
import dealCard from './mutations/dealCard'
import addPlayer from './mutations/addPlayer'
import { AUTOMA_MOVE } from './gameStatus'

const totalNumberOfCards = AUTOMA_CARD_COUNT;

export default {
  [types.PROGRESS_COMBAT]: intiateCombatMutation,
  [types.DEAL_COMBAT_CARD]: dealCombatCardMutation,
  [types.RESET_GAME]: resetGame,
  [types.COMPLETE_MOVE]: completeMove,
  [types.COMPLETE_BUILD]: completeBuild,
  [types.ADD_PLAYER]: addPlayer,
  [types.DEAL_CARD]: dealCard
}