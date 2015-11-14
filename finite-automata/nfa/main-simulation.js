import * as NFA from ".";
import * as NFASimulation from "./simulation";
import { rule } from "../fa";

let rulebook = NFA.rulebook([
  rule(1, 'a', 1), rule(1, 'a', 2), rule(1, null, 2),
  rule(2, 'b', 3),
  rule(3, 'b', 1), rule(3, null, 2)
]);

let design = NFA.design(1, [3], rulebook);

console.log(!design.toFAIn([1,2]).isAccepting());
console.log(design.toFAIn([2,3]).isAccepting());

let simulation = NFASimulation.nfaSimulation(design);

console.log(simulation.nextState([1,2], 'a'));
console.log(simulation.nextState([1,2], 'b'));
console.log(simulation.nextState([3,2], 'b'));

let dfa = simulation.toDFADesign();

console.log(!dfa.accepts('aaa'));
console.log(dfa.accepts('aab'));
