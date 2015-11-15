import nfa from "./nfa";

export default function design (startState, acceptStates, rulebook) {
  let toFA = () => nfa([startState], acceptStates, rulebook),
      toFAIn = (currentState) => nfa(currentState, acceptStates, rulebook),
      accepts = (string) => {
        let newFA = toFA();
        newFA.readString(string);
        return newFA.isAccepting();
      };

  return Object.freeze({
    startState,
    acceptStates,
    rulebook,
    accepts,
    toFA,
    toFAIn,
  });
}
