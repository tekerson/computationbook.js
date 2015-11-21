import { difference, chain, uniq } from "ramda";

export default function rulebook (rules) {
  let rulesFor = (config, character) => rules.filter(rule => rule.appliesTo(config, character)),
      followRulesFor = (config, character) => rulesFor(config, character).map(rule => rule.follow(config)),
      nextConfigurations = (configs, character) => uniq(chain(config => followRulesFor(config, character), configs)),
      appliesTo = (config, character) => rulesFor(config, character) != null;

  let followFreeMoves = (configurations) => {
    let more = nextConfigurations(configurations, null);
    if (difference(more, configurations).length === 0) {
      return configurations;
    } else {
      return followFreeMoves(configurations.concat(more));
    }
  };

  return Object.freeze({
    nextConfigurations,
    followFreeMoves,
    appliesTo
  });
}
