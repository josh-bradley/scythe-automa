<template lang='pug'>
  div
    div(v-for="(player, index) in players" style="display:inline-block; margin:0 20px") 
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
  import './styles/card.css'

  storeVuex.commit(types.ADD_PLAYER, { level:3, faction: data.factions[1].id });
  storeVuex.commit(types.ADD_PLAYER, { level:3, faction: data.factions[2].id });
  storeVuex.commit(types.ADD_PLAYER, { level:3, faction: data.factions[3].id });
  storeVuex.commit(types.ADD_PLAYER, { level:3, faction: data.factions[4].id });

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
      }
    },
  };
</script>