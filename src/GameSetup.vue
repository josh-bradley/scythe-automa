<template lang="pug">
  div
    h3 Game setup
    div(class='add-player-section')
      h4 Add human player
      div(
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
      button(
        class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
        @click='addHumanPlayer') Add
    div(class='add-player-section')
      h4 Add Automa
      div(class="mdl-textfield mdl-js-textfield getmdl-select" style='width:200px')
        input(type="text" value='' v-model='selectedFactionId' class="mdl-textfield__input" id="sample2" readonly)
        input(type="hidden" v-model='selectedFactionId' id='selectedFaction'  name="sample2")
        i(class="mdl-icon-toggle__label material-icons") keyboard_arrow_down
        label(for="sample2" class="mdl-textfield__label") Faction
        ul(for="sample2" class="mdl-menu mdl-menu--bottom-left mdl-js-menu")
          li(v-for='faction in factions' :data-val='faction.id' class="mdl-menu__item") {{faction.name}}
      div
        div(class="mdl-textfield mdl-js-textfield getmdl-select" style='width:200px')
          input(type="text" value='' v-model='selectedAutomaLevel' class="mdl-textfield__input" id="automaLevelSelect" readonly)
          input(type="hidden" v-model='selectedAutomaLevel' id='selectedAutomaLevel'  name="automaLevelSelect")
          i(class="mdl-icon-toggle__label material-icons") keyboard_arrow_down
          label(for="automaLevelSelect" class="mdl-textfield__label") Automa level
          ul(for="automaLevelSelect" class="mdl-menu mdl-menu--bottom-left mdl-js-menu")
            li(v-for='automaLevel in automaLevels' :data-val='automaLevel.level' class="mdl-menu__item") {{automaLevel.name}}
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
      selectedFactionId:null,
      selectedAutomaLevel:null,
      automaLevel:'',
      playerName:''
    }
  },
  methods: {
    addPlayer: function(){
      this.$store.commit(ADD_PLAYER, {
        faction: document.getElementById('selectedFaction').value,//this.selectedFactionId,
        level: document.getElementById('selectedAutomaLevel').value
      });
    },
    addHumanPlayer: function(){
      this.$store.commit(ADD_PLAYER, {
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
      this.selectedFactionId = '';
      this.resetSelects();
      return factions;
    },
    automaLevels: function(){
      const factions = data
              .automaLevels
              .slice(0,4);
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
    color: hsl(0, 0%, 45%)
  }

  .add-player-section{
    padding-top:70px;
  }
</style>