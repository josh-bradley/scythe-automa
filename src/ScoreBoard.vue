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
      tr(v-for='automa in automas')
        td {{automa.faction}} 
        td {{automa.power}} 
        td {{automa.stars}} 
        td {{automa.coins}}
        td {{automa.starCardPosition}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    'players':'players',
    automas: function() {
      return this.players.filter(player => !player.name)
    }
  })
}
</script>

