<template lang='pug'>
  div
    img(width='200' :src='image' @click='dealNextCard')
    img(width='200' :src='starCard' @click='dealNextCard')
    div
      | Current game turn: {{currentTurn}}
    div
      | Star card position: {{starCardPos}}
    div
      | Star count: {{starCount}}
    div
      | {{image}}
</template>

<script>
  import data from './assets/data.js'
  import * as types from './vuex/types'
  function getRandomInt() {
      var min = 1;
      var max = 20;
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  export default {
    data () {
      return {
        image: './dist/20.png',
        starCard:'./dist/StarCard0.png',
        starCount:0,
        starCardId:0,
      }
    },
    props: {
      playerId:{
        type: Number,
        required: true
      }
    },
    computed: {
      starCardPos () {
        return this.$store.state.players[0].starCardPosition;
      },
      currentTurn () {
        return this.$store.state.currentTurn;
      }
    },
    methods: {
      dealNextCard: function(){
        var nextCardNumber = 0;
        const player = this.$store.state.players[0];
        console.log('dealing cards')
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
  }
</script>