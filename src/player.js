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

export const canCrossRiver = (player) => {
  const starCard = data.starCards[player.level];
  return player.starCardPosition >= starCard.riverCrossingPos;
}