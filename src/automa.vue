<template lang='pug'>
  div
    img(width='200' :src='image' @click='dealNextCard')
    img(width='200' :src='starCard' @click='dealNextCard')
    div
      | Star card position: {{starCardPos}}
    div
      | Star count: {{starCount}}
    div
      | {{image}}
</template>

<script>
  import png from './imageImport.js'
  import data from './assets/data.js'
  import { createStore } from 'redux'

  function getRandomInt() {
    var min = 1;
    var max = 19;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  var dealtCards = [];

  export default {  
    data () { return {
        image: './dist/20.png',
        starCard:'./dist/StarCard0.png',
        starCount:0,
        starCardId:0,
        starCardPos:0
      }
    },
    methods: {
      dealNextCard: function(){
        var nextCardNumber = 0;
        if(dealtCards.length === 19) {
          nextCardNumber = 20;
          dealtCards = [];
        }

        while(nextCardNumber === 0) {
          var cardNumber = getRandomInt();
          if(!dealtCards.some(x => { x === cardNumber})){
            dealtCards.push(nextCardNumber);
            nextCardNumber = cardNumber;
          }
        }
        var cardData = data.cards[nextCardNumber];
        if(cardData && cardData.star) {
          this.starCardPos++;
        }
        this.image = `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      }
    }
  };
</script>