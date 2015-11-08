import * as NFA from "./nfa";
import { design, rule } from "./fa";

let patternProto = {
  bracket: function (outerPrecedence) {
    if (this.precedence < outerPrecedence) {
      return "(" + this.toString() + ")";
    } else {
      return this.toString();
    }
  },
  matches: function (string) {
    return this.toNFADesign().accepts(string);
  },
};

export function empty () {
  let precedence = 3,
      toString = () => "",
      toNFADesign = () => {
        let startState = Symbol('Empty'),
            acceptState = startState,
            rulebook = NFA.rulebook([]);
        return design(NFA.nfa, [startState], [acceptState], rulebook);
      };

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
    toNFADesign,
  }));
}

export function literal (character) {
  let precedence = 3,
      toString = () => character,
      toNFADesign = () => {
        let startState = Symbol('Literal:' + character + ':start'),
            acceptState = Symbol('Literal:' + character + ':end'),
            rules = [rule(startState, character, acceptState)],
            rulebook = NFA.rulebook(rules);
        return design(NFA.nfa, [startState], [acceptState], rulebook);
      };

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
    toNFADesign,
  }));
}

export function concatenate (first, second) {
  let precedence = 1,
      toString = () => [first, second].map(pattern => pattern.bracket(precedence)).join(''),
      toNFADesign = () => {
        let firstDesign = first.toNFADesign(),
            secondDesign = second.toNFADesign(),
            startState = firstDesign.startState,
            acceptStates = secondDesign.acceptStates,
            rules = firstDesign.rulebook.rules.concat(...secondDesign.rulebook.rules),
            extraRules = firstDesign.acceptStates.map(state => rule(state, null, secondDesign.startState)),
            rulebook = NFA.rulebook(rules.concat(...extraRules));
        return design(NFA.nfa, startState, acceptStates, rulebook);
      };

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
    toNFADesign,
  }));
}

export function choose (first, second) {
  let precedence = 0,
      toString = () => [first, second].map(pattern => pattern.bracket(precedence)).join('|');

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
  }));
}

export function repeat (pattern) {
  let precedence = 2,
      toString = () => pattern.bracket(precedence) + "*";

  return Object.freeze(Object.assign(Object.create(patternProto), {
    precedence,
    toString,
  }));
}
