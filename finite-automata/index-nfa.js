
import rule from "./rule";
import * as NFA from "./nfa";

let rulebook = NFA.rulebook([
  rule(1, 'a', 1), rule(1, 'b', 1), rule(1, 'b', 2),
  rule(2, 'a', 3), rule(2, 'b', 3),
  rule(3, 'a', 4), rule(3, 'b', 4),
]);

let design = NFA.design([1], [4], rulebook);

console.log(design.accepts('bab'));
console.log(design.accepts('bbbbb'));
console.log(design.accepts('bbabb'));
