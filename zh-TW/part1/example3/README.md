# 範例三 - 介紹 Plugins

想像一下，你使用 webpack 將你的檔案 bundle 在一起，然後你發現到 bundle 後的結果是 900KB。這裡有個問題，但是你可以透過 minify 你的 bundle 檔案來做改善。如果需要做到這一點，你需要使用一個我在前面稍早提到的 [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) plugin。

此外，你需要在本機安裝 webpack 才能實際的去使用這個 plugin。

    npm install --save-dev webpack

現在你可以 require webpack 並 minify 你的程式碼。

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
    })
  ]
}
```
我們一個一個複習這些屬性：

* plugins - 一個可以儲存你的 plugin 的陣列。
  * [webpack.optimize.UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) - Minify 你的程式碼，並顯示警告訊息。

這個時候，當我們執行 `webpack`，`UglifyJsPlugin` 通過像是移除所有空白的處理，可以將你的檔案減少至 200KB。

你也可以加入 [OccurenceOrderPlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin)。

> 透過發生次數分配 module 和 chunk 的 id。一些常用的 Id 取得較低（短）的 id。這使得 id 可以預測，減少檔案的大小和建議。

老實說，我不太確定底層的機制是如何工作的，但在目前包含 [webpack2 beta 的預設情況下](https://gist.github.com/sokra/27b24881210b56bbaff7)，所以我將它包含在內。

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
  ]
}
```

所以現在我們寫了一個設定檔讓我們可以 minify 和 bundle 我們的 JavaScript。這個 bundle 檔案可以被複製並貼到其他的專案目錄中，放入 `<script>` 就可以使用。如果*只有 JavaScript*，而且你只在乎關於 webpack 基本的使用，你可以直接跳到[結論](#conclusion)。
