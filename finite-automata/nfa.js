import { flatMap, uniq, isSubset } from "./util";

export function rulebook (rules) {
  let next = (states, character) => uniq(flatMap(states, state => followRulesFor(state, character))),
      followRulesFor = (state, character) => rulesFor(state, character).map(rule => rule.follow()),
      rulesFor = (state, character) => rules.filter(rule => rule.applies(state, character)),
      followFreeMoves = (states) => {
        let more = next(states, null);
        if (isSubset(more, states)) {
          return states;
        } else {
          return followFreeMoves(states.concat(more));
        }
      };

  return Object.freeze({
    rules,
    next,
    followFreeMoves,
  });
}

export function nfa (startState, acceptStates, rulebook) {
  let currentStates = rulebook.followFreeMoves(startState),
      isAccepting = () => currentStates.filter((state) => acceptStates.indexOf(state) !== -1).length > 0,
      read = (character) => {
        currentStates = rulebook.followFreeMoves(rulebook.next(currentStates, character));
      },
      readString = (string) => string.split("").forEach(read);

  return Object.freeze({
    isAccepting,
    read,
    readString,
  });
}

export function design (startState, acceptStates, rulebook) {
  let toFA = () => nfa(startState, acceptStates, rulebook),
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
