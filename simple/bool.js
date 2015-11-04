export var bool = (value) => Object.freeze({
  value,
  reducible: false,
  evaluate: (environment) => bool(value),
  toString: () => value.toString(),
});

export var and = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? and(left.reduce(environment), right) :
    right.reducible ? and(left, right.reduce(environment)) :
    bool(left.value && right.value),
  evaluate: (environment) => bool(left.evaluate(environment).value && right.evaluate(environment).value),
  toString: () => left.toString() + " ∧ " + right.toString(),
});

export var or = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? or(left.reduce(environment), right) :
    right.reducible ? or(left, right.reduce(environment)) :
    bool(left.value || right.value),
  evaluate: (environment) => bool(left.evaluate(environment).value || right.evaluate(environment).value),
  toString: () => left.toString() + " ∨ " + right.toString(),
});

export var not = (value) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    value.reducible ? not(value.reduce(environment)) :
    bool(!value.value),
  evaluate: (environment) => bool(!left.evaluate(environment).value),
  toString: () => "¬" + value.toString(),
});
