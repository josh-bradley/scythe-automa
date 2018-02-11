import data from '../../assets/data'

export default (state, payload) => {
  if(state.currentTurn === 0 && state.players.length < 6){
    const id = state.players.length;
    if(payload.name){
      state.players.push({
        id:id,
        name:payload.name
      });
    } else {
      state.players.push({
        id:id,
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
  }           
}