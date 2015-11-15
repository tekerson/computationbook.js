import * as NFA from "../nfa";

import patternProto from "./pattern";

export default function empty () {
  let precedence = 3,
      toString = () => "",
      toNFADesign = () => {
        let startState = Symbol('Empty'),
            acceptState = startState,
            rulebook = NFA.rulebook([]);
        return NFA.design(startState, [acceptState], rulebook);
      };

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
    toNFADesign,
  }));
}
