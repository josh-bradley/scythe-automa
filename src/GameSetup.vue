<template lang="pug">
  div
    h3 Players
    div(v-for='player in players') {{player.name||player.faction}}
    div
      label Add human player:
      input(type='text' v-model='playerName')
      button(@click='addHumanPlayer') Add
    div
      label Add automa:
      select(v-model='selectedFactionId')
        option(v-for='faction in factions' :value='faction.id') {{faction.name}}
      label Level:
      input(type='number' v-model='automaLevel' min='1' max='4')
      button(@click='addPlayer') Add
</template>

<script>
import { ADD_PLAYER, START_GAME } from './vuex/types'
import data from './assets/data'
import { mapState } from 'vuex'

export default {
  data: function (){
    return {
      selectedFactionId:null,
      automaLevel:1,
      playerName:''
    }
  },
  methods: {
    addPlayer: function(){
      this.$store.commit(ADD_PLAYER, {
        faction:this.selectedFactionId,
        level:this.automaLevel
      });
    },
    addHumanPlayer: function(){
      this.$store.commit(ADD_PLAYER, {
        name:this.playerName
      });
      this.playerName = '';
    }
  },
  computed: mapState({
    players:'players',
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
  })
}
</script>
