module.exports = {
  entry: {
    "simple": "./simple/main.js",
    "dfa": "./finite-automata/dfa/main.js",
    "nfa": "./finite-automata/nfa/main.js",
    "nfa-simulation": "./finite-automata/nfa/main-simulation.js",
    "regex": "./finite-automata/regex/main.js",
    "dpda": "./pushdown-automata/dpda/main.js"
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/build"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
