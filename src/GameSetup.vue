<template lang="pug">
  div
    div
      select(v-model='selectedFactionId')
        option(v-for='faction in factions' :value='faction.id') {{faction.name}}
    button(@click='addPlayer') Add
</template>

<script>
import { ADD_PLAYER, START_GAME } from './vuex/types'
import data from './assets/data'

export default {
  data: function (){
    return {
      selectedFactionId:null,
    }
  },
  methods: {
    addPlayer: function(){
      this.$store.commit(ADD_PLAYER, { faction:this.selectedFactionId, level:1 });
    }
  },
  computed: {
    factions: function(){
      return data
              .factions
              .slice(0,5)
              .filter(x => !this
                            .$store
                            .state
                            .players
                            .find(player=> player.faction === x.id));
    }
  }
}
</script>
