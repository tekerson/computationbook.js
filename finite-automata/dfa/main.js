import * as DFA from ".";
import { rule } from "../fa";

let rulebook = DFA.rulebook([
  rule(1, 'a', 2), rule(1, 'b', 1),
  rule(2, 'a', 2), rule(2, 'b', 3),
  rule(3, 'a', 3), rule(3, 'b', 3),
]);

let dfa = DFA.design(1, [3], rulebook);

console.log(!dfa.accepts('a'));
console.log(!dfa.accepts('baa'));
console.log(dfa.accepts('baba'));
