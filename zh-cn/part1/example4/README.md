在稍早前面的教学中我提到了 [loaders](#loaders)。这些代码来帮助我们 require 非 JavaScript 的文件。在这种情况下，我们将需要 `style-loader` 和 `css-loader`。首先我们需要安装这些 loader：

    npm install --save-dev style-loader css-loader

现在安装完后，我们可以调整我们的 webpack 设定来引入 `css-loader`：

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

我们一个一个复习这些属性：

* [module](http://webpack.github.io/docs/configuration.html#module) - 设定你的文件选项。
  * [loaders](http://webpack.github.io/docs/configuration.html#module-loaders) - 我们为应用程序所指定的一个 loader 阵列。
    * test - 一个正规表达式来匹配 loader 的文件。
    * loaders - loader 用于这些匹配 test （正规表达式）的文件。

这个时候你执行 `webpack`，如果你 `require` 的文件结尾是 `.css`，然会我们会使用 `style` 和 `css` loader，将 CSS 加入到 bundle。

如果我们没有 loaders，我们会得到像是这样的错误：

```
ERROR in ./test.css
Module parse failed: /Users/Developer/workspace/tutorials/webpack/part1/example1/test.css
Line 1: Unexpected token {
You may need an appropriate loader to handle this file type.
```

**可选项目**

如果你想要使用 SCSS 而不是 CSS 你需要执行：

    npm install --save-dev sass-loader node-sass webpack

然后你的 loader 必须修改成：

```javascript
{
  test: /\.scss$/,
  loaders: ["style", "css", "sass"]
}
```

处理 LESS 也类似于这个方式。

要知道这些需要被指定的 loader 是有*顺序*的，这是一个很重要部分。在上面的范例，`sass` loader 是第一个应用在你的 `.scss` 文件，然后是 `css` loader，最后是 `style` loader。你可以看到，这些 loader 的应用模式是由右到左。
