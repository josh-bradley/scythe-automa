import data from './assets/data'

export default { 
  factionName: function(){
    return this.faction ?
        data.factions.filter(x => this.faction === x.id)[0].name :
        '';
  },
  automaLevelName: function() {
    return data.automaLevels[this.level - 1].name;
  }
}