import { number, add, subtract, multiply, divide, lessThan } from "./number";
import { bool, and, or, not }  from "./bool";
import { variable } from "./variable";
import { doNothing, assign, ifelse, sequence } from "./statement";

let machine = (statement, environment) => {
  let step = () => {
    [statement, environment] = statement.reduce(environment);
  };

  let run = () => {
    while (statement.reducible) {
      console.log(statement.toString());
      step();
    }
    console.log(statement.toString());
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

let statement1 = assign("a", number(5));

let statement2 =
    ifelse(lessThan(variable("a"), number(3)),
           assign("x", bool(false)),
           assign("x", expression));

let statement = sequence(statement1, statement2);

machine(statement, { b: number(6) }).run();
