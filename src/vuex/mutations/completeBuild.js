import { AUTOMA_FINALISE } from '../gameStatus'
import * as playerMethods from '../../player'

export default (state) => {
  state.status = AUTOMA_FINALISE;

  const currentPlayerIdx = (state.currentTurn - 1) % state.players.length;
  const currentPlayer = Object.assign(state.players[currentPlayerIdx], playerMethods);
  const playerScheme = currentPlayer.getCurrentScheme();
  const factionSpecific = currentPlayer.getFactionSpecific();
  const playTurn = currentPlayer.level > 1 ||  !playerScheme.noplay;
  const automaCard = currentPlayer.getCurrentCard();
  currentPlayer.power = playTurn ? playerScheme.power + currentPlayer.power + factionSpecific.power : currentPlayer.power;
  currentPlayer.coins = playTurn ? playerScheme.coins + currentPlayer.coins + factionSpecific.coins : currentPlayer.coins;
}