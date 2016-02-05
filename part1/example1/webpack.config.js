module.exports = {
  entry: [
    './index',
  ],
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  }
}
