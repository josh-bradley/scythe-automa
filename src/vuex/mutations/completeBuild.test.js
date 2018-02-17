import mutation from './completeBuild'
import { AUTOMA_BUILD, AUTOMA_FINALISE } from '../gameStatus'

const getDefaultState = (turn = 1) => ({
  players: [
    { name: 'Mary' },
    { level: 1, dealtCards: [1], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Nordic"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Polonia"},
    { level: 1, dealtCards: [], dealtCombatCards:[], starCardPosition:0, stars:0, coins:5, power:3, faction:"Crimean"},
  ],
  status:AUTOMA_BUILD,
  currentTurn:turn,
  gameTurn:1
})

describe('Complete move action tests', () => {
  it(`should set the game status ${AUTOMA_FINALISE} after ${AUTOMA_BUILD}`, () => {
    let state = getDefaultState(2);

    mutation(state);

    expect(state.status).toBe(AUTOMA_FINALISE);
  })
})

const cardWithOnePowerScheme1 = 1;
const cardWithNoPowerScheme1 = 2;
const cardWithPowerScheme2 = 19;
const cardWithCoinScheme1 = 15;
const cardWithCoinsScheme2 = 10;
const cardWithNoCoinsScheme1 = 6;
const cardWithNoPlayBothSchemesAndStar = 7;
const cardWithCoinScheme1NoPlay = 7;
const cardWithStarNoPlay1 = 8;
const cardsWithBonusCoinForCrimea = 4;
const cardWithSpecialPowerRewardForSaxony = 16;

describe('Power and coin resolutions', () => {
  it('should increment power.', () => {
    const payload = {
      card:cardWithOnePowerScheme1
    }

    let state = getDefaultState(2);
    mutation(state, payload);
    expect(state.players[1].power).toBe(4);
  });

  it('should not increment power when power on scheme 2 but player in scheme 1.', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithPowerScheme2)

    mutation(state);

    expect(state.players[1].power).toBe(3);
  })

  it('should increment power when power on scheme 2 and player in scheme 2.', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithPowerScheme2);
    state.players[1].starCardPosition = 10;

    mutation(state);

    expect(state.players[1].power).toBe(6);
  })

  it('should not increment power when not on card.', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithNoPowerScheme1);

    mutation(state);

    expect(state.players[1].power).toBe(3);
  })

  it('should increment coin.', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithCoinScheme1);

    mutation(state);

    expect(state.players[1].coins).toBe(6);
  })

  it('should not increment coins when coins on scheme 2 but player in scheme 1.', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithCoinsScheme2);

    mutation(state);

    expect(state.players[1].coins).toBe(5);
  })

  it('should increment coins when coins on scheme 2 and player in scheme 2.', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithCoinsScheme2);
    state.players[1].starCardPosition = 10;

    mutation(state);

    expect(state.players[1].coins).toBe(7);
  })

  it('should not increment coins when not on card.', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithNoCoinsScheme1);
    
    mutation(state);
    
    expect(state.players[1].coins).toBe(5);
  })

  it('should not increment coins when on card but noplay card.', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithCoinScheme1NoPlay);

    mutation(state);
    
    expect(state.players[1].coins).toBe(5);
  })

  it('should reward additional coins when faction of player lines up with special reward but a noplay and player level 2 or above', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardsWithBonusCoinForCrimea);
    const player = state.players[1];
    player.faction = "Crimean";
    player.level = 3;
    
    mutation(state);

    expect(state.players[1].coins).toBe(6);
  });

  it('should not reward additional coins when faction of player lines up with special reward but a noplay', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardsWithBonusCoinForCrimea);
    state.players[1].faction = "Crimean";

    mutation(state);

    expect(state.players[1].coins).toBe(5);
  });

  it('should not reward additional coins when faction of player does not line up with special reward', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardsWithBonusCoinForCrimea);
    state.players[1].faction = "Nordic";

    mutation(state);

    expect(state.players[1].coins).toBe(5);
  });

  it('should reward additional power when faction of player lines up with special reward', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithSpecialPowerRewardForSaxony);
    const player = state.players[1];
    player.faction = "Saxony";
    player.starCardPosition = 10;

    mutation(state);

    expect(state.players[1].power).toBe(4);
  });

  it('should not reward additional power when faction of player does not line up with special reward', () => {
    let state = getDefaultState(2);
    state.players[1].dealtCards.push(cardWithSpecialPowerRewardForSaxony);
    const player = state.players[1];
    player.faction = "Nordic";
    player.starCardPosition = 10;

    mutation(state);

    expect(state.players[1].power).toBe(3);
  });
})