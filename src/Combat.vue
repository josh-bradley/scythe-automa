<template lang="pug">
  div
    | Combat
    select(v-model='selectCombatantId')
      option(v-for="combatantId in combatants" :value="combatantId")
        | {{getCombatantDisplayName(combatantId)}}
    div(class='combat-card')
      PlayerCombat(:player='this.combatInitiate')
      PlayerCombat(v-if='this.opponent' :player='this.opponent')
    button(
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      v-if='isCombatInProgress' 
      @click='endCombat')
      | Finalise combat
    button(
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      v-if='this.opponent && isCombatInitiated' 
      @click='startCombat')
      | Start Combat

</template>

<script>
import { mapState } from 'vuex'
import { DEAL_COMBAT_CARD, PROGRESS_COMBAT } from './vuex/types'
import { COMBAT_INITIATED, COMBAT_INPROGRESS } from './vuex/gameStatus'
import * as deck from './deck'
import { isHuman } from './player'
import PlayerCombat from './PlayerCombat.vue'

export default {
  data: function() {
    return{
      selectCombatantId:null
    }
  },
  components: {
    PlayerCombat
  },
  methods:{
    startCombat: function(e) {
      e.preventDefault();
      this.$store.commit(PROGRESS_COMBAT, { opponentId: this.opponent.id });
      if(!this.isCombatInitiateHuman){
        let nextCardNumber = deck.getNextCardForPlayer(this.$store.state.players[this.$store.state.combatInitiate]);
        this.$store.commit(DEAL_COMBAT_CARD, { card:nextCardNumber, playerId:this.$store.state.combatInitiate});
      }
      if(!this.isOpponentHuman) {
        let opponentCardNumber = deck.getNextCardForPlayer(this.opponent);
        this.$store.commit(DEAL_COMBAT_CARD, { card:opponentCardNumber, playerId:this.selectCombatantId});
      }
    },
    endCombat: function(e) {
      e.preventDefault();
      this.$store.commit(PROGRESS_COMBAT);
    },
    getCombatantDisplayName: function(id){
      const player = this.$store.state.players[id];
      return player.name || player.faction;
    }
  },
  computed: mapState({
    isCombatInitiated () {
      return this.$store.state.status === COMBAT_INITIATED;
    },
    isCombatInProgress () {
      return this.$store.state.status === COMBAT_INPROGRESS;
    },
    combatInitiate () {
      return this.$store.state.players[this.$store.state.combatInitiate]
    },
    isCombatInitiateHuman () {
      return isHuman(this.combatInitiate);
    },
    opponent (){
      return this.$store.state.players[this.selectCombatantId];
    },
    isOpponentHuman (){
      return this.opponent && isHuman(this.opponent);
    },
    combatCardImage () {
      let dealtCards = this.$store.state.players[this.$store.state.combatInitiate].dealtCombatCards;
      let nextCardNumber = dealtCards.length > 0 ? dealtCards[dealtCards.length - 1] : '20';
      return `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
    },
    combatantCombatCardImage () {
      if(this.selectCombatantId === null)
        return './dist/20.png'
      let dealtCards = this.$store.state.players[this.selectCombatantId].dealtCombatCards;
      let nextCardNumber = dealtCards.length > 0 ? dealtCards[dealtCards.length - 1] : '20';
      return `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
    },
    combatants:function(){
      return this
              .$store
              .state
              .players
              .filter((player) => {
                return player.id !== this.$store.state.combatInitiate;
              })
              .map((player) =>{
                return player.id;
              })
    }
  })
}
</script>

