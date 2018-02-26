<template lang='pug'>
  div(style='display:flex;flex;flex-direction:column;justify-content: center;')
    h4(v-if='player.name') {{message}}
    div(v-if='player.name === undefined' class='automa-instructions')
      h4 {{automaStepName}}
      div Automa card reference {{player.getCurrentCardId()}}
      ul
        li(class='mdl-list__item' v-if='isMoveInProgress' v-for='moveOption in player.getCurrentMoveOptions()') {{moveOption.description}}
        li(class='mdl-list__item' v-if='isBuildInProgress' v-for='buildItem in player.getBuildList()') {{buildItem}}  
        li(class='mdl-list__item' v-if='isAutomaFinaliseInProgress' v-for='recruitBonus in recruitBonuses') {{recruitBonus}}
</template>

<script>
  import data from './assets/data'
  import * as deck from './deck'
  import * as types from './vuex/types'
  import { mapState } from 'vuex'
  import * as playerMethods from './player'
  import { AUTOMA_MOVE, AUTOMA_BUILD, AUTOMA_FINALISE } from './vuex/gameStatus'

  export default {
    props: {
      player:{
        type: Object,
        required: true
      }
    },
    computed: mapState({
      automaStepName () {
        return this.isMoveInProgress ? 'Automa Move Step' : this.isBuildInProgress ? 'Automa Deploy Step' : 'Finalise Automa Turn';
      },
      currentTurn () {
        return this.$store.state.currentTurn;
      },
      message: function(){
        return `Take your turn ${this.player.name}`
      },
      isMoveInProgress: function(){
        return this.$store.state.status === AUTOMA_MOVE;
      },
      isBuildInProgress: function(){
        return this.$store.state.status === AUTOMA_BUILD;
      },
      isAutomaFinaliseInProgress: function(){
        return this.$store.state.status === AUTOMA_FINALISE;
      },
      recruitBonuses: function() {
        const recruitBonus = this.player.getRecruitBonus();
        if(!recruitBonus.description)
          return [];
        const players = this.$store.getters.wrappedPlayers;
        const adjacentPlayers = [players[(this.player.id + players.length - 1) % players.length],
                                  players[(this.player.id + 1) % players.length]];
        return adjacentPlayers
                .filter(player => player.name)
                .filter((value, idx, self) => self.indexOf(value) === idx)
                .map(player => `${player.name} check for ${recruitBonus.description}`);
      }
    }),
  }
</script>

<style>
.automa-instructions{
  height:400px;
}
ul {
  width:100%;
  padding:0;
}
li.mdl-list__item {
  border-bottom: 1px solid grey;
}
</style>