<template lang='pug'>
  div
    | {{currentTurn}}
    div(v-for="(player, index) in players") 
      AutomaPlayer(:playerId="index")
    div
      | Current turn {{currentTurn}}
    button(@click='dealNextCard')
      | Deal Card
</template>

<script>
  import png from './imageImport.js'
  import storeVuex from './vuex/store'
  import data from './assets/data.js'
  import * as types from './vuex/types'
  import AutomaPlayer from './AutomaPlayer.vue'
  import { mapState } from 'vuex'

  function getRandomInt() {
      var min = 1;
      var max = 20;
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

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
    ]),
    methods: {
      dealNextCard: function(){
        var nextCardNumber = 0;
        let nextPlayerIndex = this.$store.state.currentTurn % this.$store.state.players.length;
        const player = this.$store.state.players[nextPlayerIndex];
        while(nextCardNumber === 0) {
          var cardNumber = getRandomInt();
          if(player.dealtCards.length >= 19 || !player.dealtCards.some(x => x === cardNumber)){
            nextCardNumber = cardNumber;
          }
        }
        this.$store.commit(types.DEAL_CARD, { card:nextCardNumber});
        var cardData = data.cards[nextCardNumber];
        this.image = `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      }
    },
  };
</script>