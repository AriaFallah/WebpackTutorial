# 番外 - 让你的 HTML 可以 hot reload

所以，当我测试的时候我才知道 `index.html` 不会被 hot reload！在之后搜寻的结果，我最后找到了[有帮助的答案](http://stackoverflow.com/questions/33183931/how-to-watch-index-html-using-webpack-dev-server-and-html-webpack-plugin)，
这需要一个 [loader](https://github.com/webpack/raw-loader) 来让我们 hacky，也需要另一个 [plugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin) 来防止这个 hacky 到 production。

基本上要让 webpack 可以 hot reload 我们的 HTML，我们需要 require 我们其中文件之一，让它变成我们 dependency tree 的一部份。为了做到这一点，我们将会使用 `raw-loader` loader，它可以 pull 我们的 HTML 变成字串到我们的 JavaScript，但是另外我们真正需要做的是：加入 HTML 到 dependency tree。

所以让我们加入这个 loader 到我们的 dev 配置：

首先我们需要安装：

    npm install --save-dev raw-loader

然我们加入：

```javascript
// webpack.config.dev.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.html$/,
      loader: "raw-loader" // loaders: ['raw-loader']，这个方式也是可以被接受的。
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```

这个时候当你执行 `webpack`，如果们 `require` 一个文件它的附档名是 `.html`，我们将使用 `raw-loader` loader，加入 HTML 到 bundle。

现在我们目前空的 `index.js` 文件内我们可以这么做。

```javascript
// index.js
require('./index.html')
```

如果你现在要检查 hot reload 是否可以执行，但是你必须要知道我们只是 require `index.html` 到我们的 `index.js`，这么做绝对与 hot reload 无关。我们不想要在 production 使用 hot reload，这就是为什么我们要使用 [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin)。

这个 plugin 让我们建立一个全域的常数到我们整个 bundle，我们可以命名任何常数，像是：`DONT_USE_IN_PRODUCTION: true`，但实际上，更普遍的做法会像是 `process.env.NODE_ENV: JSON.stringify('production')`。为什么要 `JSON.stringify`？根据文件的解释：

> 如果值是一个字串，它会被作为一个代码片段。

现在我们已经了解了，我们可以加入这个 plugin 到我们的 production 配置：

```javascript
// webpack.config.prod.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: ['./src/index'],
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  }
}
```

并在我们的 `index.js` 加入一个条件判断：

```javascript
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
```

解决问题啦！在 production build 中，我们不需要 `index.html` 作为 dependency tree 的一部份，我们不需要 `index.html`，这也意味着我们不需要 `raw-loader`。
