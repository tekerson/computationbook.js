import { map } from "ramda";

import {
  design as mkPDADesign,
  rulebook as mkRulebook,
  stack as mkStack,
  rule as mkRule
} from "../pushdown-automata/npda";

import lexicalAnalyzer, {
  GRAMMAR
} from "../lexical-analyzer";

let startRule = mkRule(1, null, 2, "$", ["S", "$"]);

let symbolRules = [
  mkRule(2, null, 2, "S", ["W"]),
  mkRule(2, null, 2, "S", ["A"]),

  mkRule(2, null, 2, "W", ["w", "(", "E", ")", "{", "S", "}"]),

  mkRule(2, null, 2, "A", ["v", "=", "E"]),

  mkRule(2, null, 2, "E", ["L"]),

  mkRule(2, null, 2, "L", ["M", "<", "L"]),
  mkRule(2, null, 2, "L", ["M"]),

  mkRule(2, null, 2, "M", ["T", "*", "M"]),
  mkRule(2, null, 2, "M", ["T"]),

  mkRule(2, null, 2, "T", ["n"]),
  mkRule(2, null, 2, "T", ["v"]),
];

var tokenRules = map(rule => mkRule(2, rule.token, 2, rule.token, []), GRAMMAR);

let stopRule = mkRule(2, null, 3, "$", ["$"]);

let rules = [startRule, stopRule, ...symbolRules, ...tokenRules];
let rulebook = mkRulebook(rules);

export default mkPDADesign(1, "$", [3], rulebook);
