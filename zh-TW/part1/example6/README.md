# 範例六 - 開發伺服器

現在我們想要實際在瀏覽器看到我們的網站，需要一個 web 伺服器來服務我們的程式碼。webpack 自帶了方便的 `webpack-dev-server`，你需要在本機和全域安裝。

    npm install -g webpack-dev-server
    npm install --save-dev webpack-dev-server

dev server 可以在瀏覽器看到你的網站外觀也可以更快速的開發，是一個相當有用的資源。預設情況下你可以拜訪 `http://localhost:8080`。不幸的是，像是 hot reload 的功能並不是內建的，還需要一些其他的設定。

這是 webpack 設定檔一個很棒的分離點，意思是說你可以將他分成用於「development」以及「production」。因為我們必須在這個教學中保持簡單的方式，所不會有很大的改變，但是會介紹 webpack 很棒的可設置性。我們稱他們為 `webpack.config.dev.js` 和 `webpack.config.prod.js`。

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
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```


**修改**

1. dev 設定檔省略了優化，當你不斷的 rebuild 時，他們是不必要的。所以不需要 `webpack.optimize` plugins。

2. dev 設定檔需要對 dev server 做必要的設定，你可以到[這裡](https://webpack.github.io/docs/webpack-dev-server.html)了解更多。

總結：

* entry: 兩個新的進入點將伺服器連結到瀏覽器，方便 HMR。
* devServer
  * contentBase: 服務的檔案來自哪裡。
  * hot: 啟用 HMR。
---

prod 設定檔不需要改變太多：

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
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
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

我也加入一個全新的屬性在 dev 和 prod 的設定檔：

* [devtool](https://webpack.github.io/docs/configuration.html#devtool) - 這是協助 debug 的工具。基本上，當你得到一個錯誤，它會幫助你找到哪裡發生了錯誤，像是 chrome developer console。`source-map` 和 `cheap-eval-source-map` 之間的差異從文件說明有點難解釋。我可以肯定的是，`source-map` 是用於 `production`，`cheap-eval-source-map` 是用於 `development`。

如果要執行 dev server，我們可以執行：

    webpack-dev-server --config webpack.config.dev.js

如果我們要 build production 的程式碼，我們可以執

    webpack --config webpack.config.prod.js


如果想要讓這些指令使用的更容易，我們可以到 `package.json` 來設定簡單的 script。

我們加入 `scripts` 屬性到設定檔：

```javascript
// package.json
{
  //...
  "scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev"  : "webpack-dev-server --config webpack.config.dev.js"
  }
  //...
}
```

我們可以執行這些指令：

```
npm run build
npm run dev
```

你現在可以透過 `npm run dev`，並導到 `http://localhost:8080` 看到你的網站。

**備註：** 當我正在測試這個部份時，我了解到，當我修改 `index.html` 檔案時，伺服器不能 hot reload。解決這個問題的方法在 [html-reload](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/html-reload)。這裡涵蓋了一些 webpack 設定檔選項的有用資訊，我推薦你可以看一下，但是我把它分開了，因為我覺得會因為這個不太重要的原因，這會延長這個教學課程。
