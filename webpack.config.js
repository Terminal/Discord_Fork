const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', 'whatwg-fetch', './webpack/index.js'],
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
};
