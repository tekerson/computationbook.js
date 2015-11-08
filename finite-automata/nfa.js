/*
import type { Rule, State } from "./rule";

type Rulebook = {
  rules: Array<Rule>,
  next: (s:Array<State>, i:string) => Array<State>,
  followFreeMoves: (s:Array<State>) => Array<State>,
}

type NFA = {
  isAccepting: () => bool,
  read: (i:string) => any,
  readString: (s:string) => any,
};

*/

//@type Array<Rule> => Rulebook
export function rulebook (rules) {
  let next = (states, character) => flatMap(states, state => followRulesFor(state, character)),
      followRulesFor = (state, character) => flatMap(rulesFor(state, character), rule => rule.follow()),
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

//@type (Array<State>, Array<State>, Rulebook) => NFA
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

//@type forall A,B. (Array<A>, (A => Array<B>)) => Array<B>
function flatMap (arr, f) {
  let mapped = arr.map(f);
  return Array.prototype.concat(...mapped);
}

function toSet (arr) {
  return arr.reduce(((acc, el) => (acc.indexOf(el) === -1) ? [...acc, el] : acc), []);
}

//@type forall A. (Array<A>, Array<A>) => bool
export function isSubset (sub, sup) {
  return sub.filter((el) => sup.indexOf(el) === -1).length === 0;
}
