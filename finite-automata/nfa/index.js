import { any, contains, chain, uniq } from "ramda";
import { isSubset } from "../util";

export function rulebook (rules) {
  let next = (states, character) => uniq(chain(state => followRulesFor(state, character), states)),
      followRulesFor = (state, character) => rulesFor(state, character).map(rule => rule.follow()),
      rulesFor = (state, character) => rules.filter(rule => rule.applies(state, character)),
      alphabet = () => uniq(rules.map(rule => rule.character).filter(character => character !== null)),
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
    alphabet,
  });
}

export function nfa (startState, acceptStates, rulebook) {
  let currentStates = rulebook.followFreeMoves(startState),
      currentState = () => currentStates,
      isAccepting = () => any(state => contains(state, acceptStates), currentStates),
      read = (character) => {
        currentStates = rulebook.followFreeMoves(rulebook.next(currentStates, character));
      },
      readString = (string) => string.split("").forEach(read);

  return Object.freeze({
    isAccepting,
    read,
    readString,
    currentState,
  });
}

export function design (startState, acceptStates, rulebook) {
  let toFA = () => nfa([startState], acceptStates, rulebook),
      toFAIn = (currentState) => nfa(currentState, acceptStates, rulebook),
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
    toFAIn,
  });
}
