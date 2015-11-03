export var doNothing = (() => {
  let instance = Object.freeze({
    reducible: false,
    equals: (other) => other === doNothing,
    toString: () => 'no-nothing',
  });

  return () => instance;
})();

export var assign = (name, expression) => Object.freeze({
  reducible: true,
  reduce: (environment) => {
    if (expression.reducible) {
      return [ assign(name, expression.reduce(environment)), environment ];
    }
    return [ doNothing(), Object.assign({}, environment, { [name]: expression })]
  },
  toString: () => `${name} := ${expression}`,
});
