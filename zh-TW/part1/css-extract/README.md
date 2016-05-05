# 番外 - 提取你的 CSS

好了，你現在已經完成了，但是在 production 你不想要將你的 CSS 檔案放入到你的 JavaScript。為了這個目的，我們將會使用　[Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin)。

    npm install --save-dev extract-text-webpack-plugin

我們需要改變我們的 webpack prod 設定檔案：

```javascript
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    }),
    new ExtractTextPlugin("styles.css")
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }]
  }
}
```

這些修改來自[官方 repo](https://github.com/webpack/extract-text-webpack-plugin) README 的描述。如果你想要知道它是怎麼運作的，可以到官方相關文件做更深入的了解。

> 它在進入點將每個 require("style.css") chunk 成獨立的 css 輸出檔案。所以你的樣式不會在 JavaScript 內，但是它會被分離到一個 css bundle 檔案（styles.css）。如果你的 stylesheet 很大，在 JavaScript bundle 時，stylesheet bundle 會被平行的載入，可以加快載入的速度。

如果現在你執行 `npm run build`，你的 CSS 會必獨立成一個檔案，有趣的是，它已經被引入到你的 `index.html` 了。

```html
<html>
<head>
  <title>Webpack Tutorial</title>
<link href="styles.css" rel="stylesheet"> <------ MAGICALLY ADDED
</head>
<body>
  <h1>Very Website</h1>
  <section id="color"></section>
  <button id="button">Such Button</button>
<script src="bundle.js"></script></body>
</html>
```
