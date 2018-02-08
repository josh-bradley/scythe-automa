<template lang='pug'>
  div
    div(style="display:flex;justify-content:center")
      div
        | {{message}}
      div(v-for="automa in automas"
          class="automa-player"
          :class="{current: currentPlayer === automa}")
        AutomaPlayer(:playerId="automa.id")
    div
      | Current turn {{currentTurn}}
      button(@click='dealNextCard')
        | {{continueButtonText}}
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


  storeVuex.commit(types.ADD_PLAYER, { name:'Josh' });
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
    computed: mapState({
      'players':'players',
      'currentTurn':'currentTurn',
      currentPlayer: function(){
        return this.players[Math.max(this.currentTurn - 1, 0) % this.players.length];
      },
      automas: function(){
        return this.players.filter(player => player.level)
      },
      hasGameStarted: function(){
        return this.currentTurn > 0;
      },
      isHumanPlayer: function(){
        return this.currentPlayer.name;
      },
      message: function(){
        return !this.hasGameStarted ? 'Start game' : this.isHumanPlayer ? `Play card ${this.currentPlayer.name}` : 'Automas turn.'
      },
      continueButtonText: function(){
        return !this.hasGameStarted ? 'Start game' : this.currentPlayer.name !== undefined ? 'Finished turn' : 'Deal Automa Card';
      }
    }),
    methods: {
      dealNextCard: function(){
        let nextPlayerIndex = this.$store.state.currentTurn % this.$store.state.players.length;
        const player = this.$store.state.players[nextPlayerIndex];
        let nextCardNumber = player.name ? 0 : deck.getNextCardForPlayer(player);
        this.$store.commit(types.DEAL_CARD, { card:nextCardNumber});
      }
    },
  };
</script>