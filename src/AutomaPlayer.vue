<template lang='pug'>
  div
    div(v-if='player.name')
      | {{message}}
    div(v-if='canInitiateCombat')
      button(@click='dealCombatCard')
        | Initiate combat
    div(v-if='player.name === undefined')
      div(v-if='isMoveInProgress' v-for='moveOption in player.getCurrentMoveOptions()') {{moveOption.description}}
      div(v-if='isBuildInProgress' v-for='buildItem in player.getBuildList()') {{buildItem}}  
      img(
        width='400' 
        :src='image' 
        style='margin-right:10px' 
        v-bind:class='{"scheme-two":!isSchemeOne}')
      div
        | {{factionName}}
</template>

<script>
  import data from './assets/data'
  import * as deck from './deck'
  import * as types from './vuex/types'
  import { mapState } from 'vuex'
  import * as playerMethods from './player'
  import { AUTOMA_MOVE, AUTOMA_BUILD } from './vuex/gameStatus'

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
        console.log(`player ${this.playerId} is starting a fight`)
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
      }
    }),
  }
</script>