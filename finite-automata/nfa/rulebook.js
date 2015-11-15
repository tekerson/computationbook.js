import { chain, uniq } from "ramda";
import { isSubset } from "../util";

export default function rulebook (rules) {
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
