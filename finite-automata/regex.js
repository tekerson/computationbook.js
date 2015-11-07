function bracket (pattern, outerPrecedence) {
  if (pattern.precedence < outerPrecedence) {
    return "(" + pattern.toString() + ")";
  } else {
    return pattern.toString();
  }
}

export function empty () {
  let precedence = 3,
      toString = () => "";

  return Object.freeze({
    precedence,
    toString,
  })
}

export function literal (character) {
  let precedence = 3,
      toString = () => character;

  return Object.freeze({
    precedence,
    toString,
  })
}

export function concatenate (first, second) {
  let precedence = 1,
      toString = () => [first, second].map(pattern => bracket(pattern, precedence)).join('');

  return Object.freeze({
    precedence,
    toString,
  })
}

export function choose (first, second) {
  let precedence = 0,
      toString = () => [first, second].map(pattern => bracket(pattern, precedence)).join('|');

  return Object.freeze({
    precedence,
    toString,
  })
}

export function repeat (pattern) {
  let precedence = 2,
      toString = () => bracket(pattern, precedence) + "*";

  return Object.freeze({
    precedence,
    toString,
  })
}
