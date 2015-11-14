module.exports = {
  entry: {
    "simple": "./simple/index.js",
    "dfa": "./finite-automata/index.js",
    "nfa": "./finite-automata/index-nfa.js",
    "nfa-simulation": "./finite-automata/index-nfa-simulation.js",
    "regex": "./finite-automata/index-regex.js",
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/build",
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
