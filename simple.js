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

let add = (left, right) => Object.freeze({
  reducible: true,
  reduce: () =>
    left.reducible ? add(left.reduce(), right) :
    right.reducible ? add(left, right.reduce()) :
    number(left.value + right.value),
  toString: () => left.toString() + " + " + right.toString(),
});

let subtract = (left, right) => Object.freeze({
  reducible: true,
  reduce: () =>
    left.reducible ? subtract(left.reduce(), right) :
    right.reducible ? subtract(left, right.reduce()) :
    number(left.value - right.value),
  toString: () => left.toString() + " - " + right.toString(),
});

let multiply = (left, right) => Object.freeze({
  reducible: true,
  reduce: () =>
    left.reducible ? multiply(left.reduce(), right) :
    right.reducible ? multiply(left, right.reduce()) :
    number(left.value * right.value),
  toString: () => left.toString() + " * " + right.toString(),
});

let divide = (left, right) => Object.freeze({
  reducible: true,
  reduce: () =>
    left.reducible ? divide(left.reduce(), right) :
    right.reducible ? divide(left, right.reduce()) :
    number(left.value / right.value),
  toString: () => left.toString() + " / " + right.toString(),
});

let lessThan = (left, right) => Object.freeze({
  reducible: true,
  reduce: () =>
    left.reducible ? lessThan(left.reduce(), right) :
    right.reducible ? lessThan(left, right.reduce()) :
    bool(left.value < right.value),
  toString: () => left.toString() + " < " + right.toString(),
});

let machine = (expression) => {
  let step = () => {
    expression = expression.reduce();
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
    lessThan(
      divide(
        subtract(
          add(
            multiply(number(1), number(2)),
            multiply(number(3), number(4))),
          add(number(4), number(2))),
        number(2)),
      number(5));

machine(expression).run();
