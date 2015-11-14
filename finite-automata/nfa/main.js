import * as NFA from ".";
import { rule } from "../fa";

let rulebook = NFA.rulebook([
  rule(1, null, 2), rule(1, null, 4),
  rule(2, 'a', 3),
  rule(3, 'a', 2),
  rule(4, 'a', 5),
  rule(5, 'a', 6),
  rule(6, 'a', 4),
]);

let nfa = NFA.design(1, [2,4], rulebook);

console.log(nfa.accepts('aa'));
console.log(nfa.accepts('aaa'));
console.log(!nfa.accepts('aaaaa'));
console.log(nfa.accepts('aaaaaa'));
console.log(!nfa.accepts('aaaaaaa'));
