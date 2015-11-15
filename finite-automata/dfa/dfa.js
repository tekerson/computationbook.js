import { contains } from "ramda";

export function dfa (currentState, acceptStates, rulebook) {
  let isAccepting = () => contains(currentState, acceptStates),
      read = (character) => currentState = rulebook.next(currentState, character),
      readString = (string) => string.split("").forEach(read);

  return Object.freeze({
    isAccepting,
    read,
    readString,
  });
}
