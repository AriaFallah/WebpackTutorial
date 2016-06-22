# 番外 - 讓你的 HTML 可以 hot reload

所以，當我測試的時候我才知道 `index.html` 不會被 hot reload！在之後搜尋的結果，我最後找到了[有幫助的答案](http://stackoverflow.com/questions/33183931/how-to-watch-index-html-using-webpack-dev-server-and-html-webpack-plugin)，
這需要一個 [loader](https://github.com/webpack/raw-loader) 來讓我們 hacky，也需要另一個 [plugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin) 來防止這個 hacky 到 production。

基本上要讓 webpack 可以 hot reload 我們的 HTML，我們需要 require 我們其中檔案之一，讓它變成我們 dependency tree 的一部份。為了做到這一點，我們將會使用 `raw-loader` loader，它可以 pull 我們的 HTML 變成字串到我們的 JavaScript，但是另外我們真正需要做的是：加入 HTML 到 dependency tree。

所以讓我們加入這個 loader 到我們的 dev 設定檔：

首先我們需要安裝：

    npm install --save-dev raw-loader

然我們加入：

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
      loader: "raw-loader" // loaders: ['raw-loader']，這個方式也是可以被接受的。
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```

這個時候當你執行 `webpack`，如果們 `require` 一個檔案它的附檔名是 `.html`，我們將使用 `raw-loader` loader，加入 HTML 到 bundle。

現在我們目前空的 `index.js` 檔案內我們可以這麼做。

```javascript
// index.js
require('./index.html')
```

如果你現在要檢查 hot reload 是否可以執行，但是你必須要知道我們只是 require `index.html` 到我們的 `index.js`，這麼做絕對與 hot reload 無關。我們不想要在 production 使用 hot reload，這就是為什麼我們要使用 [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin)。

這個 plugin 讓我們建立一個全域的常數到我們整個 bundle，我們可以命名任何常數，像是：`DONT_USE_IN_PRODUCTION: true`，但實際上，更普遍的做法會像是 `process.env.NODE_ENV: JSON.stringify('production')`。為什麼要 `JSON.stringify`？根據文件的解釋：

> 如果值是一個字串，它會被作為一個程式碼片段。

現在我們已經了解了，我們可以加入這個 plugin 到我們的 production 設定檔：

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

並在我們的 `index.js` 加入一個條件判斷：

```javascript
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
```

解決問題啦！在 production build 中，我們不需要 `index.html` 作為 dependency tree 的一部份，我們不需要 `index.html`，這也意味著我們不需要 `raw-loader`。
