<template lang='pug'>
  div(class='container-main')
    GameSetup(v-if='isGameSetup')
    LoadGame
    FinishedGame(v-if='isGameOver')
    ScoreBoard(
        v-if='isInGame || isGameOver'
        :currentPlayerId='currentPlayer.id')
    div(
      style="display:flex;justify-content:center;flex-grow:1")
      div(v-if="inCombat")
        Combat(@cancelCombat='cancelCurrentCombat')
      div(v-for="player in players"
          :key="player.id"
          v-if="!inCombat && isInGame"
          class="automa-player"
          :class="{current: currentPlayer === player}")
        AutomaPlayer(:player="player")
    button(
      v-if='canInitiateCombat'
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      @click='dealCombatCard')
        | Initiate combat
    button(
      @click='dealNextCard' 
      v-if='this.players.length > 1 && !inCombat && !isMoveInProgress && !isBuildInProgress && !savedState && !isGameOver'
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect") 
        | {{continueButtonText}}
    button(
      @click='completeGame'
      v-if='isGameOver'
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect")  Done
    button(
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      @click='completeMove' 
      v-if='isMoveInProgress') Complete Move
    button(
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      @click='completeBuild' 
      v-if='isBuildInProgress') Complete Deployment
    button(
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      @click='endGame' 
      v-if='isInGame'
      ) End Game
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
  import LoadGame from './LoadGame.vue'
  import GameSetup from './GameSetup.vue'
  import FinishedGame from './FinishedGame.vue'
  import { mapState } from 'vuex'
  import * as deck from './deck'
  import './styles/card.css'
  import { AUTOMA_MOVE, AUTOMA_BUILD, COMBAT_INITIATED, COMBAT_INPROGRESS, GAME_SETUP, GAME_FINISHED } from './vuex/gameStatus'
  import * as playerMethods from './player'
  import historyMixin from './vuex/historyMixin'

  export default {  
    mixins:[historyMixin],
    store: storeVuex,
    components:{ 
      AutomaPlayer,
      Combat,
      ScoreBoard,
      LoadGame,
      GameSetup,
      FinishedGame
    },
    computed: mapState({
      'savedState':'savedState',
      'currentTurn':'currentTurn',
      'status':'status',
      players: function() {
        return this.$store.getters.wrappedPlayers;
      },
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
        return this.$store.getters.currentPlayer;
      },
      hasGameStarted: function(){
        return this.currentTurn > 0;
      },
      continueButtonText: function(){
        return !this.hasGameStarted ? 'Start game' : this.currentPlayer.name !== undefined ? 'Finished turn' : 'Deal Automa Card';
      },
      canInitiateCombat () {
        return !this.isGameOver && !this.inCombat && this.hasGameStarted && (this.currentPlayer.name ||
                (this.$store.state.status === AUTOMA_MOVE &&
                  this.currentPlayer.getCurrentMoveOptions().filter(move => move.type === "attack").length > 0));
      },
      isGameSetup () {
        return !this.savedState && this.currentTurn === 0;
      },
      isInGame () {
        return this.currentTurn > 0 && !this.isGameOver;
      },
      isGameOver () {
        return this.status === GAME_FINISHED;
      }
    }),
    methods: {
      dealCombatCard: function(e){
        e.preventDefault();
        this.$store.commit(types.PROGRESS_COMBAT, { playerId: this.currentPlayer.id});
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
        this.$store.commit(types.START_GAME);
        let nextPlayerIndex = this.currentTurn % this.players.length;
        const player = this.players[nextPlayerIndex];
        let nextCardNumber = player.name ? 0 : deck.getNextCardForPlayer(player);
        this.$store.commit(types.DEAL_CARD, { card:nextCardNumber});
      },
      completeGame: function(e) {
        e.preventDefault();
        this.$store.commit(types.RESET_GAME);
      },
      endGame: function(e) {
        e.preventDefault();
        this.$store.commit(types.END_GAME);
      }
    },
  };
</script>

<style>
  .container-main {
    text-align: center;
    height:100%;
    display:flex;
    flex-direction: column;
  }

  .automa-player.current {
    display:flex;
    width:100%;
  }

  .automa-player.current div {
    width:100%;
  }
</style>
