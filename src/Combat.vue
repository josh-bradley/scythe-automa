<template lang="pug">
  div
    | Combat
    select(v-model='selectCombatantId')
      option(v-for="combatantId in combatants" :value="combatantId")
        | {{getCombatantDisplayName(combatantId)}}
    div(style='display:inline-block' class='combat-card')
      img(
        v-if='!isCombatInitiateHuman'
        width='200' 
        :src='combatCardImage')
      img(
        v-if='!isOpponentHuman'
        width='200' 
        :src='combatantCombatCardImage')
    button(@click='startCombat')
      | Start Combat

</template>

<script>
import { mapState } from 'vuex'
import { DEAL_COMBAT_CARD, PROGRESS_COMBAT } from './vuex/types'
import * as deck from './deck'
import { isHuman } from './player'

export default {
  data: function() {
    return{
      selectCombatantId:null
    }
  },
  methods:{
    startCombat: function() {
      this.$store.commit(PROGRESS_COMBAT);
      if(!this.isCombatInitiateHuman){
        let nextCardNumber = deck.getNextCardForPlayer(this.$store.state.players[this.$store.state.combatInitiate]);
        this.$store.commit(DEAL_COMBAT_CARD, { card:nextCardNumber, playerId:this.$store.state.combatInitiate});
      }
      if(!this.isOpponentHuman) {
        let opponentCardNumber = deck.getNextCardForPlayer(this.opponent);
        this.$store.commit(DEAL_COMBAT_CARD, { card:opponentCardNumber, playerId:this.selectCombatantId});
      }
    },
    getCombatantDisplayName: function(id){
      const player = this.$store.state.players[id];
      return player.name || player.faction;
    }
  },
  computed: mapState({
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
      console.log("totally updating the combatants combat card.")
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

