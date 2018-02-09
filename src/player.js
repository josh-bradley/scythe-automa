export const isHuman = (player) => {
  return player.name;
}

export const currentCombatCard = (player) => {
  return player.dealtCombatCards[player.dealtCombatCards.length - 1];
}