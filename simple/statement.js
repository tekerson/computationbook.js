export var doNothing = (() => {
  let instance = Object.freeze({
    reducible: false,
    equals: (other) => other === doNothing,
    evaluate: (environment) => environment,
    toJS: () => `(function (e) { return e; })`,
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
  toJS: () => `(function (e) { return Object.assign({}, e, {"${name}": ${expression.toJS()}(e)}); })`,
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
  toJS: () => `(function(e) {
    if (${condition.toJS()}(e)) {
      return ${consequence.toJS()}(e);
    } else {
      return ${alternative.toJS()}(e);
    }
  })`,
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
  toJS: () => `(function (e) { return ${second.toJS()}(${first.toJS()}(e)); })`,
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
  toJS: () => `(function (e) {
    while (${condition.toJS()}(e)) {
      e = ${body.toJS()}(e);
    };
    return e;
  })`,
  toString: () => `while (${condition}) { ${body} }`,
});
