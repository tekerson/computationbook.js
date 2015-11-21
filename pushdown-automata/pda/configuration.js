import * as R from "ramda";

const stuckState = "STUCK";

export default function configuration (state, stack) {
  let stuck = () => configuration(stuckState, stack),
      isStuck = () => state === stuckState;

  let equals = (other) =>
        R.equals(state, other.state)
        && R.equals(stack.content, other.stack.content)
        && R.equals(isStuck(), other.isStuck());

  return Object.freeze({
    state,
    stack,
    stuck,
    isStuck,
    equals
  });
}
