import { DEAL_CARD } from './types'
import mutations from './mutations'
const mutation = mutations[DEAL_CARD]; 
const payload = {
  card: 11
}

const getDefaultState = () => ({
  players: [
    { level: 1, dealtCards: [], starCardPosition:0, stars:0, coins:5, power:3, faction:"Nordic"},
    { level: 1, dealtCards: [], starCardPosition:0, stars:0, coins:5, power:3, faction:"Polonia"},
    { level: 1, dealtCards: [], starCardPosition:0, stars:0, coins:5, power:3, faction:"Crimean"},
  ],
  currentTurn:0
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


describe('DEAL_CARD mutation test tests', () => {
  it('should set the card to the first player on the first turn', () => {
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].dealtCards[0]).toBe(11);
  })

  it('should up the turn count by 1 for a sucessful turn', () => {
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.currentTurn).toBe(1);
  })

  it('should set the card to the third player on the 6th turn', () => {
    const state = Object.assign(getDefaultState(), {currentTurn:5})
    mutation(state, payload);
    expect(state.players[2].dealtCards[0]).toBe(11);
  })

  it('should not add the same card twice', () => {
    const players = [{ level:1, dealtCards:[11]}]
    const state = Object.assign(getDefaultState(), { currentTurn:2, players:players})
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(1);
  })

  it('should return the card count to 0 once all cards have been dealt', () => {
    const players = [{level:1, dealtCards:[...Array.from(Array(19).keys())].map(x => ++x)}]
    const state = Object.assign(getDefaultState(), {players:players, currentTurn:20});
    mutation(state, payload);
    expect(state.players[0].dealtCards.length).toBe(1);
    expect(state.players[0].dealtCards[0]).toBe(11);
  })

  it('should add a star position to the player when a star card is dealt', () => {
    const payload = {
      card:1,
    }
    
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].starCardPosition).toBe(1);
  })

  it('should not add a star position to the player when a star card but noplay on current scheme and level 1 automata', () => {
    const payload = {
      card:cardWithStarNoPlay1,
    }
    
    let state = getDefaultState();
    
    mutation(state, payload);
    expect(state.players[0].starCardPosition).toBe(0);
  })

  it('should not add a star position to the player when a star card but noplay on current scheme (2) and level 1 automata', () => {
    const payload = {
      card:cardWithNoPlayBothSchemesAndStar,
    }
    
    let state = getDefaultState();
    state.players[0].starCardPosition = 10;
    mutation(state, payload);
    expect(state.players[0].starCardPosition).toBe(10);
  })

  it('should add a star position to the player when a star card but noplay on current scheme and level 2 or above automata', () => {
    const payload = {
      card:cardWithStarNoPlay1,
    }
    
    let state = getDefaultState();
    state.players[0].level = 2;
    mutation(state, payload);
    expect(state.players[0].starCardPosition).toBe(1);
  })

  it('should add a star position to the player when a star card but noplay on not current scheme and level 1 automata', () => {
    const payload = {
      card:cardWithStarNoPlay1,
    }
    
    let state = getDefaultState();
    state.players[0].starCardPosition = 10;
    mutation(state, payload);
    expect(state.players[0].starCardPosition).toBe(11);
  })

  it('should not add a star position to the player when a non star card is dealt', () => {
    const payload ={
        card:4,
    }
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].starCardPosition).toBe(0)
  })

  it('should not add a star to count when star card position has no star', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].stars).toBe(0);
  })

  it('should add a star to count when star card position has a star', () => {
    const payload = {
      card:1
    }
    let state = getDefaultState();
    state.players[0].starCardPosition = 9;
    mutation(state, payload);
    expect(state.players[0].stars).toBe(1);
  })

  it('should not add a star to count when star card card position stays on star', () => {
    const payload = {
      card:4
    }
    let state = getDefaultState();
    state.players[0].starCardPosition = 10;
    mutation(state, payload);
    expect(state.players[0].stars).toBe(0);
  })

  it('should increment power.', () => {
    const payload = {
      card:cardWithOnePowerScheme1
    }

    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].power).toBe(4);
  })

  it('should not increment power when power on scheme 2 but player in scheme 1.', () => {
    const payload = {
      card:cardWithPowerScheme2
    }

    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].power).toBe(3);
  })

  it('should increment power when power on scheme 2 and player in scheme 2.', () => {
    const payload = {
      card:cardWithPowerScheme2
    }

    let state = getDefaultState();
    state.players[0].starCardPosition = 10;
    mutation(state, payload);
    expect(state.players[0].power).toBe(6);
  })

  it('should not increment power when not on card.', () => {
    const payload = {
      card:cardWithNoPowerScheme1
    }

    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].power).toBe(3);
  })

  it('should increment coin.', () => {
    const payload = {
      card:cardWithCoinScheme1
    }

    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].coins).toBe(6);
  })

  it('should not increment coins when coins on scheme 2 but player in scheme 1.', () => {
    const payload = {
      card:cardWithCoinsScheme2
    }

    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].coins).toBe(5);
  })

  it('should increment coins when coins on scheme 2 and player in scheme 2.', () => {
    const payload = {
      card:cardWithCoinsScheme2
    }

    let state = getDefaultState();
    state.players[0].starCardPosition = 10;
    mutation(state, payload);
    expect(state.players[0].coins).toBe(7);
  })

  it('should not increment coins when not on card.', () => {
    const payload = {
      card:cardWithNoCoinsScheme1
    }

    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].coins).toBe(5);
  })

  it('should not increment coins when on card but noplay card.', () => {
    const payload = {
      card:cardWithCoinScheme1NoPlay
    }

    let state = getDefaultState();
    mutation(state, payload);
    expect(state.players[0].coins).toBe(5);
  })

  it('should reward additional coins when faction of player lines up with special reward but a noplay and player level 2 or above', () => {
    const payload = {
      card:cardsWithBonusCoinForCrimea
    }

    let state = getDefaultState();
    const player = state.players[0];
    player.faction = "Crimean";
    player.level = 3;
    mutation(state, payload);

    expect(state.players[0].coins).toBe(6);
  });

  it('should not reward additional coins when faction of player lines up with special reward but a noplay', () => {
    const payload = {
      card:cardsWithBonusCoinForCrimea
    }

    let state = getDefaultState();
    state.players[0].faction = "Crimean";
    mutation(state, payload);

    expect(state.players[0].coins).toBe(5);
  });

  it('should not reward additional coins when faction of player does not line up with special reward', () => {
    const payload = {
      card:cardsWithBonusCoinForCrimea
    }

    let state = getDefaultState();
    state.players[0].faction = "Nordic";
    mutation(state, payload);

    expect(state.players[0].coins).toBe(5);
  });

  it('should reward additional power when faction of player lines up with special reward', () => {
    const payload = {
      card:cardWithSpecialPowerRewardForSaxony
    }

    let state = getDefaultState();
    const player = state.players[0];
    player.faction = "Saxony";
    player.starCardPosition = 10;
    mutation(state, payload);

    expect(state.players[0].power).toBe(4);
  });

  it('should not reward additional power when faction of player does not line up with special reward', () => {
    const payload = {
      card:cardWithSpecialPowerRewardForSaxony
    }

    let state = getDefaultState();
    const player = state.players[0];
    player.faction = "Nordic";
    player.starCardPosition = 10;
    mutation(state, payload);

    expect(state.players[0].power).toBe(3);
  });
})