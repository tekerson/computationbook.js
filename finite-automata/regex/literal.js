import * as NFA from "../nfa";
import { rule } from "../fa";

import patternProto from "./pattern";

export default function literal (character) {
  let precedence = 3,
      toString = () => character,
      toNFADesign = () => {
        let startState = Symbol('Literal:' + character + ':start'),
            acceptState = Symbol('Literal:' + character + ':end'),
            rules = [rule(startState, character, acceptState)],
            rulebook = NFA.rulebook(rules);
        return NFA.design(startState, [acceptState], rulebook);
      };

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
    toNFADesign,
  }));
}
