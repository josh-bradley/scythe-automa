<template lang='pug'>
  div.automa-player
    | Player star position {{store.getState().players[playerId].starCardPosition}}
</template>

<script>
export default {
  props: {
    store: {
      type:Object,
      required:true
    },
    playerId:{
      type: Number,
      required: true
    }
  }
}
</script>