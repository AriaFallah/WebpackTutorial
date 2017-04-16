# 范例五 - 加入更多的 Plugin

现在我们的网站有一些基础了，但我们还需要实际的网站样式。

我们通过 [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) 来做，它让我们可以产生一个 HTML 页面使用现有的。我们将使用一个目前现有的 `index.html`。

首先我们需要安装 plugin：

    npm install --save-dev html-webpack-plugin@2

然后在我们的 webpack 设定档加入：

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

这个时候当你执行 `webpack`，因为我们指定一个 `HtmlWebpackPlugin` 和 `./src/index.html` 的 template，它会产生一个档桉叫做 `index.html` 在我们的 `dist` 资料夹，而网页的内容是 `./src/index.html`。

如果 `index.html` 作为 template 是空的也没用，现在是个好时机我们可以填入一些元素进去。

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

注意到我们没有放入一个 `bundle.js` 的 `<script>` 标籤到我们的 HTML。实际上 plugin 会自动的帮你处理。如果你放入 script，到头来你会载入两次相同的程式码。

而让我们加入一些基本的样式在 `styles.css`：

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

#### 备注

我觉得我应该提到 `html-webpack-plugin` 需要谨慎使用。对我来说，如果你真的只是简单的启用一个 SPA，webpack 应该只产生 HTML 档桉。这裡只需要一个 HTML 档桉，我不会推荐它来产生 12 个 HTML 档桉，当作一个学习经验。这意思不是说你不能使用 html 档桉之类的，像是 angular 指令，只需要 HTML template 档桉。在这个情况下你可以做类似像是：

```javascript
// ...directive stuff
template: require('./templates/button.html') // 使用 raw loader
```

相反的，它意味着你不应该做这样的事情︰

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

如果我这个部份我搞错了，请任何有这方面经验的人随时纠正我。
