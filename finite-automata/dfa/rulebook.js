export default function rulebook (rules) {
  let next = (state, character) => ruleFor(state, character).follow(),
      ruleFor = (state, character) => rules.find((rule) => rule.applies(state, character));

  return Object.freeze({
    next,
    rules,
  });
}
