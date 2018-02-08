<template lang="pug">
  div
    | Combat
    select(v-model='selectCombatantId')
      option(v-for="combatantId in combatants" :value="combatantId")
        | {{getCombatantDisplayName(combatantId)}}
    div(style='display:inline-block' class='combat-card')
      img(
        width='200' 
        :src='combatCardImage')
      img(
        width='200' 
        :src='combatantCombatCardImage')
    button(@click='startCombat')
      | Start Combat

</template>

<script>
import { mapState } from 'vuex'
import { DEAL_COMBAT_CARD, PROGRESS_COMBAT } from './vuex/types'
import * as deck from './deck'

export default {
  data: function() {
    return{
      selectCombatantId:null
    }
  },
  methods:{
    startCombat: function() {
      this.$store.commit(PROGRESS_COMBAT);
      let nextCardNumber = deck.getNextCardForPlayer(this.$store.state.players[this.$store.state.combatInitiate]);
      this.$store.commit(DEAL_COMBAT_CARD, { card:nextCardNumber, playerId:this.$store.state.combatInitiate});
      let combatantCardNumber = deck.getNextCardForPlayer(this.$store.state.players[this.selectCombatantId]);
      this.$store.commit(DEAL_COMBAT_CARD, { card:combatantCardNumber, playerId:this.selectCombatantId});
    },
    getCombatantDisplayName: function(id){
      const player = this.$store.state.players[id];
      return player.name || player.faction;
    }
  },
  computed: mapState({
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

