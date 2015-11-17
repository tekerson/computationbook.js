const stuckState = Symbol("STUCK");

export default function configuration (state, stack) {
  let stuck = () => configuration(stuckState, stack),
      isStuck = () => state === stuckState;

  return Object.freeze({
    state,
    stack,
    stuck,
    isStuck
  });
}
