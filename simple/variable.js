export var variable = (name) => Object.freeze({
  name,
  reducible: true,
  reduce: (environment) => {
    if (environment[name] === undefined) {
      throw new Error("Undefined Variable: " + name);
    }
    return environment[name];
  },
  toString: () => name.toString(),
});
