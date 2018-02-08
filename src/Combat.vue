<template lang="pug">
  div
    | Combat
    select
      option(v-for="combatant in combatants")
        | {{combatant}}
    div(style='display:inline-block' class='combat-card')
      img(
        width='200' 
        :src='combatCardImage')  
    button(@click='startCombat')
      | Start Combat

</template>

<script>
import { mapState } from 'vuex'

export default {
  methods:{
    startCombat: function() {
      
    }
  },
  computed: mapState({
    combatCardImage () {
        // let dealtCards = this.$store.state.players[this.playerId].dealtCombatCards;
        // let nextCardNumber = dealtCards.length > 0 ? dealtCards[dealtCards.length - 1] : '20';
        // return `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
        return `./dist/20.png`
        
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
                return player.name || player.faction;
              })
    }
  })
}
</script>

