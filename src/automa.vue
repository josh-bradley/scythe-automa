<template lang='pug'>
  div
    div(style="display:flex;justify-content:center")
      div(v-if="inCombat")
        Combat
      div(v-for="player in players"
          v-if="!inCombat"
          class="automa-player"
          :class="{current: currentPlayer === player}")
        AutomaPlayer(:playerId="player.id")
    div
      | Current turn {{currentTurn}}
      | {{status}}
      button(@click='dealNextCard')
        | {{continueButtonText}}
</template>

<script>
  import png from './imageImport.js'
  import storeVuex from './vuex/store'
  import data from './assets/data.js'
  import * as types from './vuex/types'
  import AutomaPlayer from './AutomaPlayer.vue'
  import Combat from './Combat.vue'
  import { mapState } from 'vuex'
  import * as deck from './deck'
  import './styles/card.css'
  import { COMBAT_INITIATED, COMBAT_INPROGRESS } from './vuex/gameStatus'


  storeVuex.commit(types.ADD_PLAYER, { name:'Josh' });
  storeVuex.commit(types.ADD_PLAYER, { level:3, faction: data.factions[1].id });
  storeVuex.commit(types.ADD_PLAYER, { level:3, faction: data.factions[2].id });
  storeVuex.commit(types.ADD_PLAYER, { level:3, faction: data.factions[3].id });
  storeVuex.commit(types.ADD_PLAYER, { level:3, faction: data.factions[4].id });

  var dealtCards = [];

  export default {  
    store: storeVuex,
    components:{ 
      AutomaPlayer,
      Combat
    },
    computed: mapState({
      'players':'players',
      'currentTurn':'currentTurn',
      'status':'status',
      inCombat: function(){
        return this.status === COMBAT_INITIATED || this.status === COMBAT_INPROGRESS;
      },
      currentPlayer: function(){
        return this.players[this.currentTurn % this.players.length];
      },
      hasGameStarted: function(){
        return this.currentTurn > 0;
      },
      isHumanPlayer: function(){
        return this.currentPlayer.name;
      },
      continueButtonText: function(){
        return !this.hasGameStarted ? 'Start game' : this.currentPlayer.name !== undefined ? 'Finished turn' : 'Deal Automa Card';
      }
    }),
    methods: {  
      dealNextCard: function(){
        console.log('go')
        let nextPlayerIndex = this.$store.state.currentTurn % this.$store.state.players.length;
        const player = this.$store.state.players[nextPlayerIndex];
        let nextCardNumber = player.name ? 0 : deck.getNextCardForPlayer(player);
        this.$store.commit(types.DEAL_CARD, { card:nextCardNumber});
      }
    },
  };
</script>