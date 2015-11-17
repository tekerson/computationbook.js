import mkPda from "./pda";
import mkConfiguration from "./configuration";
import mkStack from "./stack";
import mkRulebook from "./rulebook";
import mkRule from "./rule";

var stack = mkStack(["$"]);

var rule = mkRule(1, '(', 2, '$', ['b', '$']);

var rules = [
  rule,
  mkRule(2, '(', 2, 'b', ['b', 'b']),
  mkRule(2, ')', 2, 'b', []),
  mkRule(2, null, 1, '$', ['$'])
];
var configuration = mkConfiguration(1, stack);
let rulebook = mkRulebook(rules);

let pda = mkPda(configuration, [1], rulebook);

console.log(pda.isAccepting());

console.log(rule.appliesTo(configuration, "("));

pda.readString("(())");
console.log(pda.isAccepting());
