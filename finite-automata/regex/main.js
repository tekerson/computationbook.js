import * as Regex from ".";

let pattern =
    Regex.repeat(
      Regex.choose(
        Regex.concatenate(Regex.literal('a'), Regex.literal('b')),
        Regex.literal('a')));

console.log(pattern.toString());

console.log(pattern.matches('a'));
console.log(pattern.matches('ab'));

console.log(Regex.concatenate(Regex.literal('a'), Regex.literal('b')).matches('ab'));
console.log(Regex.choose(Regex.literal('a'), Regex.literal('b')).matches('b'));
console.log(Regex.repeat(Regex.literal('a')).matches('aaaa'));
