import * as DFA from "../dfa";
import { rule } from "../fa";
import { uniq, chain } from "ramda";
import { isSubset } from "../util";

export function nfaSimulation (nfaDesign) {
  let nextState = (state, character) => {
    let fa = nfaDesign.toFAIn(state);
    fa.read(character);
    return fa.currentState();
  };
  let discoverStatesAndRules = (states) => {
    let rules = chain(rulesFor, states),
        moreStates = uniq(rules.map(rule => rule.follow()));
    if (isSubset(moreStates, states)) {
      return [states, rules];
    } else {
      return discoverStatesAndRules(uniq(states.concat(moreStates)));
    }
  };
  let rulesFor = (state) => nfaDesign.rulebook.alphabet().map(character => {
    let from = state,
        next = nextState(state, character);
    return rule(from, character, next);
  });
  let toDFADesign = () => {
    let startState = nfaDesign.toFA().currentState(),
        [states, rules] = discoverStatesAndRules([startState]),
        acceptStates = states.filter(state => nfaDesign.toFAIn(state).isAccepting());
    return DFA.design(startState, acceptStates, DFA.rulebook(rules));
  };

  return Object.freeze({
    nextState,
    rulesFor,
    discoverStatesAndRules,
    toDFADesign,
  });
}
