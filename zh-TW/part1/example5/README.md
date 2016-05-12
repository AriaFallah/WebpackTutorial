# 範例五 - 加入更多的 Plugin

現在我們的網站有一些基礎了，但我們還需要實際的網站樣式。

我們通過 [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) 來做，它讓我們可以產生一個 HTML 頁面使用現有的。我們將使用一個目前現有的 `index.html`。

首先我們需要安裝 plugin：

    npm install --save-dev html-webpack-plugin@2

然後在我們的 webpack 設定檔加入：

```javascript
// webpack.config.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

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

這個時候當你執行 `webpack`，因為我們指定一個 `HtmlWebpackPlugin` 和 `./src/index.html` 的 template，它會產生一個檔案叫做 `index.html` 在我們的 `dist` 資料夾，而網頁的內容是 `./src/index.html`。

如果 `index.html` 作為 template 是空的也沒用，現在是個好時機我們可以填入一些元素進去。

```html
<html>
<head>
  <title>Webpack Tutorial</title>
</head>
<body>
  <h1>Very Website</h1>
  <section id="color"></section>
  <button id="button">Such Button</button>

</body>
</html>
```

注意到我們沒有放入一個 `bundle.js` 的 `<script>` 標籤到我們的 HTML。實際上 plugin 會自動的幫你處理。如果你放入 script，到頭來你會載入兩次相同的程式碼。

而讓我們加入一些基本的樣式在 `styles.css`：

```css
h1 {
  color: rgb(114, 191, 190);
  text-align: center;
}

#color {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

button {
  cursor: pointer;
  display: block;
  width: 100px;
  outline: 0;
  border: 0;
  margin: 20px auto;
}
```

#### 備註

我覺得我應該提到 `html-webpack-plugin` 需要謹慎使用。對我來說，如果你真的只是簡單的啟用一個 SPA，webpack 應該只產生 HTML 檔案。這裡只需要一個 HTML 檔案，我不會推薦它來產生 12 個 HTML 檔案，當作一個學習經驗。這意思不是說你不能使用 html 檔案之類的，像是 angular 指令，只需要 HTML template 檔案。在這個情況下你可以做類似像是：

```javascript
// ...directive stuff
template: require('./templates/button.html') // 使用 raw loader
```

相反的，它意味著你不應該做這樣的事情︰

```javascript
new HtmlWebpackPlugin
  template: './src/index.html'
}),
new HtmlWebpackPlugin({
  template: './src/button.html'
}),new HtmlWebpackPlugin({
  template: './src/page2.html'
})
```

如果我這個部份我搞錯了，請任何有這方面經驗的人隨時糾正我。
