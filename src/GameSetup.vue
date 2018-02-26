<template lang="pug">
  div
    h3 Players
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
      ) Add human player
    button(
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
      @click='addHumanPlayer') Add
    div(
      style='width:200px'
      class='mdl-textfield mdl-js-textfield getmdl-select')
      label(
        class='mdl-textfield__label'
        for='factionSelect'
      ) Add automa: {{selectedFactionId}}
      div(class="mdl-textfield mdl-js-textfield getmdl-select")
        input(type="text" value='' v-model='selectedFactionId' class="mdl-textfield__input" id="sample2" readonly)
        input(type="hidden" v-model='selectedFactionId' id='selectedFaction'  name="sample2")
        i(class="mdl-icon-toggle__label material-icons") keyboard_arrow_down
        label(for="sample2" class="mdl-textfield__label") Faction
        ul(for="sample2" class="mdl-menu mdl-menu--bottom-left mdl-js-menu")
          li(v-for='faction in factions' :data-val='faction.id' class="mdl-menu__item") {{faction.name}}
      label Level:
      input(type='number' v-model='automaLevel' min='1' max='4')
      button(
        class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
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
      automaLevel:1,
      playerName:''
    }
  },
  methods: {
    addPlayer: function(){
      this.$store.commit(ADD_PLAYER, {
        faction: document.getElementById('selectedFaction').value,//this.selectedFactionId,
        level:this.automaLevel
      });
    },
    addHumanPlayer: function(){
      this.$store.commit(ADD_PLAYER, {
        name:this.playerName
      });
      this.playerName = '';
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
      window &&
        window.getmdlSelect &&
        window.getmdlSelect.init &&
        window.getmdlSelect.init('.getmdl-select');
      return factions;
    }
  }),
  mounted: () => {
    window.MaterialTextfield && new window.MaterialTextfield(document.querySelector('.person-name'));
    window &&
        window.getmdlSelect &&
        window.getmdlSelect.init &&
        window.getmdlSelect.init('.getmdl-select');
  }
}
</script>
