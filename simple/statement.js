export var doNothing = (() => {
  let instance = Object.freeze({
    reducible: false,
    equals: (other) => other === doNothing,
    toString: () => 'no-nothing',
  });

  return () => instance;
})();
