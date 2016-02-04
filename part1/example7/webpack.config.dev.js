var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-eval-source-mao',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index' // .js after index is optional
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/website.html'
    })
  ],
  modules: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
