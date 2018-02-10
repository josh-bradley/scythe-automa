import data from './assets/data'

export const isHuman = (player) => {
  return player.name;
}

export const currentCombatCard = (player) => {
  return data.cards[player.dealtCombatCards[player.dealtCombatCards.length - 1]];
}

export const getCombatPosition = (player) => {
  return player.power < 8 ? 0 : player.power < 14 ? 1 : 2;
}