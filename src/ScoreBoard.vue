<template lang="pug">
  div
    | Score Board
    table
      thead
        th Faction
        th Power
        th Stars
        th Coins
        th Position
        th Cross River
      tr(v-for='automa in automas')
        td {{automa.faction}} 
        td {{automa.power}} 
        td {{automa.stars}} 
        td {{automa.coins}}
        td {{automa.starCardPosition}}
        td {{canAutomaCrossRiver(automa)}}
</template>

<script>
import { mapState } from 'vuex'
import { canCrossRiver } from './player'
export default {
  data () {
    return { canAutomaCrossRiver: (automa) => {
        return canCrossRiver(automa);
      }
    }
  },
  computed: mapState({
    'players':'players',
    automas: function() {
      return this.players.filter(player => !player.name)
    }
  })
}
</script>

