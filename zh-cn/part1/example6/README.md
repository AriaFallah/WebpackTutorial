# 范例六 - 开发伺服器

现在我们想要实际在浏览器看到我们的网站，需要一个 web 伺服器来服务我们的代码。webpack 自带了方便的 `webpack-dev-server`，你需要在本机和全域安装。

    npm install -g webpack-dev-server
    npm install --save-dev webpack-dev-server

dev server 可以在浏览器看到你的网站外观也可以更快速的开发，是一个相当有用的资源。预设情况下你可以拜访 `http://localhost:8080`。不幸的是，像是 hot reload 的功能并不是内建的，还需要一些其他的设定。

这是 webpack 配置一个很棒的分离点，意思是说你可以将他分成用于「development」以及「production」。因为我们必须在这个教学中保持简单的方式，所不会有很大的改变，但是会介绍 webpack 很棒的可设置性。我们称他们为 `webpack.config.dev.js` 和 `webpack.config.prod.js`。

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

1. dev 配置省略了优化，当你不断的 rebuild 时，他们是不必要的。所以不需要 `webpack.optimize` plugins。

2. dev 配置需要对 dev server 做必要的设定，你可以到[这裡](https://webpack.github.io/docs/webpack-dev-server.html)了解更多。

总结：

* entry: 两个新的进入点将伺服器连结到浏览器，方便 HMR。
* devServer
  * contentBase: 服务的文件来自哪裡。
  * hot: 启用 HMR。
---

prod 配置不需要改变太多：

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

我也加入一个全新的属性在 dev 和 prod 的配置：

* [devtool](https://webpack.github.io/docs/configuration.html#devtool) - 这是协助 debug 的工具。基本上，当你得到一个错误，它会帮助你找到哪裡发生了错误，像是 chrome developer console。`source-map` 和 `cheap-eval-source-map` 之间的差异从文件说明有点难解释。我可以肯定的是，`source-map` 是用于 `production`，`cheap-eval-source-map` 是用于 `development`。

如果要执行 dev server，我们可以执行：

    webpack-dev-server --config webpack.config.dev.js

如果我们要 build production 的代码，我们可以执

    webpack --config webpack.config.prod.js


如果想要让这些指令使用的更容易，我们可以到 `package.json` 来设定简单的 script。

我们加入 `scripts` 属性到配置：

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

我们可以执行这些指令：

```
npm run build
npm run dev
```

你现在可以透过 `npm run dev`，并导到 `http://localhost:8080` 看到你的网站。

**备注：** 当我正在测试这个部份时，我了解到，当我修改 `index.html` 文件时，伺服器不能 hot reload。解决这个问题的方法在 [html-reload](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/html-reload)。这裡涵盖了一些 webpack 配置选项的有用资讯，我推荐你可以看一下，但是我把它分开了，因为我觉得会因为这个不太重要的原因，这会延长这个教学课程。
