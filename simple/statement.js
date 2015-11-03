export var doNothing = (() => {
  let instance = Object.freeze({
    reducible: false,
    equals: (other) => other === doNothing,
    toString: () => 'do-nothing',
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

export var sequence = (first, second) => Object.freeze({
  reducible: true,
  reduce: (environment) => {
    if (first === doNothing()) {
      return [ second, environment ];
    }
    let [ first_reduced, environment_reduced ] = first.reduce(environment);
    return [ sequence(first_reduced, second), environment_reduced ];
  },
  toString: () => `${first}\n=> ${second}`,
});
