import { head, tail } from "ramda";

export default function stack (content) {
  let push = (character) => stack([character, ...content]),
      pop = () => stack(tail(content)),
      top = () => head(content);

  return Object.freeze({
    push,
    pop,
    top,
    content
  });
}
