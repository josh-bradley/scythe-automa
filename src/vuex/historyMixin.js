import { RESET_GAME, PROGRESS_COMBAT, DEAL_COMBAT_CARD, CLEAR_SAVED_GAME } from './types'
import { AUTOMA_MOVE, GAME_INITIATED  } from './gameStatus'

export default { 
  data: function(){
    return {mutationHistory:[]}; 
  },
  created: function() {
    var store = this.$store;
    this.$store.subscribe(m => {
      if(m.type !== RESET_GAME && m.type !== CLEAR_SAVED_GAME)
        this.mutationHistory.push(m);
    });
  },
  methods: {
    cancelCurrentCombat: function() {
      const newMutations = this.mutationHistory;
      while(newMutations[newMutations.length - 1].type === PROGRESS_COMBAT ||
        newMutations[newMutations.length - 1].type === DEAL_COMBAT_CARD){
        newMutations.pop();
      }
      this.$store.commit(RESET_GAME);
      newMutations.forEach(m => {
        this.$store.commit(m.type, m.payload);
        this.mutationHistory.pop();
      })
    }
  }
}