<template lang='pug'>
  div
    div
      ScoreBoard(:currentPlayerId='currentPlayer.id')
    button(@click='dealNextCard' v-if='!inCombat && !isMoveInProgress && !isBuildInProgress') {{continueButtonText}}
    button(@click='completeMove' v-if='isMoveInProgress') Complete Move
    button(@click='completeBuild' v-if='isBuildInProgress') Complete Deployment
    div(v-if='shouldLoadState')
        | Would you like to load your last game? 
        button(@click='loadSavedGame') Yes
        button(@click='resetGame') No
    div(style="display:flex;justify-content:center" v-if='$store.state.currentTurn > 0')
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
</template>

<script>
  import png from './imageImport.js'
  import storeVuex from './vuex/store'
  import data from './assets/data.js'
  import * as types from './vuex/types'
  import AutomaPlayer from './AutomaPlayer.vue'
  import Combat from './Combat.vue'
  import ScoreBoard from './ScoreBoard.vue'
  import { mapState } from 'vuex'
  import * as deck from './deck'
  import './styles/card.css'
  import { AUTOMA_MOVE, AUTOMA_BUILD, COMBAT_INITIATED, COMBAT_INPROGRESS } from './vuex/gameStatus'

  storeVuex.commit(types.ADD_PLAYER, { name:'Josh' });
  // storeVuex.commit(types.ADD_PLAYER, { level:1, faction: data.factions[1].id });
  // storeVuex.commit(types.ADD_PLAYER, { level:1, faction: data.factions[2].id });
  storeVuex.commit(types.ADD_PLAYER, { level:2, faction: data.factions[3].id });
  storeVuex.commit(types.ADD_PLAYER, { level:2, faction: data.factions[4].id });

  var dealtCards = [];

  export default {  
    store: storeVuex,
    components:{ 
      AutomaPlayer,
      Combat,
      ScoreBoard
    },
    computed: mapState({
      'shouldLoadState':'shouldLoadState',
      'players':'players',
      'currentTurn':'currentTurn',
      'status':'status',
      inCombat: function(){
        return this.status === COMBAT_INITIATED || this.status === COMBAT_INPROGRESS;
      },
      isMoveInProgress: function(){
        return this.status === AUTOMA_MOVE;
      },
      isBuildInProgress: function(){
        return this.status === AUTOMA_BUILD;
      },
      currentPlayer: function(){
        return this.players[Math.max(this.currentTurn -1, 0) % this.players.length];
      },
      hasGameStarted: function(){
        return this.currentTurn > 0;
      },
      continueButtonText: function(){
        return !this.hasGameStarted ? 'Start game' : this.currentPlayer.name !== undefined ? 'Finished turn' : 'Deal Automa Card';
      }
    }),
    methods: {  
      resetGame: function(e){
        e.preventDefault();
        storeVuex.commit(types.RESET_GAME);
      },
      loadSavedGame: function(e){
        e.preventDefault();
      },
      completeMove: function(e){
        e.preventDefault();
        storeVuex.commit(types.COMPLETE_MOVE)
      },
      completeBuild: function(e){
        e.preventDefault();
        storeVuex.commit(types.COMPLETE_BUILD)
      },
      dealNextCard: function(e){
        e.preventDefault();
        let nextPlayerIndex = this.$store.state.currentTurn % this.$store.state.players.length;
        const player = this.$store.state.players[nextPlayerIndex];
        let nextCardNumber = player.name ? 0 : deck.getNextCardForPlayer(player);
        console.log(nextCardNumber);
        this.$store.commit(types.DEAL_CARD, { card:nextCardNumber});
      }
    },
  };
</script>