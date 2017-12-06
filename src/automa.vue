<template lang='pug'>
  img(width='200' :src='image' @click='dealNextCard')
</template>

<script>
  import png from './imageImport.js'
  import data from './assets/data.js'

  function getRandomInt() {
    var min = 1;
    var max = 19;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  var dealtCards = [];

  export default {  
    data () { return {
        image: './dist/20.png'
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
        
        this.image = `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      }
    }
  };
</script>