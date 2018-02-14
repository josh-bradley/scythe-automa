<template lang='pug'>
  div(style='flex;flex-direction:column;')
    div(v-if='player.name')
      | {{message}}
    div(v-if='player.name === undefined' class='automa-instructions')
      ul
        li(class='mdl-list__item' v-if='isMoveInProgress' v-for='moveOption in player.getCurrentMoveOptions()') {{moveOption.description}}
        li(class='mdl-list__item' v-if='isBuildInProgress' v-for='buildItem in player.getBuildList()') {{buildItem}}  
        li(class='mdl-list__item' v-if='isAutomaFinaliseInProgress' v-for='recruitBonus in recruitBonuses') {{recruitBonus}}
        div(v-if='canInitiateCombat')
    button(
      style='flex-grow:1'
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      @click='dealCombatCard')
        | Initiate combat
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
      playerId:{
        type: Number,
        required: true
      }
    },
    methods: {
      dealCombatCard: function(e){
        e.preventDefault();
        this.$store.commit(types.PROGRESS_COMBAT, { playerId: this.playerId});
      }
    },
    computed: mapState({
      canInitiateCombat () {
        return this.player.name ||
                (this.$store.state.status === AUTOMA_MOVE &&
                  this.player.getCurrentMoveOptions().filter(move => move.type === "attack").length > 0);
      },
      currentTurn () {
        return this.$store.state.currentTurn;
      },
      image () {
        let dealtCards = this.$store.state.players[this.playerId].dealtCards;
        let nextCardNumber = dealtCards.length > 0 ? dealtCards[dealtCards.length - 1] : '20';
        return `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      },
      combatCardImage () {
        let dealtCards = this.$store.state.players[this.playerId].dealtCombatCards;
        let nextCardNumber = dealtCards.length > 0 ? dealtCards[dealtCards.length - 1] : '20';
        return `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      },
      player () {
        return Object.assign(this.$store.state.players[this.playerId], playerMethods);
      },
      starCard () {
        return `./dist/StarCard${this.$store.state.players[this.playerId].level - 1}.png`;
      },
      factionName () {
        return data.factions.filter(x => this.player.faction === x.id)[0].name;
      },
      isSchemeOne () {
        const starCard = data.starCards[this.player.level];
        return starCard.schemePosition > this.player.starCardPosition;
      },
      message: function(){
        return `Play card ${this.player.name}`
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
        const players = this.$store.state.players;
        const adjacentPlayers = [players[(this.playerId + players.length - 1) % players.length],
                                  players[(this.playerId + 1) % players.length]];
        return adjacentPlayers.map(player => player.name ? `${player.name} check for ${recruitBonus.description}`:'');
      }
    }),
  }
</script>

<style>
.automa-instructions{
  height:400px;
}
ul {
  padding:0;
}
li.mdl-list__item {
  display:inline-block;
}
</style>