export default function rulebook (rules) {

  let ruleFor = (configuration, character) => rules.find(rule => rule.appliesTo(configuration, character));

  let nextConfiguration = (configuration, character) =>
        ruleFor(configuration, character).follow(configuration);

  let appliesTo = (configuration, character) => ruleFor(configuration, character) != null;

  let followFreeMoves = (configuration) => {
    if (appliesTo(configuration, null)) {
      return followFreeMoves(nextConfiguration(configuration, null));
    } else {
      return configuration;
    }
  };


  return Object.freeze({
    nextConfiguration,
    followFreeMoves
  });
}
