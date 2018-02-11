<template lang="pug">
  div
    div(class='automa-summary-title') star/power/coins
    div(class='automa-summary')
      div(v-for='automa in automas' v-bind:class='automa.faction')
        | {{automa.stars}}/{{automa.power}}/{{automa.coins}}
</template>

<script>
import { mapState } from 'vuex'
import { canCrossRiver } from './player'
export default {
  props:{
    currentPlayerId:{
      type:Number
    }
  },
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

<style>
  .current-player{
    font-weight: bold;
  }

  .automa-summary {
    display:flex;
    justify-content: space-around
  }

  .automa-summary > div {
    height:60px;
    line-height:60px;
    flex-grow: 1;
    text-align:center;
    font-size:1.5em;
  }

  .automa-summary > .Crimean {
    background-color:#B4AA40;
  }

  .automa-summary > .Rusviet {
    background-color:#B52E24;
  }

  .automa-summary > .Saxony {
    background-color:black;
    color:white;
  }

  .automa-summary > .Nordic {
    color:white;
    background-color:#013F70;
  }

  .automa-summary-title {
    text-align:center;
    font-size:1.5em;
  }
</style>
