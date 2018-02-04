<template lang='pug'>
  div
    img(width='200' :src='image')
    img(width='200' :src='starCard')
    div
      | {{factionName}}
    div
      | Star card position: {{player.starCardPosition}}
    div
      | Star count: {{player.stars}}
    div 
      | Power: {{player.power}}
</template>

<script>
  import data from './assets/data'
  export default {
    props: {
      playerId:{
        type: Number,
        required: true
      }
    },
    computed: {
      currentTurn () {
        return this.$store.state.currentTurn;
      },
      image () {
        let dealtCards = this.$store.state.players[this.playerId].dealtCards;
        let nextCardNumber = dealtCards.length > 0 ? dealtCards[dealtCards.length - 1] : '20';
        return `./dist/${nextCardNumber.toString().padStart(2, '0')}.png`
      },
      player () {
        return this.$store.state.players[this.playerId];
      },
      starCard () {
        return `./dist/StarCard${this.$store.state.players[this.playerId].level - 1}.png`;
      },
      factionName () {
        return data.factions.filter(x => this.player.faction === x.id)[0].name;
      }
    },
  }
</script>