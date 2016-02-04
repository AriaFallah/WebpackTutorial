module.exports = {
  entry: ['./src/index'], // .js after index is optional
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
