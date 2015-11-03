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


export var ifelse = (condition, consequence, alternative) => Object.freeze({
  reducible: true,
  reduce: (environment) => {
    if (condition.reducible) {
      return [ ifelse(condition.reduce(environment), consequence, alternative), environment ];
    }
    if (condition.value === true) {
      return [ consequence, environment ];
    } else {
      return [ alternative, environment ];
    }
  },
  toString: () => `if (${condition}) { ${consequence} } else { ${alternative} }`,
});
