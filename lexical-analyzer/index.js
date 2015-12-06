import { reject, zip, maxBy, map, reduce, head, tail } from "ramda";

export const GRAMMAR = [
  { token: 'i', pattern: 'if' },
  { token: 'e', pattern: 'else' },
  { token: 'w', pattern: 'while' },
  { token: 'd', pattern: 'do-nothing' },
  { token: '(', pattern: '\\(' },
  { token: ')', pattern: '\\)' },
  { token: '{', pattern: '\\{' },
  { token: '}', pattern: '\\}' },
  { token: ';', pattern: ';' },
  { token: '=', pattern: '=' },
  { token: '+', pattern: '\\+' },
  { token: '*', pattern: '\\*' },
  { token: '<', pattern: '<' },
  { token: 'n', pattern: '[0-9]+' },
  { token: 'b', pattern: 'true|false' },
  { token: 'v', pattern: '[a-z]+' }
];

export default function lexicalAnalyzer (string) {

  let analyze = () => {
    let tokens = [];
    while (moreTokens()) {
      tokens.push(nextToken());
    }
    return tokens;
  };

  let moreTokens = () => string.length !== 0;

  let nextToken = () => {
    let [rule, match] = ruleMatching(string);
    string = stringAfter(match);
    return rule['token'];
  };

  let ruleMatching = (string) => {
    let matches = map(rule => matchAtBeginning(rule['pattern'], string), GRAMMAR);
    let rulesWithMatches = reject(([rule, match]) => match === null, zip(GRAMMAR, matches));
    return ruleWithLongestMatch(rulesWithMatches);
  };

  let matchAtBeginning = (pattern, string) => string.match(`^${pattern}`);

  let ruleWithLongestMatch = (rulesWithMatches) =>
      (rulesWithMatches.length === 0)
      ? []
      : reduce(maxBy(([rule, match]) => match.toString().length), head(rulesWithMatches), tail(rulesWithMatches));

  let stringAfter = (match) => string.slice(match.toString().length).trim();

  return Object.freeze({
    analyze
  });
}
