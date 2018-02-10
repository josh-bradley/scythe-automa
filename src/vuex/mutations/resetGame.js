import defaultState from '../defaultState'

export default (state, payload) => {
  console.log('what up bro')
  Object.assign(state, defaultState);
}