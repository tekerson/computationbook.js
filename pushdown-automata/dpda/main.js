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


var palindromeRulebook = mkRulebook([
  mkRule(1, 'a', 1, '$', ['a', '$']),
  mkRule(1, 'a', 1, 'a', ['a', 'a']),
  mkRule(1, 'a', 1, 'b', ['a', 'b']),
  mkRule(1, 'b', 1, '$', ['b', '$']),
  mkRule(1, 'b', 1, 'a', ['b', 'a']),
  mkRule(1, 'b', 1, 'b', ['b', 'b']),
  mkRule(1, 'm', 2, '$', ['$']),
  mkRule(1, 'm', 2, 'a', ['a']),
  mkRule(1, 'm', 2, 'b', ['b']),
  mkRule(2, 'a', 2, 'a', []),
  mkRule(2, 'b', 2, 'b', []),
  mkRule(2, null, 3, '$', ['$'])
]);

let palindromeDesign = mkPDADesign(1, '$', [3], palindromeRulebook);

console.log(palindromeDesign.accepts("abmba"));
console.log(palindromeDesign.accepts("babbamabbab"));
console.log(!palindromeDesign.accepts("abmb"));
console.log(!palindromeDesign.accepts("baambaa"));
