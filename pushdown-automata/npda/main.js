import {
  design as mkPDADesign,
  rulebook as mkRulebook,
  stack as mkStack,
  rule as mkRule
} from ".";

var rules = [
  mkRule(1, 'a', 1, '$', ['a', '$']),
  mkRule(1, 'a', 1, 'a', ['a', 'a']),
  mkRule(1, 'a', 1, 'b', ['a', 'b']),
  mkRule(1, 'b', 1, '$', ['b', '$']),
  mkRule(1, 'b', 1, 'a', ['b', 'a']),
  mkRule(1, 'b', 1, 'b', ['b', 'b']),

  mkRule(1, null, 2, '$', ['$']),
  mkRule(1, null, 2, 'a', ['a']),
  mkRule(1, null, 2, 'b', ['b']),
  mkRule(1, null, 2, 'b', ['b']),

  mkRule(2, 'a', 2, 'a', []),
  mkRule(2, 'b', 2, 'b', []),
  mkRule(2, null, 3, '$', ['$'])
];
let rulebook = mkRulebook(rules);

let npdaDesign = mkPDADesign(1, '$', [3], rulebook);

console.log(npdaDesign.accepts("aa"));
console.log(npdaDesign.accepts("babbaabbab"));
console.log(!npdaDesign.accepts("abb"));
console.log(!npdaDesign.accepts("baabaa"));
