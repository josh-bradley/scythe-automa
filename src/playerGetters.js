import data from './assets/data'

export default { 
  factionName: function(){
    return this.faction ?
        data.factions.filter(x => this.faction === x.id)[0].name :
        '';
  }
}