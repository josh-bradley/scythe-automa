import * as types from './types'
import data from '../assets/data'
import { AUTOMA_CARD_COUNT } from '../constants'
import dealCombatCardMutation from './mutations/dealCombatCard'

const totalNumberOfCards = AUTOMA_CARD_COUNT;
const isCardStarCard = (card) => {
  return data
          .cards
          .filter(x => x.id === card)[0]
          .star;
}

export default {
  [types.ADD_PLAYER]: (state, payload) => {
    if(state.currentTurn === 0 && state.players.length < 6){
      state.players.push({
        dealtCards: [],
        dealtCombatCards:[],
        starCardPosition:0,
        level: payload.level,
        faction: payload.faction,
        power: data.factionMats[payload.faction].power,
        stars:0,
        coins:5
      });
    }           
  },
  [types.DEAL_CARD]: (state, payload) => {
    const currentPlayerIdx = state.currentTurn % state.players.length;
    const currentPlayer = state.players[currentPlayerIdx];
    const discardedCards = currentPlayer.dealtCards.concat(currentPlayer.dealtCombatCards);
    const isReShuffle = discardedCards.length >= totalNumberOfCards - 1;
    const cardAlreadyDealt = discardedCards.some((x) => x === payload.card);
    if(!isReShuffle && cardAlreadyDealt)
      return;
    currentPlayer.dealtCards =  isReShuffle
                          ? [payload.card]
                          : [...currentPlayer.dealtCards, payload.card];
    currentPlayer.dealtCombatCards = isReShuffle
                                      ? []
                                      : currentPlayer.dealtCombatCards;
    const isStarCard = isCardStarCard(payload.card);
    const automaCard = data
                        .cards
                        .filter(x => x.id === payload.card)[0];
    const playerLevel = state.players[currentPlayerIdx].level;
    const starCard = data.starCards[playerLevel];
    const playerScheme = starCard.schemePosition > currentPlayer.starCardPosition ? 0 : 1;

    const playTurn = currentPlayer.level > 1 ||  !automaCard.schemeSpecific[playerScheme].noplay;
    const starCardPosition = isStarCard && playTurn ? currentPlayer.starCardPosition + 1 : currentPlayer.starCardPosition;
    currentPlayer.starCardPosition = starCardPosition;
    currentPlayer.stars = starCard.starPositions.indexOf(starCardPosition) < 0 || !isStarCard || !playTurn ? currentPlayer.stars : currentPlayer.stars + 1;
    const factionSpecific = automaCard.schemeSpecific[playerScheme].factionSpecific[currentPlayer.faction] || { coins:0, power:0};
    currentPlayer.power = playTurn ? automaCard.schemeSpecific[playerScheme].power + currentPlayer.power + factionSpecific.power : currentPlayer.power;
    currentPlayer.coins = playTurn ? automaCard.schemeSpecific[playerScheme].coins + currentPlayer.coins + factionSpecific.coins : currentPlayer.coins;
    state.currentTurn = state.currentTurn + 1;
    state.inCombat = false;
  },
  [types.DEAL_COMBAT_CARD]: dealCombatCardMutation
}