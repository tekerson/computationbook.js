/*
  export type State = number|object;

  export type Input = ?string;

  export type Rule = {
    applies: (s:State, c:?string) => bool,
    follow: () => State,
    toString: () => string,
  };
*/

//@type (State, Input, State) => Rule
export function design (fa, startState, acceptStates, rulebook) {
  let toFA = () => fa(startState, acceptStates, rulebook),
      accepts = (string) => {
        let newFA = toFA();
        newFA.readString(string);
        return newFA.isAccepting();
      };

  return Object.freeze({
    startState,
    acceptStates,
    rulebook,
    accepts,
    toFA,
  });
}

//@type (State, Input, State) => Rule
export function rule (state, character, next) {
  let applies = (currentState, input) => (currentState === state) && (character === input),
      follow = () => next,
      toString = () => `#<FARule ${state.toString()} --${character}--> ${next.toString()}>`;

  return Object.freeze({
    applies,
    follow,
    toString,
  });
}
