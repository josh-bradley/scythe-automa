import mutation from './completeMove'
import { AUTOMA_BUILD, AUTOMA_MOVE } from '../gameStatus'

describe('Complete move action tests', () => {
  it(`should set the game status ${AUTOMA_BUILD} after ${AUTOMA_MOVE}`, () => {
    let state = { status: AUTOMA_MOVE };

    mutation(state);

    expect(state.status).toBe(AUTOMA_BUILD);
  })
})