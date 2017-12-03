function getRandomInt() {
  var min = 1;
  var max = 19;
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var app = new Vue ({
  el:'#app',
  data: {
    image: './images/cards/20.png'
  },
  methods: {
    dealNextCard: function(){
      var nextCardNumber = getRandomInt().toString().padStart(2, '0');
      this.image = `./images/cards/${nextCardNumber}.png`
    }
  }
});