import * as NFA from "../nfa";
import { rule } from "../fa";

import patternProto from "./pattern";

export default function choose (first, second) {
  let precedence = 0,
      toString = () => [first, second].map(pattern => pattern.bracket(precedence)).join('|'),
      toNFADesign = () => {
        let firstDesign = first.toNFADesign(),
            secondDesign = second.toNFADesign(),
            startState = Symbol('Choose'),
            acceptStates = [...firstDesign.acceptStates, ...secondDesign.acceptStates],
            rules = [...firstDesign.rulebook.rules, ...secondDesign.rulebook.rules],
            extraRules = [firstDesign, secondDesign].map(design => rule(startState, null, design.startState)),
            rulebook = NFA.rulebook([...rules, ...extraRules]);
        return NFA.design(startState, acceptStates, rulebook);
      };

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
    toNFADesign,
  }));
}
