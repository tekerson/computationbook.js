import { contains, any } from "ramda";

export default function npda (currentConfigurations, acceptStates, rulebook) {
  let isAccepting = () => any(conf => contains(conf.state, acceptStates), currentConfigurations);

  let readCharacter = (character) => {
    currentConfigurations = rulebook.appliesTo(currentConfigurations, character)
      ? rulebook.followFreeMoves(rulebook.nextConfigurations(currentConfigurations, character))
      : currentConfigurations.stuck();
  };

  let readString = (string) => {
    string.split('').forEach(readCharacter);
  };

  currentConfigurations = rulebook.followFreeMoves(currentConfigurations);

  return Object.freeze({
    isAccepting,
    readCharacter,
    readString
  });
}
