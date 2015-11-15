import { any, contains } from "ramda";

export default function nfa (startState, acceptStates, rulebook) {
  let currentStates = rulebook.followFreeMoves(startState),
      currentState = () => currentStates,
      isAccepting = () => any(state => contains(state, acceptStates), currentStates),
      read = (character) => {
        currentStates = rulebook.followFreeMoves(rulebook.next(currentStates, character));
      },
      readString = (string) => string.split("").forEach(read);

  return Object.freeze({
    isAccepting,
    read,
    readString,
    currentState,
  });
}
