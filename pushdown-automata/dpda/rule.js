import { reverse } from "ramda";

import mkConfiguration from "./configuration";

export default function rule (state, character, nextState, popCharacter, pushCharacters) {

  let appliesTo = (configuration, char) =>
        state == configuration.state
        && popCharacter == configuration.stack.top()
        && char == character;

  let nextStack = (configuration) => {
    let popped = configuration.stack.pop();
    return reverse(pushCharacters).reduce((stack, char) => stack.push(char), popped);
  };

  let follow = (configuration) => mkConfiguration(nextState, nextStack(configuration));

  return Object.freeze({
    appliesTo,
    follow
  });
}
