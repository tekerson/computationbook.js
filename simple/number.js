import { bool } from "./bool";

export var number = (value) => Object.freeze({
  value,
  reducible: false,
  evaluate: (environment) => number(value),
  toString: () => value.toString(),
});

export var add = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? add(left.reduce(environment), right) :
    right.reducible ? add(left, right.reduce(environment)) :
    number(left.value + right.value),
  evaluate: (environment) => number(left.evaluate(environment).value + right.evaluate(environment).value),
  toString: () => left.toString() + " + " + right.toString(),
});

export var subtract = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? subtract(left.reduce(environment), right) :
    right.reducible ? subtract(left, right.reduce(environment)) :
    number(left.value - right.value),
  evaluate: (environment) => number(left.evaluate(environment).value - right.evaluate(environment).value),
  toString: () => left.toString() + " - " + right.toString(),
});

export var multiply = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? multiply(left.reduce(environment), right) :
    right.reducible ? multiply(left, right.reduce(environment)) :
    number(left.value * right.value),
  evaluate: (environment) => number(left.evaluate(environment).value * right.evaluate(environment).value),
  toString: () => left.toString() + " * " + right.toString(),
});

export var divide = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? divide(left.reduce(environment), right) :
    right.reducible ? divide(left, right.reduce(environment)) :
    number(left.value / right.value),
  evaluate: (environment) => number(left.evaluate(environment).value / right.evaluate(environment).value),
  toString: () => left.toString() + " / " + right.toString(),
});

export var lessThan = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? lessThan(left.reduce(environment), right) :
    right.reducible ? lessThan(left, right.reduce(environment)) :
    bool(left.value < right.value),
  evaluate: (environment) => number(left.evaluate(environment).value < right.evaluate(environment).value),
  toString: () => left.toString() + " < " + right.toString(),
});
