export var variable = (name) => Object.freeze({
  name,
  reducible: true,
  reduce: (environment) => environment[name],
  evaluate: (environment) => environment[name],
  toJS: () => `(function (e) { return e["${name}"]; })`,
  toString: () => name.toString(),
});
