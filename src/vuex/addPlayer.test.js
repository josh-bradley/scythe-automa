import * as types from './types'
import mutations from './mutations'
import { GAME_INITIATED } from './gameStatus' 

const payload = {
    level: 1,
    faction:"Nordic"
}
const getDefaultState = () => {
  return {
    players:[],
    currentTurn:0
  }
}

const mutator = mutations[types.ADD_PLAYER];
let state;

describe('ADD_PLAYER tests', () => { 
  beforeEach(() => {
    state = getDefaultState();
  })
  
  it('should add human player to game', () => {
    mutator(state, { name:'John' });
    expect(state.players.length).toBe(1);
  })
  
  it('should add player to game', () => {
    mutator(state, payload);
    expect(state.players.length).toBe(1);
  })

  it('should set player id correctly', () => {
    mutator(state, { name:'Jill'});
    expect(state.players[0].id).toBe(0);
    mutator(state, payload);
    expect(state.players[1].id).toBe(1);
  })

  it('should add player to game with correct level', () => {
    mutator(state, payload)
    expect(state.players[0].level).toBe(1)
    expect(state.players[0].dealtCards).toEqual([]);
    expect(state.players[0].dealtCombatCards).toEqual([]);
    expect(state.players[0].starCardPosition).toBe(0);
  })

  it('should not add more then 6 players to a game', () => {
    const originalState = {
      currentTurn:0,
      players:[
        { level: 1},
        { level: 1},
        { level: 1},
        { level: 1},
        { level: 1},
        { level: 1},
      ]
    }
    mutator(originalState, payload);
    expect(originalState.players.length).toBe(6);
  })

  it('should set the faction name correctly', () => {
    mutator(state, payload);
    expect(state.players[0].faction).toBe("Nordic");
  })

  it('should set the power appropriate to the faction', () => {
    mutator(state, payload);
    expect(state.players[0].power).toBe(4);
  })

  it('should set the initial coin correctly', () => {
    mutator(state, payload);
    expect(state.players[0].coins).toBe(5);
  })
});