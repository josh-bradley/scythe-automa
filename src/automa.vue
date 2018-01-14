<template lang='pug'>
  div
    img(width='200' :src='image' @click='dealNextCard')
    img(width='200' :src='starCard' @click='dealNextCard')
    div
        Current game turn: {{currentTurn}}
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
  import reducer from './redux/reducers/index'
  import { dealCard, addPlayer } from './redux/actions/index'

  const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  store.dispatch(addPlayer(1))

  function getRandomInt() {
    var min = 1;
    var max = 20;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  var dealtCards = [];

  export default {  
    data () {
      return {
        image: './dist/20.png',
        starCard:'./dist/StarCard0.png',
        currentTurn:0,
        starCount:0,
        starCardId:0,
        starCardPos:0
      }
    },
    created: function(){
      let handleChange = (() => {
        const state = store.getState();
        this.currentTurn = state.currentTurn;
        this.starCardPos = state.players[0].starCardPosition;
      }).bind(this)
      store.subscribe(handleChange)
    },
    methods: {
      dealNextCard: function(){
        var nextCardNumber = 0;
        const player = store.getState().players[0];
        console.log('dealing cards')
        while(nextCardNumber === 0) {
          var cardNumber = getRandomInt();
          if(player.dealtCards.length >= 19 || !player.dealtCards.some(x => x === cardNumber)){
            nextCardNumber = cardNumber;
          }
        }
        store.dispatch(dealCard(0, nextCardNumber));
        var cardData = data.cards[nextCardNumber];
        this.image = `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      }
    }
  };
</script>