import data from './assets/data'

export const isHuman = (player) => {
  return player.name;
}

export const currentCombatCard = (player) => {
  return data.cards[player.dealtCombatCards[player.dealtCombatCards.length - 1]];
}

export const getCurrentCard = function(){
  return this.dealtCards.length === 0 ? null : data.cards[this.dealtCards[this.dealtCards.length - 1]];
}

export const getCurrentScheme = function(){
  const currentCard = this.getCurrentCard();
  if(!currentCard)
    return null;
  const starCard = data.starCards[this.level];
  const schemeId = starCard.schemePosition > this.starCardPosition ? 0 : 1; 
  return currentCard.schemeSpecific[schemeId];
}

export const getCurrentMoveOptions = function() {
  const player = this;
  const scheme = player.getCurrentScheme();
  if(!scheme)
    return [];
  const moves = scheme.moves;
  return moves
          .filter(move => move.faction === undefined || move.faction === player.faction)
          .filter(move => move.type !== "attack" || move.threshold <= player.power)
          .map(move => data.automaMoveData[move.type])
}

export const getBuildList = function(){
  const scheme = this.getCurrentScheme();
  const buildList = [];
  const factionSpecificWorkers = scheme.factionSpecific[this.faction].workers || 0;
  if(scheme.workers > 0 || factionSpecificWorkers > 0)
    buildList.push(`Deploy ${scheme.workers + factionSpecificWorkers} workers`);
  const factionSpecificMechs = scheme.factionSpecific[this.faction].mechs || 0;
  if(scheme.mechs > 0 || factionSpecificMechs > 0)
    buildList.push(`Deploy ${scheme.mechs + factionSpecificMechs} characters\mechs`);

  return buildList;
}

export const getCombatPosition = (player) => {
  return player.power < 8 ? 0 : player.power < 14 ? 1 : 2;
}

export const canCrossRiver = (player) => {
  const starCard = data.starCards[player.level];
  return player.starCardPosition >= starCard.riverCrossingPos;
}