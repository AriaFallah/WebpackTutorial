# 番外 - 提取你的 CSS

好了，你现在已经完成了，但是在 production 你不想要将你的 CSS 文件放入到你的 JavaScript。为了这个目的，我们将会使用 [Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin)。

    npm install --save-dev extract-text-webpack-plugin

我们需要改变我们的 webpack prod 设定文件：

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

这些修改来自[官方 repository](https://github.com/webpack/extract-text-webpack-plugin) README 的描述。如果你想要知道它是怎么运作的，可以到官方相关文件做更深入的了解。

> 它在进入点将每个 require("style.css") chunk 成独立的 css 输出文件。所以你的样式不会在 JavaScript 内，但是它会被分离到一个 css bundle 文件（styles.css）。如果你的 stylesheet 很大，在 JavaScript bundle 时，stylesheet bundle 会被平行的载入，可以加快载入的速度。

如果现在你执行 `npm run build`，你的 CSS 会被独立成一个文件，有趣的是，它已经被引入到你的 `index.html` 了。

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
