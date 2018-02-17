import data from '../../assets/data'

export default (state, payload) => {
  if(state.currentTurn === 0 && state.players.length < 6){
    const id = state.players.length;
    if(payload.name){
      const humans = state.players.filter(x => x.name);
      state.players = [
        ...humans,
        {id:id,name:payload.name},
        ...state.players.filter(x => !x.name)
      ];
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