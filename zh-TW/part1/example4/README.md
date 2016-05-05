在稍早前面的教學中我提到了 [loaders](#loaders)。這些程式碼來幫助我們 require 非 JavaScript 的檔案。在這種情況下，我們將需要 `style-loader` 和 `css-loader`。首先我們需要安裝這些 loader：

    npm install --save-dev style-loader css-loader

現在安裝完後，我們可以調整我們的 webpack 設定來引入 `css-loader`：

```javascript
// webpack.config.js
var path = require('path')
var webpack = require('webpack')

module.exports = {
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
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  }
}
```

我們一個一個複習這些屬性：

* [module](http://webpack.github.io/docs/configuration.html#module) - 設定你的檔案選項。
  * [loaders](http://webpack.github.io/docs/configuration.html#module-loaders) - 我們為應用程式所指定的一個 loader 陣列。
    * test - 一個正規表達式來匹配 loader 的檔案。
    * loaders - loader 用於這些匹配 test （正規表達式）的檔案。

這個時候你執行 `webpack`，如果你 `require` 的檔案結尾是 `.css`，然會我們會使用 `style` 和 `css` loader，將 CSS 加入到 bundle。

如果我們沒有 loaders，我們會得到像是這樣的錯誤：

```
ERROR in ./test.css
Module parse failed: /Users/Developer/workspace/tutorials/webpack/part1/example1/test.css
Line 1: Unexpected token {
You may need an appropriate loader to handle this file type.
```

**可選項目**

如果你想要使用 SCSS 而不是 CSS 你需要執行：

    npm install --save-dev sass-loader node-sass webpack

然後你的 loader 必須修改成：

```javascript
{
  test: /\.scss$/,
  loaders: ["style", "css", "sass"]
}
```

處理 LESS 也類似於這個方式。

要知道這些需要被指定的 loader 是有*順序*的，這是一個很重要部分。在上面的範例，`sass` loader 是第一個應用在你的 `.scss` 檔案，然後是 `css` loader，最後是 `style` loader。你可以看到，這些 loader 的應用模式是由右到左。
