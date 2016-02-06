var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: ['./src/index'], // .js after index is optional
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  }
}
