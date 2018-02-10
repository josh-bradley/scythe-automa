<template lang='pug'>
  div
    div(v-if='player.name')
      | {{message}}
    div(v-if='player.name === undefined')
      img(
        width='400' 
        :src='image' 
        style='margin-right:10px' 
        v-bind:class='{"scheme-two":!isSchemeOne}')
      div
        | {{factionName}}
      div
        | Star card position: {{player.starCardPosition}}
      div
        | Star count: {{player.stars}}
      div 
        | Power: {{player.power}}
      div
        | Coins: {{player.coins}}
    div
      button(@click='dealCombatCard')
        | Initiate combat
</template>

<script>
  import data from './assets/data'
  import * as deck from './deck'
  import * as types from './vuex/types'
  import { mapState } from 'vuex'

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
        return this.$store.state.players[this.playerId];
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
      }
    }),
  }
</script>