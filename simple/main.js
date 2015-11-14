import { machine } from ".";
import { number, add, subtract, multiply, divide, lessThan } from "./number";
import { bool, and, or, not }  from "./bool";
import { variable } from "./variable";
import { doNothing, assign, ifelse, sequence, loopWhile } from "./statement";

let loop =
    sequence(
      sequence(
        assign("acc", number(2)),
        sequence(
          assign("x", number(1)),
          loopWhile(lessThan(variable("x"), number(5)),
                    sequence(
                      assign("acc", multiply(variable("acc"), number(2))),
                      assign("x", add(variable("x"), number(1))))))),
      assign("output", variable("acc")));

machine(loop, {}).run();
console.log(loop.evaluate({}));
console.log(eval(loop.toJS())({}));
