module.exports = {
  entry: { 
    "simple": "./simple/index.js",
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
