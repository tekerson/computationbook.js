import { contains } from "ramda";

import * as R from "ramda";

export default function pda (currentConfiguration, acceptStates, rulebook) {
  let isAccepting = () => R.contains(currentConfiguration.state, acceptStates);
  let readCharacter = (character) => {
    currentConfiguration = rulebook.appliesTo(currentConfiguration, character)
      ? rulebook.followFreeMoves(rulebook.nextConfiguration(currentConfiguration, character))
      : currentConfiguration.stuck();
  };
  let readString = (string) => { string.split('').forEach(readCharacter); };

  currentConfiguration = rulebook.followFreeMoves(currentConfiguration);

  return Object.freeze({
    isAccepting,
    readCharacter,
    readString
  });
}
