"use strict";

let number = (value) => Object.freeze({
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

let multiply = (left, right) => Object.freeze({
  reducible: true,
  reduce: () =>
    left.reducible ? multiply(left.reduce(), right) :
    right.reducible ? multiply(left, right.reduce()) :
    number(left.value * right.value),
  toString: () => left.toString() + " * " + right.toString(),
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
  add(
    multiply(number(1), number(2)),
    multiply(number(3), number(4)));

machine(expression).run();
