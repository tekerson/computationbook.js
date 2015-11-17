import {
  design as mkPDADesign,
  rulebook as mkRulebook,
  rule as mkRule
} from ".";

var rule = mkRule(1, '(', 2, '$', ['b', '$']);
var rules = [
  rule,
  mkRule(2, '(', 2, 'b', ['b', 'b']),
  mkRule(2, ')', 2, 'b', []),
  mkRule(2, null, 1, '$', ['$'])
];
let rulebook = mkRulebook(rules);

let pdaDesign = mkPDADesign(1, "$", [1], rulebook);

console.log(pdaDesign.accepts("()"));
console.log(pdaDesign.accepts("(())"));
console.log(!pdaDesign.accepts("())"));
console.log(!pdaDesign.accepts("(()"));
console.log(pdaDesign.accepts("((((((((()))))))))"));
