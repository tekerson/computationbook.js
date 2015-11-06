export function design (fa, startState, acceptStates, rulebook) {
  let toFA = () => fa(startState, acceptStates, rulebook),
      accepts = (string) => {
        let newFA = toFA();
        newFA.readString(string);
        return newFA.isAccepting();
      };

  return Object.freeze({
    accepts,
  });
}
