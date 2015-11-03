import { number, add, subtract, multiply, divide, lessThan } from "./number";
import { bool, and, or, not }  from "./bool";
import { variable } from "./variable";

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
