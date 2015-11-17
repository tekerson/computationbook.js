import mkPDA from "./pda";
import mkStack from "./stack";
import mkConfiguration from "./configuration";

export default function design (startState, bottomCharacter, acceptStates, rulebook) {
  let toPDA = () => {
    let startStack = mkStack([bottomCharacter]),
        startConfiguration = mkConfiguration(startState, startStack);
    return mkPDA(startConfiguration, acceptStates, rulebook);
  };

  let accepts = (string) => {
    let dpa = toPDA();
    dpa.readString(string);
    return dpa.isAccepting();
  };

  return Object.freeze({
    toPDA,
    accepts
  });
}
