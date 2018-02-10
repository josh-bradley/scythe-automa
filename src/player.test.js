import { canCrossRiver } from './player'

describe('player extention tests', () => {
  it('should true when player can cross river', () => {
    let player = { level:1, starCardPosition:5}
    expect(canCrossRiver(player)).toBe(true);
  })

  it('should false when player cannot cross river', () => {
    let player = { level:2, starCardPosition:3}
    expect(canCrossRiver(player)).toBe(false);
  })
})