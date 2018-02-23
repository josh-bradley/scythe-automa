import * as playerMethods from './player'

describe('player extention tests', () => {
  it('should true when player can cross river', () => {
    let player = { level:1, starCardPosition:5}
    expect(playerMethods.canCrossRiver(player)).toBe(true);
  })

  it('should false when player cannot cross river', () => {
    let player = { level:2, starCardPosition:3}
    expect(playerMethods.canCrossRiver(player)).toBe(false);
  })
})

describe('getCurrentMoveOptions', () => {
  it('should return attack move when automa has the power to perform move', () => {
    const playerData = { dealtCards: [17], starCardPosition:0, level:1, faction:'Nordic', power:6 }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getCurrentMoveOptions();

    expect(buildList.filter(x => x.description === 'Attack move').length).toBe(1);
  })

  it('should not return attack move when automa does not have the power to perform move', () => {
    const playerData = { dealtCards: [17], starCardPosition:0, level:1, faction:'Nordic', power:5 }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getCurrentMoveOptions();

    expect(buildList.filter(x => x.description === 'Attack move').length).toBe(0);
  })
});

describe('get build list', () => {
  it('should get number of workers correct', () => {
    const playerData = { dealtCards: [11], starCardPosition:0, level:1, faction:'Nordic' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Deploy 1 workers').length).toBe(1);
  })
  
  it('should get number of characters\mechs correct', () => {
    const playerData = { dealtCards: [8], starCardPosition:0, level:1, faction:'Nordic' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Deploy 1 characters\mechs').length).toBe(1);
  })

  it('should get number of workers correct when faction specific worker build matches', () => {
    const playerData = { dealtCards: [11], starCardPosition:0, level:1, faction:'Rusviet' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Deploy 2 workers').length).toBe(1);
  })

  it('should get number of characters\mechs correct when faction matches faction specific build option', () => {
    const playerData = { dealtCards: [8], starCardPosition:0, level:1, faction:'Rusviet' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Deploy 2 characters\mechs').length).toBe(1);
  })

  it('should get number of power cards correct.', () => {
    const playerData = { dealtCards: [4], starCardPosition:0, level:1, faction:'Rusviet' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Pick up 1 power card.').length).toBe(1);
  })
})

describe('get recruit bonus', () => {
  it('should return none when there is no bonus', () => {
    const playerData = { dealtCards: [16], starCardPosition:0, level:1, faction:'Rusviet' }
    const player = Object.assign(playerData, playerMethods);

    const result = player.getRecruitBonus();

    expect(result.type).toBe('none');
  });
    
  it('should return coin when there is coin bonus', () => {
    const playerData = { dealtCards: [15], starCardPosition:0, level:1, faction:'Rusviet' }
    const player = Object.assign(playerData, playerMethods);

    const result = player.getRecruitBonus();

    expect(result.type).toBe('coin');
  });
})
