export var variable = (name) => Object.freeze({
  name,
  reducible: true,
  reduce: (environment) => environment[name],
  evaluate: (environment) => environment[name],
  toString: () => name.toString(),
});
