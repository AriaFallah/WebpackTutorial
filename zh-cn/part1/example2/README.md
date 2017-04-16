# 范例二 - 一个简单的范例

你的目录结构像是这样：

```
MyDirectory
|- dist
|- src
   |- index.js
|- webpack.config.js

```

然后这是一个非常简易的 webpack 设定：

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

我们一个一个複习这些属性：

* [entry](https://webpack.github.io/docs/configuration.html#entry) - 这是你的 bundle 的进入点，这是我们在讨论 [bundling](#bundling) 的部分。`entry` 是一个阵列，根据你的需求，webpack 允许可以有多个进入点，来产生多个 bundle 文件。

* [output](https://webpack.github.io/docs/configuration.html#output) - 由 webpack 规定的形式输出。
  * [path](https://webpack.github.io/docs/configuration.html#output-path) - bundle 文件位置。
  * [filename](https://webpack.github.io/docs/configuration.html#output-filename) - bundle 文件名称。

当你执行 `webpack`，会在你的 dist 资料夹建立一个叫做 `bundle.js` 的文件。
