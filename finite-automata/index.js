import * as DFA from "./dfa";

let rulebook = DFA.rulebook([
  DFA.rule(1, 'a', 2), DFA.rule(1, 'b', 1),
  DFA.rule(2, 'a', 2), DFA.rule(2, 'b', 3),
  DFA.rule(3, 'a', 3), DFA.rule(3, 'b', 3),
]);

let dfa = DFA.dfaDesign(1, [3], rulebook);

console.log(dfa.accepts('a'));
console.log(dfa.accepts('baa'));
console.log(dfa.accepts('baba'));
