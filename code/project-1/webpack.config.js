const path = require('path');

module.exports = {
  entry: './ts/main.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  }
};
