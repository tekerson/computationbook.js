import rule from "./rule";
import * as NFA from "./nfa";
import { design } from "./fa";

let rulebook = NFA.rulebook([
  rule(1, 'a', 1), rule(1, 'b', 1), rule(1, 'b', 2),
  rule(2, 'a', 3), rule(2, 'b', 3),
  rule(3, 'a', 4), rule(3, 'b', 4),
]);

let nfa = design(NFA.nfa, [1], [4], rulebook);

console.log(nfa.accepts('bab'));
console.log(nfa.accepts('bbbbb'));
console.log(nfa.accepts('bbabb'));
