import { dfa } from "./dfa";

export default function design (startState, acceptStates, rulebook) {
  let toFA = () => dfa(startState, acceptStates, rulebook),
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
  });
}
