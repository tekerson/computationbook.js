export function rule (state, character, next) {
  let applies = (currentState, input) => (currentState === state) && (character === input),
      follow = () => next,
      toString = () => `#<FARule ${state.toString()} --${character}--> ${next.toString()}>`

  return Object.freeze({
    applies,
    follow,
    toString,
  })
}

export function rulebook (rules) {
  let next = (state, character) => ruleFor(state, character).follow(),
      ruleFor = (state, character) => rules.find((rule) => rule.applies(state, character));

  return Object.freeze({
    next,
  });
}

export function dfa (currentState, acceptStates, rulebook) {
  let isAccepting = () => acceptStates.indexOf(currentState) !== -1,
      read = (character) => currentState = rulebook.next(currentState, character),
      readString = (string) => string.split("").forEach(read);

  return Object.freeze({
    isAccepting,
    read,
    readString,
  });
}

export function dfaDesign (startState, acceptStates, rulebook) {
  let toDFA = () => dfa(startState, acceptStates, rulebook),
      accepts = (string) => {
        let newDFA = toDFA();
        newDFA.readString(string);
        return newDFA.isAccepting();
      };

  return Object.freeze({
    toDFA,
    accepts,
  });
}
