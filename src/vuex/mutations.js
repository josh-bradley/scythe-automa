import * as types from './types'
import dealCombatCardMutation from './mutations/dealCombatCard'
import intiateCombatMutation from './mutations/progressCombat'
import resetGame from './mutations/resetGame'
import completeMove from './mutations/completeMove'
import completeBuild from './mutations/completeBuild'
import dealCard from './mutations/dealCard'
import addPlayer from './mutations/addPlayer'

export default {
  [types.PROGRESS_COMBAT]: intiateCombatMutation,
  [types.DEAL_COMBAT_CARD]: dealCombatCardMutation,
  [types.RESET_GAME]: resetGame,
  [types.COMPLETE_MOVE]: completeMove,
  [types.COMPLETE_BUILD]: completeBuild,
  [types.ADD_PLAYER]: addPlayer,
  [types.DEAL_CARD]: dealCard
}