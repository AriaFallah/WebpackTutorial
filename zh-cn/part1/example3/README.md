# 范例三 - 介绍 Plugins

想像一下，你使用 webpack 将你的文件 bundle 在一起，然后你发现到 bundle 后的结果是 900KB。这裡有个问题，但是你可以透过 minify 你的 bundle 文件来做改善。如果需要做到这一点，你需要使用一个我在前面稍早提到的 [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) plugin。

此外，你需要在本机安装 webpack 才能实际的去使用这个 plugin。

    npm install --save-dev webpack

现在你可以 require webpack 并 minify 你的程式码。

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
我们一个一个複习这些属性：

* plugins - 一个可以储存你的 plugin 的阵列。
  * [webpack.optimize.UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) - Minify 你的程式码，并显示警告讯息。

这个时候，当我们执行 `webpack`，`UglifyJsPlugin` 通过像是移除所有空白的处理，可以将你的文件减少至 200KB。

你也可以加入 [OccurenceOrderPlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin)。

> 透过发生次数分配 module 和 chunk 的 id。一些常用的 Id 取得较低（短）的 id。这使得 id 可以预测，减少文件的大小和建议。

老实说，我不太确定底层的机制是如何工作的，但在目前包含 [webpack2 beta 的预设情况下](https://gist.github.com/sokra/27b24881210b56bbaff7)，所以我将它包含在内。

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

所以现在我们写了一个设定档让我们可以 minify 和 bundle 我们的 JavaScript。这个 bundle 文件可以被複製并贴到其他的专桉目录中，放入 `<script>` 就可以使用。如果*只有 JavaScript*，而且你只在乎关于 webpack 基本的使用，你可以直接跳到[结论](#conclusion)。
