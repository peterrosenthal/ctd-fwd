const path = require('path');

module.exports = {
  entry: './main.js',
  module: {
    rules: [
      {
        test: /\.js?$/
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  }
};
