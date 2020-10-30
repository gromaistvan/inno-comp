const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /pnpapi/ }),
  ],
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'server.bundle.js'
  }
};
