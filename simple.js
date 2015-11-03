"use strict";

let number = (value) => Object.freeze({
  value,
  reducible: false,
  toString: () => value.toString(),
});

let bool = (value) => Object.freeze({
  value,
  reducible: false,
  toString: () => value.toString(),
});

let variable = (name) => Object.freeze({
  name,
  reducible: true,
  reduce: (environment) => {
    if (environment[name] === undefined) {
      throw new Error("Undefined Variable: " + name);
    }
    return environment[name];
  },
  toString: () => name.toString(),
});

let add = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? add(left.reduce(environment), right) :
    right.reducible ? add(left, right.reduce(environment)) :
    number(left.value + right.value),
  toString: () => left.toString() + " + " + right.toString(),
});

let subtract = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? subtract(left.reduce(environment), right) :
    right.reducible ? subtract(left, right.reduce(environment)) :
    number(left.value - right.value),
  toString: () => left.toString() + " - " + right.toString(),
});

let multiply = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? multiply(left.reduce(environment), right) :
    right.reducible ? multiply(left, right.reduce(environment)) :
    number(left.value * right.value),
  toString: () => left.toString() + " * " + right.toString(),
});

let divide = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? divide(left.reduce(environment), right) :
    right.reducible ? divide(left, right.reduce(environment)) :
    number(left.value / right.value),
  toString: () => left.toString() + " / " + right.toString(),
});

let lessThan = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? lessThan(left.reduce(environment), right) :
    right.reducible ? lessThan(left, right.reduce(environment)) :
    bool(left.value < right.value),
  toString: () => left.toString() + " < " + right.toString(),
});

let and = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? and(left.reduce(environment), right) :
    right.reducible ? and(left, right.reduce(environment)) :
    bool(left.value && right.value),
  toString: () => left.toString() + " ∧ " + right.toString(),
});

let or = (left, right) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    left.reducible ? or(left.reduce(environment), right) :
    right.reducible ? or(left, right.reduce(environment)) :
    bool(left.value || right.value),
  toString: () => left.toString() + " ∨ " + right.toString(),
});

let not = (value) => Object.freeze({
  reducible: true,
  reduce: (environment) =>
    value.reducible ? not(value.reduce(environment)) :
    bool(!value.value),
  toString: () => "¬" + value.toString(),
});

let machine = (expression, environment) => {
  let step = () => {
    expression = expression.reduce(environment);
  };

  let run = () => {
    while (expression.reducible) {
      console.log(expression.toString());
      step();
    }
    console.log(expression.toString());
  };

  return {
    run
  };
};

let expression =
    not(or(bool(false),
        lessThan(
          divide(
            subtract(
              add(
                multiply(variable('a'), number(2)),
                multiply(number(3), number(4))),
              add(number(4), number(2))),
            number(2)),
          variable('b'))));

machine(expression, { a: number(2), b: number(6) }).run();
