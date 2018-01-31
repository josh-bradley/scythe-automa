<template lang='pug'>
  div
    AutomaPlayer(:playerId=0)
</template>

<script>
  import png from './imageImport.js'
  import storeVuex from './vuex/store'
  import * as types from './vuex/types'
  import AutomaPlayer from './AutomaPlayer.vue'

  storeVuex.commit(types.ADD_PLAYER, { level:1 });

  var dealtCards = [];

  export default {  
    store: storeVuex,
    components:{ 
      AutomaPlayer
    }
  };
</script>