<template lang="pug">
  div(style='margin:0 auto')
    h3 Game setup
    div(class='add-player-section')
      h4 Add player
      div
        div
          label(class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='option-1')
            input(type='radio' id='option-1' class='mdl-radio__button' name='options' value='1' v-model='playerType')
            span(class='mdl-radio__label') Human
          label(class='mdl-radio mdl-js-radio mdl-js-ripple-effect' for='option-2')
            input(type='radio' id='option-2' class='mdl-radio__button' name='options' value='2' v-model='playerType')
            span(class='mdl-radio__label') Automa
        div(
          v-show='playerType == 1'
          style='width:200px'
          class='mdl-textfield mdl-js-textfield mdl-textfield--floating-label person-name')
          input(
            id='humanPlayerName'
            class='mdl-textfield__input'
            type='text' v-model='playerName')
          label(
            class='mdl-textfield__label'
            for='humanPlayerName'
          ) Name
      div(v-show='playerType == 2')
        div(class="mdl-textfield mdl-js-textfield getmdl-select" style='width:200px')
          input(type="text" value='' class="mdl-textfield__input" id="automaLevel" readonly)
          input(type="hidden" id='selectedAutomaLevel'  name="automaLevel")
          i(class="mdl-icon-toggle__label material-icons") keyboard_arrow_down
          label(for="automaLevel" class="mdl-textfield__label") Automa Level
          ul(for="automaLevel" class="mdl-menu mdl-menu--bottom-left mdl-js-menu")
            li(v-for='automaLevel in automaLevels' :data-val='automaLevel.level' class="mdl-menu__item") {{automaLevel.name}}
      div
        div(class="mdl-textfield mdl-js-textfield getmdl-select" style='width:200px')
          input(type="text" value='' class="mdl-textfield__input" id="sample2" readonly)
          input(type="hidden" id='selectedFaction'  name="sample2")
          i(class="mdl-icon-toggle__label material-icons") keyboard_arrow_down
          label(for="sample2" class="mdl-textfield__label") Faction
          ul(for="sample2" class="mdl-menu mdl-menu--bottom-left mdl-js-menu")
            li(v-for='faction in factions' :data-val='faction.id' class="mdl-menu__item") {{faction.name}}
      button(
        class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
        @click='addPlayer') Add
    div(v-for='player in players') {{player.name||player.factionName}}
</template>

<script>
import { ADD_PLAYER, START_GAME } from './vuex/types'
import data from './assets/data'
import { mapState } from 'vuex'

export default {
  data: function (){
    return {
      playerType:'1',
      automaLevel:'',
      playerName:'',
      automaLevels: data
              .automaLevels
              .slice(0,4)
    }
  },
  methods: {
    addPlayer: function(){
      if(this.playerType == 1) {
        this.addHumanPlayer()
      } else {
        this.addAutomaPlayer();
      }
    },
    addAutomaPlayer: function(){
      this.$store.commit(ADD_PLAYER, {
        faction: document.getElementById('selectedFaction').value,
        level: document.getElementById('selectedAutomaLevel').value
      });
    },
    addHumanPlayer: function(){
      this.$store.commit(ADD_PLAYER, {
        faction: document.getElementById('selectedFaction').value,
        name:this.playerName
      });
      this.playerName = '';
    },
    resetSelects: function(){
      window &&
        window.getmdlSelect &&
        window.getmdlSelect.init &&
        window.getmdlSelect.init('.getmdl-select');
    }
  },
  computed: mapState({
    players: function() {
      return this.$store.getters.wrappedPlayers;
    },
    factions: function(){
      const factions = data
              .factions
              .slice(0,5)
              .filter(x => !this
                            .$store
                            .state
                            .players
                            .find(player=> player.faction === x.id));
      this.resetSelects();
      return factions;
    }
  }),
  mounted: function (){
    window.MaterialTextfield && new window.MaterialTextfield(document.querySelector('.person-name'));
    this.resetSelects();
  }
}
</script>

<style>
  h4 {
    color: hsl(0, 0%, 45%);
    font-size:1.4em;
  }

  .add-player-section{
    padding:5px 0 55px 0;
    background-color:hsl(0, 0%, 97%);
    max-width:600px;
    min-width:320px;
    border-radius: 10px;
    margin-top:10px;
  }

  .add-player-section button {
    float:right;
    margin-right:20px;
    margin-bottom:20px;
  }
</style>