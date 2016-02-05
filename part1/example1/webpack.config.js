module.exports = {
  entry: [
    './index',
  ],
  output: {
    filename: 'bundle.js',
  },
  modules: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  }
}
