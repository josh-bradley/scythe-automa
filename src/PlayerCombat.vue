<template lang='pug'>
  div(v-if='!isHuman && isCombatInProgress')  
    | {{player.faction}} has {{combatPoints}} and plays {{powerCards}}. Card id: {{combatCard ? combatCard.id : 'null'}}
</template>

<script>
import data from './assets/data'
import { currentCombatCard } from './player'
import { mapState } from 'vuex'
import { COMBAT_INPROGRESS } from './vuex/gameStatus'
export default {
  props: {
    player: {
      type:Object,
      required:true
    }
  },
  computed: mapState({
      isHuman () {
        return this.player.name;
      },
      isCombatInProgress () {
        return this.$store.state.status === COMBAT_INPROGRESS;
      },
      combatCard () {
        if(!this.player || !this.player.dealtCombatCards.length || !this.isCombatInProgress)
          return null
        return data.cards[currentCombatCard(this.player)]
      },
      combatPoints () {
        const combatPos = this.player.power < 8 ? 0 : this.player.power < 14 ? 1 : 0; 
        return this.combatCard ? this.combatCard.combatPoints[combatPos] : 0;
      },
      powerCards () {
        return this.combatCard ? this.combatCard.combartCards : 0;
      }
    }
  )
}
</script>

<style>

</style>
