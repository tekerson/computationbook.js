export function machine (statement, environment) {
  let step = () => {
    [statement, environment] = statement.reduce(environment);
  };

  let run = () => {
    while (statement.reducible) {
      console.log(statement.toString());
      step();
    }
    console.log(statement.toString());
  };

  return {
    run
  };
};
