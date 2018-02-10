<template lang="pug">
  div
    | Score Board
    div(v-for='automa in automas')
      | {{automa.faction}} has {{automa.power}}
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

