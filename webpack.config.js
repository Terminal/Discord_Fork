const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./webpack/index.js",
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: "bundle.js"
  }
};
