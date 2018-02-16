<<template lang="pug">
  div(
      class='mdl-typography--title flex-container-centre pad-sides-med'
      v-if='savedState')
        | Would you like to load your last game? 
        br
        br
        div
          button(
            class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'
            @click='loadSavedGame') Yes
          button(
            class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'
            @click='clearSavedState') No
</template>

<script>
import { mapState } from 'vuex'
import * as types from './vuex/types'

export default {
  computed: mapState({
      'savedState':'savedState',
  }),
  methods:{
    clearSavedState: function(e){
      e.preventDefault();
      this.$store.commit(types.CLEAR_SAVED_GAME);
    },
    loadSavedGame: function(e){
      e.preventDefault();
      this.$store.commit(types.LOAD_SAVED_GAME);
    }
  }
}
</script>