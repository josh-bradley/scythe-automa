import mutation from './completeBuild'
import { AUTOMA_BUILD, AUTOMA_FINALISE } from '../gameStatus'

describe('Complete move action tests', () => {
  it(`should set the game status ${AUTOMA_FINALISE} after ${AUTOMA_BUILD}`, () => {
    let state = { status: AUTOMA_BUILD };

    mutation(state);

    expect(state.status).toBe(AUTOMA_FINALISE);
  })
})