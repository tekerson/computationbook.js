import { equals } from 'ramda';

export function rule (state, character, next) {
  let applies = (currentState, input) => equals(currentState, state) && equals(character, input),
      follow = () => next,
      toString = () => `#<FARule ${state.toString()} --${character}--> ${next.toString()}>`;

  return Object.freeze({
    applies,
    follow,
    character,
    toString,
  });
}
