# 範例二 - 一個簡單的範例

你的目錄結構像是這樣：

```
MyDirectory
|- dist
|- src
   |- index.js
|- webpack.config.js

```

然後這是一個非常簡易的 webpack 設定：

```javascript
// webpack.config.js
var path = require('path')

module.exports = {
  entry: ['./src/index'], // .js after index is optional
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

我們一個一個複習這些屬性：

* [entry](https://webpack.github.io/docs/configuration.html#entry) - 這是你的 bundle 的進入點，這是我們在討論 [bundling](#bundling) 的部分。`entry` 是一個陣列，根據你的需求，webpack 允許可以有多個進入點，來產生多個 bundle 檔案。

* [output](https://webpack.github.io/docs/configuration.html#output) - 由 webpack 規定的形式輸出。
  * [path](https://webpack.github.io/docs/configuration.html#output-path) - bundle 檔案位置。
  * [filename](https://webpack.github.io/docs/configuration.html#output-filename) - bundle 檔案名稱。

當你執行 `webpack`，會在你的 dist 資料夾建立一個叫做 `bundle.js` 的檔案。
