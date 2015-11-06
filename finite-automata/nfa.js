export function rulebook (rules) {
  let next = (states, character) => toSet(flatMap(states, (state) => followRulesFor(state, character))),
      followRulesFor = (state, character) => rulesFor(state, character).map((rule) => rule.follow()),
      rulesFor = (state, character) => rules.filter((rule) => rule.applies(state, character));

  return Object.freeze({
    next
  });
}

export function nfa (currentStates, acceptStates, rulebook) {
  let isAccepting = () => currentStates.filter((state) => acceptStates.indexOf(state) !== -1).length > 0,
      read = (character) => currentStates = rulebook.next(currentStates, character),
      readString = (string) => string.split("").forEach(read);

  return Object.freeze({
    isAccepting,
    read,
    readString,
  });
}

export function design (startState, acceptStates, rulebook) {
  let toNFA = () => nfa(startState, acceptStates, rulebook),
      accepts = (string) => {
        let newNFA = toNFA();
        newNFA.readString(string);
        return newNFA.isAccepting();
      };

  return Object.freeze({
    accepts,
  });
}

function flatMap (arr, f) {
  return Array.prototype.concat([], ...arr.map(f));
}

function toSet (arr) {
  return arr.reduce(((acc, el) => (acc.indexOf(el) === -1) ? acc.concat([el]) : acc), []);
}
