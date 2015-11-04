export var doNothing = (() => {
  let instance = Object.freeze({
    reducible: false,
    equals: (other) => other === doNothing,
    evaluate: (environment) => environment,
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
  evaluate: (environment) => Object.assign({}, environment, { [name]: expression.evaluate(environment) }),
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
  evaluate: (environment) => {
    if (condition.evaluate(environment).value === true) {
      return consequence.evaluate(environment);
    } else {
      return alternative.evaluate(environment);
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
  evaluate: (environment) => second.evaluate(first.evaluate(environment)),
  toString: () => `${first}; ${second}`,
});

export var loopWhile = (condition, body) => Object.freeze({
  reducible: true,
  reduce: (environment) => [ ifelse(condition, sequence(body, loopWhile(condition, body)), doNothing()), environment ],
  evaluate: function (environment) {
    if (condition.evaluate(environment).value === true) {
      return loopWhile(condition, body).evaluate(body.evaluate(environment));
    } else {
      return environment;
    }
  },
  toString: () => `while (${condition}) { ${body} }`,
});
