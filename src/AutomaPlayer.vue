<template lang='pug'>
  div
    img(width='200' :src='image')
    img(width='200' :src='starCard')
    img(width='200' :src='combatCardImage')
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
        | Deal combat card
</template>

<script>
  import data from './assets/data'
  import * as deck from './deck'
  import * as types from './vuex/types'
  export default {
    props: {
      playerId:{
        type: Number,
        required: true
      }
    },
    methods: {
      dealCombatCard: function(){
        let nextCardNumber = deck.getNextCardForPlayer(this.player);
        this.$store.commit(types.DEAL_COMBAT_CARD, { card:nextCardNumber, playerId:this.playerId});
      }
    },
    computed: {
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
      }
    },
  }
</script>