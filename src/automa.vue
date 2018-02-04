<template lang='pug'>
  div
    div(v-for="(player, index) in players") 
      AutomaPlayer(:playerId="index")
    div
      | Current turn {{currentTurn}}
    button(@click='dealNextCard')
      | Deal Card
</template>

<script>
  import png from './imageImport.js'
  import storeVuex from './vuex/store'
  import data from './assets/data.js'
  import * as types from './vuex/types'
  import AutomaPlayer from './AutomaPlayer.vue'
  import { mapState } from 'vuex'
  import * as deck from './deck'

  storeVuex.commit(types.ADD_PLAYER, { level:1, faction: data.factions[2].id });
  storeVuex.commit(types.ADD_PLAYER, { level:1, faction: data.factions[2].id });

  var dealtCards = [];

  export default {  
    store: storeVuex,
    components:{ 
      AutomaPlayer
    },
    computed: mapState([
      'players',
      'currentTurn'
    ]),
    methods: {
      dealNextCard: function(){
        let nextPlayerIndex = this.$store.state.currentTurn % this.$store.state.players.length;
        const player = this.$store.state.players[nextPlayerIndex];
        let nextCardNumber = deck.getNextCardForPlayer(player);
        this.$store.commit(types.DEAL_CARD, { card:nextCardNumber});
        let cardData = data.cards[nextCardNumber];
        this.image = `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      }
    },
  };
</script>