import { AUTOMA_CARD_COUNT } from './constants'

const getRandomInt = () => {
  var min = 1;
  var max = AUTOMA_CARD_COUNT + 1;
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export const getNextCardForPlayer = (player) => {
  let nextCardNumber = 0;
  let discardedCards = player.dealtCards.concat(player.dealtCombatCards);
  while(nextCardNumber === 0) {
    let cardNumber = getRandomInt();
    if(discardedCards.length >= AUTOMA_CARD_COUNT || !discardedCards.some(x => x === cardNumber)){
      nextCardNumber = cardNumber;
    }
  }

  return nextCardNumber;
}