export function design (fa, startState, acceptStates, rulebook) {
  let toFA = () => fa([startState], acceptStates, rulebook),
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
