const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', 'whatwg-fetch', './webpack/index.js'],
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    publicPath: '/assets/js/',
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: [
        'markdown',
        'javascript',
        'html'
      ]
    })
  ]
};
