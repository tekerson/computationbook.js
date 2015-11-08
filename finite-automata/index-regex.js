import * as Regex from "./regex";

let pattern =
    Regex.repeat(
      Regex.choose(
        Regex.concatenate(Regex.literal('a'), Regex.literal('b')),
        Regex.literal('a')));

console.log(pattern.toString());

console.log(Regex.concatenate(Regex.literal('a'), Regex.literal('b')).matches('ab'));
