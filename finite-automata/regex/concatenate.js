import * as NFA from "../nfa";
import { rule } from "../fa";

import patternProto from "./pattern";

export default function concatenate (first, second) {
  let precedence = 1,
      toString = () => [first, second].map(pattern => pattern.bracket(precedence)).join(''),
      toNFADesign = () => {
        let firstDesign = first.toNFADesign(),
            secondDesign = second.toNFADesign(),
            startState = firstDesign.startState,
            acceptStates = secondDesign.acceptStates,
            rules = [...firstDesign.rulebook.rules, ...secondDesign.rulebook.rules],
            extraRules = firstDesign.acceptStates.map(state => rule(state, null, secondDesign.startState)),
            rulebook = NFA.rulebook([...rules, ...extraRules]);
        return NFA.design(startState, acceptStates, rulebook);
      };

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
    toNFADesign,
  }));
}
