import mkNPDA from "./npda";
import mkStack from "../pda/stack";
import mkConfiguration from "../pda/configuration";

export default function design (startState, bottomCharacter, acceptStates, rulebook) {
  let toPDA = () => {
    let startStack = mkStack([bottomCharacter]),
        startConfiguration = mkConfiguration(startState, startStack);
    return mkNPDA([startConfiguration], acceptStates, rulebook);
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
