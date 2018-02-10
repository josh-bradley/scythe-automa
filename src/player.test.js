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

describe('get build list', () => {
  it('should get number of workers correct', () => {
    const playerData = { dealtCards: [11], starCardPosition:0, level:1, faction:'Nordic' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Build 1 workers').length).toBe(1);
  })
  
  it('should get number of mechs correct', () => {
    const playerData = { dealtCards: [8], starCardPosition:0, level:1, faction:'Nordic' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Build 1 mechs').length).toBe(1);
  })

  it('should get number of workers correct when faction specific worker build matches', () => {
    const playerData = { dealtCards: [11], starCardPosition:0, level:1, faction:'Rusviet' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Build 2 workers').length).toBe(1);
  })

  it('should get number of mechs correct when faction matches faction specific build option', () => {
    const playerData = { dealtCards: [8], starCardPosition:0, level:1, faction:'Rusviet' }
    const player = Object.assign(playerData, playerMethods);

    const buildList = player.getBuildList();

    expect(buildList.filter(x => x === 'Build 2 mechs').length).toBe(1);
  })
})
