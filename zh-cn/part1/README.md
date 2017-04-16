# Webpack 初学者教学课程 Part 1 - Webpack 简介 :zap:

对于像我这样的人来说，第一次接触到 webpack 是像是这些 repository：

* https://github.com/davezuko/react-redux-starter-kit
* https://github.com/webpack/react-starter

虽然这些 repository 放在一起很棒，但它们不一定是最好的学习工具。
像我的情况，我试着了解发生了那些事情，但还是很困惑，所以我决定不从这些大量而且分散的资源来理解。

我希望这个教学课程可以让 webpack 更容易的学习。

## 需求

至少希望你了解基本的 node.js 和 npm。

## 贡献

我很乐意接受任何所有的贡献或是修正。如果你有任何问题，可以将这些问题发成 issue。如果我有错误的话，请将问题指出。最后，如果你觉得我漏了些什么，或者可以将某些部分解释的更好，留下一个 issue 或者是发送 Pull Request。

## 目录

* [为什么要 Webpack？](#为什么要-webpack)
* [基础](#基础)
  * [安装](#安装)
  * [Bundling](#bundling)
  * [Loaders](#loaders)
  * [Plugins](#plugins)
* [你的 webpack 设定文件](#你的-webpack-设定文件)
  * [一个简单的范例](#一个简单的范例)
  * [介绍 Plugins](#介绍-plugins)
* [一个更完整的范例](#一个更完整的范例)
  * [介绍 Loaders](#介绍-loaders)
  * [加入更多的 Plugins](#加入更多的-plugins)
  * [开发伺服器](#开发伺服器)
  * [开始撰写程式](#开始撰写程式)
* [结论](#结论)
* [反思](#反思)

## 为什么要 Webpack？

因为每个 react 或 redux 教学课程都假设你知道什么是 webpack。:cry:

以下这些是更现实的原因，你可能会需要使用 webpack。

你可以：
  * 将你的 js 文件 Bundle 变成单一的文件
  * 在你的前端程式码中使用 npm packages
  * 撰写 JavaScript ES6 或 ES7（需要透过 babel 来帮助）
  * Minify 或优化程式码
  * 将 LESS 或 SCSS 转换成 CSS
  * 使用 HMR（Hot Module Replacement）
  * 包含任何类型的文件到你的 JavaScript
  * 更多进阶的东西，暂时不介绍

##### 为什么我需要这些功能？

* Bundle JS 文件 - 让你可以撰写模组化的 JavaScript，但是你不需要 include 每个 JavaScript `<script>` 的文件（如果你需要多个 JavaScript 文件可以透过设定来完成）。

* 在你的前端程式码中使用 npm packages - npm 在 internet 上是一个大型的 open source 生态系统。可以储存或发佈你的程式码，你可以到 npm 看一看，可能包含你想要的前端套件。

* ES6 和 ES7 - 加入一些 JavaScript 的新功能，让撰写程式码可以更容易而且更强大，[请看这裡的介绍](https://github.com/DrkSephy/es6-cheatsheet)。

* Minify 或优化程式码 - 减少你的文件大小，好处包括像是更快的将页面载入。

* 将 LESS 或 SCSS 转换成 CSS - 使用更好的方式来撰写 CSS，
[如果你不熟悉的话，这裡有一些介绍](http://alistapart.com/article/why-sass)。

* 使用 HMR - 增加开发速度。每当你储存程式码的时候，它可以注入到网页，而不需将网页刷新。如果当编辑你的程式码，你需要维护页面的状态，这是非常方便的。

* 包含任何类型的文件到你的 JavaScript - 减少对其他 build 工具的需要，让你可以透过程式的方式修改或使用这些文件。

## 基础

### 安装

你需要全域安装来使用 webpack 大部分的功能：

    npm install -g webpack

然而 webpack 有些功能，像是优化的 plugins，需要你将它安装在本机。像这种情况下你需要：

    npm install --save-dev webpack

### 命令

如果要执行 webpack：

    webpack

如果你想要 webpack 在你每次变更储存文件后自动执行 build ：

    webpack --watch

如果你想要使用自订的 webpack 设定档：

    webpack --config myconfig.js

### Bundling

[范例一](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example1)

![Official Dependency Tree](http://i.imgur.com/YU4xBPQ.png)

Webpack 简称为模组整合工具。如果你想要深入的话，可以拜访 [JavaScript Modules: A Beginner’s Guide](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.jw1txw6uh) 和 [JavaScript Modules Part 2: Module Bundling](https://medium.com/@preethikasireddy/javascript-modules-part-2-module-bundling-5020383cf306#.lfnspler2) 这两篇优秀的解释文章：

我们要保持它的简单，webpack 运作的方式是透过指定一个单一文件作为你的进入点。
这个文件会是 tree 的 root。然后你每次 `require` 一个文件从其他文件并把它加入到 tree。当你执行 `webpack`，所有的文件和 module 都会被 bundle 成一个文件。

这裡是一个简单的范例：

![Dependency Tree](http://i.imgur.com/dSghwwL.png)

根据这样的情况，你可以有这样的目录：

```
MyDirectory
|- index.js
|- UIStuff.js
|- APIStuff.js
|- styles.css
|- extraFile.js
```

这些可能是你文件的内容：

```javascript
// index.js
require('./styles.css')
require('./UIStuff.js')
require('./APIStuff.js')

// UIStuff.js
var React = require('React')
React.createClass({
  // stuff
})

// APIStuff.js
var fetch = require('fetch') // fetch polyfill
fetch('https://google.com')
```

```css
/* styles.css */
body {
  background-color: rgb(200, 56, 97);
}
```

当你执行 `webpack`，你会得到一个这个 tree 的 bundle 内容，虽然 `extraFile.js` 也是在相同的目录中，但它不是被 bundle 的一部份，因为它在 `index.js` 没有被 `require`。

`bundle.js` 看起来会像：

```javascript
// contents of styles.css
// contents of UIStuff.js + React
// contents of APIStuff.js + fetch
```

被 bundle 的这些文件是你明确所 require 进来的文件。

### Loaders

你可能会注意到，我在上方的范例做了一些奇怪的事情。我在 JavaScript 文件中 `require` 一个 css 文件。

关于 webpack 真的很酷，有趣的事情是，你可以 `require` 其他不只是 JavaScript 的文件。

在 webpack 这些东西我们称为 loader。使用这些 loader，你可以 `require` 任何 `.css` 和 `.png` 到 `.html` 档。

例如在上图我有：

```javascript
// index.js
require('./styles.css')
```

如果在我的 webpack 设定档中，inclue [style-loader](https://github.com/webpack/style-loader) 和 [css-loader](https://github.com/webpack/css-loader)，这是可行的，还可以实际应用 CSS 到我的网页。

你可以在 webpack 使用多个 loader，这裡只是一个单一的例子。

### Plugins

Plugin，顾名思义就是替 webpack 增加额外的功能。其中常使用到的一个 plugin 是 `UglifyJsPlugin`，它可以 minify 你的 JavaScript 程式码。我们之后会介绍如何使用。

## 你的 webpack 设定文件

Webpack 没办法直接使用，需要透过你的需求来做设定。为了做到这一点，你需要建立一个文件叫做：

    webpack.config.js

预设情况下，webpack 会去识别这个档名。如果你选择使用不同的档名，你需要加入 `--config` 来指定你的文件名称。

### 一个简单的范例
[范例二](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example2)

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
  entry: ['./src/index'], // 在 index 文件后的 .js 副档名是可选的
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

我们一个一个複习这些属性：

* [entry](https://webpack.github.io/docs/configuration.html#entry) - 这是你的 bundle 的进入点，我们曾在前面 [bundling](#bundling) 的部分讨论过它。`entry` 是一个阵列，根据你的需求，webpack 允许可以有多个进入点，来产生多个 bundle 文件。

* [output](https://webpack.github.io/docs/configuration.html#output) - 宣告 webpack 输出的形式。
  * [path](https://webpack.github.io/docs/configuration.html#output-path) - 存放 bundle 文件的位置。
  * [filename](https://webpack.github.io/docs/configuration.html#output-filename) - bundle 文件名称。

根据上面的设定，当你执行 `webpack`，会在你的 dist 资料夹建立一个叫做 `bundle.js` 的文件。

### 介绍 Plugins

[范例三](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example3)

想像一下，你使用 webpack 将你的文件 bundle 在一起，然后你发现到 bundle 后的结果是 900KB。这是个问题，但是你可以透过 minify 你的 bundle 文件来做改善。要做到这一点，你需要使用一个我在前面稍早提到的 [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) plugin。

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

* plugins - 一个含有你的 plugins 的阵列。
  * [webpack.optimize.UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) - Minify 你的程式码，并不显示警告讯息。

如此一来，当我们执行 `webpack`，`UglifyJsPlugin` 透过像是移除所有空白等处理，可以将你的文件减少至 200KB。

你也可以加入 [OccurrenceOrderPlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin)。

> 根据调用次数指定 module 和 chunk 的 id。越常用的 id 较小（短）。这使得 id 可以预测，可以减少文件的大小，并是推荐的方法。

老实说，我不太确定底层的机制是如何工作的，但在根据目前 [webpack2 beta 的预设情况下](https://gist.github.com/sokra/27b24881210b56bbaff7)，所以我将它包含在内。

```JavaScript
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
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
```

所以现在我们写了一个设定档让我们可以 minify 和 bundle 我们的 JavaScript。这个 bundle 文件可以被複製并贴到其他的专桉目录中，放入 `<script>` 就可以使用。如果你只需要瞭解怎么用 webpack 处理 *只有 JavaScript* 的基本情况，你可以直接跳到[结论](#conclusion)。

## 一个更完整的范例

此外，比起单单使用 JavaScript，使用 webpack 可以做的更多，你可以避免複製、贴上并透过 webpack 管理你的整个专桉。

在下面的部份中，我们要使用 webpack 建立一个非常简单的网站。如果你想要跟着这个范例，建立一个像下方的目录结构：

```
MyDirectory
|- dist
|- src
   |- index.js
   |- index.html
   |- styles.css
|- package.json
|- webpack.config.js
```

#### 内容

1. [介绍 Loaders](#介绍-loaders) - 我们将会加入 loader，这可以让我 bundle 加入的 CSS。
2. [加入更多的 Plugins](#加入更多的-plugins) - 我们加入一个 plugin 来帮助我们建立和使用一个 HTML 文件。
3. [开发伺服器](#开发伺服器) - 我们会将 webpack 设定文件分为 `development` 和 `production` 两种版本，然后使用 webpack-dev-server 来查看我们的网站并启用 HMR。
4. [开始撰写程式](#开始撰写程式) - 我们来实际写一些 JavaScript。

#### 介绍 Loaders

[范例四](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example4)

在稍早前面的教学课程中我提到了 [loaders](#loaders)。这些程式码来帮助我们 require 非 JavaScript 的文件。在这种情况下，我们将需要 `style-loader` 和 `css-loader`。首先我们需要安装这些 loader：

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
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  }
}
```

我们一个一个查看这些新属性：

* [module](http://webpack.github.io/docs/configuration.html#module) - 设定你的文件选项。
  * [loaders](http://webpack.github.io/docs/configuration.html#module-loaders) - 我们为应用程式所指定的一个 loader 阵列。
    * test - 一个正规表达式，用来找出要套用 loader 的文件。
    * loaders - 指定哪些 loader 是用于匹配前述 test （正规表达式）的文件。

这个时候你执行 `webpack`，如果你 `require` 的文件结尾是 `.css`，我们会使用 `style` 和 `css` loader，将 CSS 加入到 bundle。

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

#### 加入更多的 Plugins

[范例五](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example5)

现在我们的网站已经有了样式的基本架构，我们还需要一个实际的页面来套用这些样式。

我们透过 [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) 来做，它让我们可以产生一个 HTML 页面，或是使用现有的页面。我们将使用一个目前现有的 `index.html`。

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
    new webpack.optimize.OccurrenceOrderPlugin(),
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

这个时候当你执行 `webpack`，因为我们指定了一个搭配 `./src/index.html` template 的 `HtmlWebpackPlugin` ，它会产生一个文件叫做 `index.html` 在我们的 `dist` 资料夹，而网页的内容是 `./src/index.html`。

`index.html` 作为 template 如果是空的就没意义了，现在是个好时机我们可以填入一些元素进去。

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

#### 开发伺服器

[范例六](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example6)

现在我们想要实际在浏览器看到我们的网站，这就需要一个 web 伺服器来跑我们的程式码。webpack 自带了方便的 `webpack-dev-server`，你需要在本机和全域安装。

    npm install -g webpack-dev-server
    npm install --save-dev webpack-dev-server

dev server 可以在浏览器看到你的网站外观以及可以更快速的开发，是一个相当有用的资源。预设情况下你可以拜访 `http://localhost:8080`。不幸的是，像是 hot reloading 的功能并不是内建的，还需要一些其他的设定。

这裡是 webpack 设定档一个很棒的分离点，你可以将它分成用于「development」以及用于「production」。因为我们在这个教学课程中将尽量保持简单，所以两个设定之间不会有非常大的不同，不过这是 webpack 极度可设置性的一个入门。我们将两个设定档命名为 `webpack.config.dev.js` 和 `webpack.config.prod.js`。

```javascript
// webpack.config.dev.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```


**改变**

1. dev 设定档省略了优化，因为当你不断的 rebuild 时，它们是不必要的。所以拿掉了 `webpack.optimize` plugins。

2. dev 设定档需要对 dev server 做必要的设定，你可以到[这裡](https://webpack.github.io/docs/webpack-dev-server.html)了解更多。

总结：

* entry: 两个新的进入点将伺服器连结到浏览器，方便 HMR。
* devServer
  * contentBase: 服务的文件来自哪裡。
  * hot: 启用 HMR。

prod 设定档不需要改变太多：

```javascript
// webpack.config.prod.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

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
    new webpack.optimize.OccurrenceOrderPlugin(),
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

我也加入一个全新的属性在 dev 和 prod 设定档：

* [devtool](https://webpack.github.io/docs/configuration.html#devtool) - 这是协助 debug 的工具。基本上，当你得到一个错误，它会帮助你找到哪裡发生了错误，像是 chrome developer console。`source-map` 和 `cheap-eval-source-map` 之间的差异从文件说明有点难解释。我可以肯定的是，`source-map` 是用于 `production`，`cheap-eval-source-map` 是用于 `development`。

如果要执行 dev server，我们可以执行：

    webpack-dev-server --config webpack.config.dev.js

如果我们要 build production 的程式码，我们可以执行：

    webpack --config webpack.config.prod.js


如果想要让这些指令使用的更容易，我们可以到 `package.json` 来设定简单的 script。

我们加入 `scripts` 属性到设定档：

```javascript
// package.json
{
  //...
  "scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev"  : "webpack-dev-server --config webpack.config.dev.js"
  }
  //...
}
```

我们可以执行这些指令：

```
npm run build
npm run dev
```

你现在可以透过 `npm run dev`，并导到 `http://localhost:8080` 看到你的网站。

**备注：** 当我正在测试这个部份时，我了解到，当我修改 `index.html` 文件时，伺服器不能 hot reload。解决这个问题的方法在 [html-reload](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/html-reload)。这裡涵盖了一些 webpack 设定档选项的有用资讯，我推荐你可以看一下，但是我把它分开了，因为我觉得会因为这个不太重要的原因，这会延长这个教学课程。

#### 开始撰写程式

[范例七](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example7)

大多数的人似乎会慌乱的原因是因为：webpack 事实上需要通过这些取得的进入点来撰写 JavaScript；然而我们现在已经到达了这个教学课程最高潮的部分。

如果你还没准备好：执行 `npm run dev`，以及导到 `http://localhost:8080`。设定 dev server 是不是可以 hot reload。在你每次储存你专桉所编辑的任何一个文件部份时，浏览器将会重新载入来显示你的修改。

我们也需要 npm package，为了来示范如何在前端使用它们。

    npm install --save pleasejs

PleaseJS 是一个随机色彩的产生器，其中我们需要在按钮中加入 hook 来改变我们的 div 颜色。

```javascript
// index.js

// 接受 hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // 网页现在有了样式
var Please = require('pleasejs')
var div = document.getElementById('color')
var button = document.getElementById('button')

function changeColor() {
  div.style.backgroundColor = Please.make_color()
}

button.addEventListener('click', changeColor)
```

有趣的是，[为了让 Hot Module Replacement 可以执行](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html#what-is-needed-to-use-it)，你需要加入下面的程式码：

```javascript
if (module.hot) {
  module.hot.accept()
}
```

在一个 module 或是它的父 module。

然后我们就完成了！

**备注：** 你可能已经注意到在你的 css 被使用之前有些 delay，或许事实上你讨厌将你的 css 放入到 JavaScript 文件中。我留了另一个范例：[css-extract](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/css-extract)，描述如何将你的 CSS 放在不同的文件。

## 结论

我希望这些是有帮助的。

首先 Webpack 最重要的它是一个模组整合工具。它是一个高度模组化的工具，事实上，它并不是被限于在 ES6 和 React。

现在考虑到：

* Part 2 将解决使用 Webpack 透过 Babel 将 ES6 转换到 ES5。
* Part 3 将解决使用 Webpack 和 React + Babel。

因为这是这常见的例子。

## 反思

恭喜！你已经让你个按钮去改变你的 div 的颜色！webpack 是不是很棒？

没错是的！但是，如果你所做的事情只是让按钮去改变 div 的颜色，它可能不值得你去写像是这样的设定。如果你想这么做的话，你可能会感到...疲累。:anguished:
