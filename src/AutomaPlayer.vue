<template lang='pug'>
  div
    img(width='200' :src='image')
    img(width='200' :src='starCard')
    div
      | Star card position: {{starCardPos}}
    div
      | Star count: {{starCount}}
</template>

<script>
  export default {
    data () {
      return {
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
        return this.$store.state.players[this.playerId].starCardPosition;
      },
      currentTurn () {
        return this.$store.state.currentTurn;
      },
      image () {
        let dealtCards = this.$store.state.players[this.playerId].dealtCards;
        let nextCardNumber = dealtCards.length > 0 ? dealtCards[dealtCards.length - 1] : '20';
        return `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      }
    },
  }
</script>