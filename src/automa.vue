<template lang='pug'>
  div
    | {{currentTurn}}
    div(v-for="(player, index) in players") 
      AutomaPlayer(:playerId="index")
</template>

<script>
  import png from './imageImport.js'
  import storeVuex from './vuex/store'
  import * as types from './vuex/types'
  import AutomaPlayer from './AutomaPlayer.vue'
  import { mapState } from 'vuex'

  storeVuex.commit(types.ADD_PLAYER, { level:1 });
  storeVuex.commit(types.ADD_PLAYER, { level:1 });

  var dealtCards = [];

  export default {  
    store: storeVuex,
    components:{ 
      AutomaPlayer
    },
    computed: mapState([
      'players',
      'currentTurn'
    ])
  };
</script>