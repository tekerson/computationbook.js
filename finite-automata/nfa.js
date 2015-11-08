/* @flow */
/*::

import type { FA, Rule, Rulebook, State } from "./fa";

type NFA = {} & FA;

*/

export function rulebook (rules/*: Array<Rule>*/)/* : Rulebook */ {
  let next = (states, character) => toSet(flatMap(states, state => followRulesFor(state, character))),
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

export function nfa (startState/*: Array<State>*/, acceptStates/*: Array<State>*/, rulebook/*: Rulebook */)/* : NFA */ {
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

function flatMap (arr, f) {
  return Array.prototype.concat(...arr.map(f));
}

function toSet (arr) {
  return arr.reduce(((acc, el) => (acc.indexOf(el) === -1) ? acc.concat([el]) : acc), []);
}

function isSubset (sub, sup) {
  return sub.filter((el) => sup.indexOf(el) === -1).length === 0;
}
