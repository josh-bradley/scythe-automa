import Vue from 'vue'
import automa from './automa.vue'

var app = new Vue ({
  el:'#app',
  render: h => h(automa)
});