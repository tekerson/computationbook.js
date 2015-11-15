import * as NFA from "../nfa";
import { rule } from "../fa";

import patternProto from "./pattern";

export default function repeat (pattern) {
  let precedence = 2,
      toString = () => pattern.bracket(precedence) + "*",
      toNFADesign = () => {
        let patternDesign = pattern.toNFADesign(),
            startState = Symbol('Repeat'),
            acceptStates = [...patternDesign.acceptStates, startState],
            rules = patternDesign.rulebook.rules,
            extraRules = [
                ...patternDesign.acceptStates.map(acceptState => rule(acceptState, null, patternDesign.startState)),
              rule(startState, null, patternDesign.startState)
            ],
            rulebook = NFA.rulebook([...rules, ...extraRules]);
        return NFA.design(startState, acceptStates, rulebook);
      };

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
    toNFADesign,
  }));
}
