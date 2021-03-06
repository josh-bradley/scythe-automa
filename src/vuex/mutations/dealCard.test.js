import { DEAL_CARD } from '../types'
import { AUTOMA_MOVE, GAME_FINISHED } from '../gameStatus'
import mutations from '../mutations'

const cardWithNoPlayBothSchemesAndStar = 7;
const cardWithStarNoPlay1 = 8;
const mutation = mutations[DEAL_CARD]; 
const payload = {
  card: 11
}

const getDefaultState = (turn = 1) => ({
  players: [
    { name: 'Mary' }, 
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Nordic"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Polonia"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Crimean"},
  ],
  currentTurn:turn
})

describe('DEAL_CARD mutation test tests', () => {
  it('should up the turn count by 1 for a human player', () => {
    const state = getDefaultState(0);
    mutation(state, {});
    expect(state.currentTurn).toBe(1);
  })

  it(`should set the status to ${AUTOMA_MOVE} for an automa's turn`, () => {
    const state = getDefaultState();

    mutation(state, payload);

    expect(state.status).toBe(AUTOMA_MOVE);
  })

  it('should set the card to the first player on the first turn', () => {
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[1].dealtCards[0]).toBe(11);
  })

  it('should set the lastPlayedCard to the first player on the first turn', () => {
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[1].lastPlayedCard).toBe(11);
  })

  it('should up the turn count by 1 for a sucessful turn', () => {
    let state = getDefaultState(1);
    mutation(state, payload);
    expect(state.currentTurn).toBe(2);
  })

  it('should set combat to false', () => {
    let state = getDefaultState();
    state.players[1].inCombat = true;
    mutation(state, payload);
    expect(state.inCombat).toBe(false);
  })

  it('should set the card to the third player on the 6th turn', () => {
    const state = Object.assign(getDefaultState(), {currentTurn:6})
    mutation(state, payload);
    expect(state.players[2].dealtCards[0]).toBe(11);
  })

  it('should not add the same card twice', () => {
    const players = [{ level:1, lastPlayedCard:11, dealtCards:[11]}]
    const state = Object.assign(getDefaultState(), { currentTurn:2, players:players})
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(1);
  })

  it('should not add card if it has been added in dealt as a combat card', () => {
    const players = [{ level:1, lastPlayedCard:12, dealtCards:[12],dealtCombatCards:[11]}]
    const state = Object.assign(getDefaultState(), { currentTurn:2, players:players})
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(1);
  })

  it('should return the card count to 0 once all cards have been dealt', () => {
    const players = [{level:1, lastPlayedCard:1, dealtCards:[...Array.from(Array(19).keys())].map(x => ++x)}]
    const state = Object.assign(getDefaultState(), {players:players, currentTurn:20});
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(1);
    expect(state.players[0].dealtCards[0]).toBe(11);
  })

  it('should return the card count to 0 once all cards have been dealt across both discard piles', () => {
    const players = [{level:1, lastPlayedCard:1, dealtCards:[...Array.from(Array(18).keys())].map(x => ++x),dealtCombatCards:[19]}]
    const state = Object.assign(getDefaultState(), {players:players, currentTurn:20});
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(1);
    expect(state.players[0].dealtCombatCards.length).toBe(0);
    expect(state.players[0].dealtCards[0]).toBe(11);
  })

  it('should add a star position to the player when a star card is dealt', () => {
    const payload = {
      card:1,
    }
    
    let state = getDefaultState(2);
    state.players[1].lastPlayedCard = 1;
    state.players[1].dealtCards.push(1);
    mutation(state, payload);
    expect(state.players[1].starCardPosition).toBe(1);
  })

  it('should not add a star position to the player when a star card but noplay on current scheme and level 1 automata', () => {
    const payload = {
      card:cardWithStarNoPlay1,
    }
    
    let state = getDefaultState(2);
    state.players[1].lastPlayedCard = cardWithStarNoPlay1;
    state.players[1].dealtCards.push(cardWithStarNoPlay1);
    
    mutation(state, payload);
    expect(state.players[1].starCardPosition).toBe(0);
  })

  it('should not add a star position to the player when a star card but noplay on current scheme (2) and level 1 automata', () => {
    const payload = {
      card:cardWithNoPlayBothSchemesAndStar,
    }
    
    let state = getDefaultState(2);
    state.players[1].lastPlayedCard = cardWithNoPlayBothSchemesAndStar;
    state.players[1].dealtCards.push(cardWithNoPlayBothSchemesAndStar);
    state.players[1].starCardPosition = 10;
    mutation(state, payload);
    expect(state.players[1].starCardPosition).toBe(10);
  })

  it('should add a star position to the player when a star card but noplay on current scheme and level 2 or above automata', () => {
    const payload = {
      card:cardWithStarNoPlay1,
    }
    
    let state = getDefaultState(2);
    state.players[1].lastPlayedCard = cardWithStarNoPlay1;
    state.players[1].dealtCards.push(cardWithStarNoPlay1);
    state.players[1].level = 2;
    mutation(state, payload);
    expect(state.players[1].starCardPosition).toBe(1);
  })

  it('should add a star position to the player when a star card but noplay on not current scheme and level 1 automata', () => {
    const payload = {
      card:cardWithStarNoPlay1,
    }
    
    let state = getDefaultState(2);
    state.players[1].lastPlayedCard = cardWithStarNoPlay1;
    state.players[1].dealtCards.push(cardWithStarNoPlay1);
    state.players[1].starCardPosition = 10;
    mutation(state, payload);
    expect(state.players[1].starCardPosition).toBe(11);
  })

  it('should not add a star position to the player when a non star card is dealt', () => {
    const payload ={
        card:4,
    }
    let state = getDefaultState(2);
    state.players[1].lastPlayedCard = 4;
    state.players[1].dealtCards.push(4);
    mutation(state, payload);
    expect(state.players[1].starCardPosition).toBe(0)
  })

  it('should not add a star to count when star card position has no star', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState(2);
    state.players[1].lastPlayedCard = 1;
    state.players[1].dealtCards.push(1);
    mutation(state, payload);
    expect(state.players[1].stars).toBe(0);
  })

  it('should add a star to count when star card position has a star', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState(2);
    state.players[1].starCardPosition = 9;
    state.players[1].lastPlayedCard = 1;
    state.players[1].dealtCards.push(1);
    mutation(state, payload);
    expect(state.players[1].stars).toBe(1);
  })

  it('should not add a star to count when star card card position stays on star', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState(2);
    state.players[1].starCardPosition  = 10;
    state.players[1].lastPlayedCard = 4;
    state.players[1].dealtCards.push(4);
    mutation(state, payload);
    expect(state.players[1].stars).toBe(0);
  })

  it(`should set the state of game to ${GAME_FINISHED} when automa gets 6th star`, () => {
    const payload = {
      card:1,
    }
    
    let state = getDefaultState(2);
    state.players[1].lastPlayedCard = 1;
    state.players[1].dealtCards.push(1);
    state.players[1].stars = 5;
    state.players[1].starCardPosition = 9;
    mutation(state, payload);
    expect(state.status).toBe(GAME_FINISHED);
  })

  it('should reshuffle deck when the automa reaches scheme 2', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState(2);
    state.players[1].starCardPosition = 9;
    state.players[1].lastPlayedCard = 1;
    state.players[1].dealtCards.push(1);
    mutation(state, payload);
    expect(state.players[1].dealtCards.length).toBe(0);  
  });

  it('should not reshuffle deck when the automa was already on scheme 2', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState(2);
    state.players[1].starCardPosition = 10;
    state.players[1].lastPlayedCard = 4;
    state.players[1].dealtCards.push(4);
    mutation(state, payload);
    expect(state.players[1].dealtCards.length).toBe(1);  
  });

  it('should reshuffle deck and clear combat cards dealt when the automa reaches scheme 2', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState(2);
    state.players[1].starCardPosition = 9;
    state.players[1].lastPlayedCard = 1;
    state.players[1].dealtCards.push(1);
    state.players[1].dealtCombatCards = [5];
    mutation(state, payload);
    expect(state.players[1].dealtCombatCards.length).toBe(0);  
  });

  it('should not reshuffle deck when the automa was already on scheme 2', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState(2);
    state.players[1].starCardPosition = 10;
    state.players[1].lastPlayedCard = 4;
    state.players[1].dealtCards.push(4);
    state.players[1].dealtCombatCards = [5];
    mutation(state, payload);
    expect(state.players[1].dealtCombatCards.length).toBe(1);  
  });
})