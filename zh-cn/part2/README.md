# Webpack 初学者教学课程 Part 2 - 使用 Webpack 与 Babel :zap:

现在我们已经学习了基础的 webpack 使用方式，为了撰写 ES6，我们要学会利用 babel 6，因为 ES6 是 JavaScript 新的规范。

如果你曾经撰写过 ES6，应该就不想再回去写 ES5 了。如果你还没有机会撰写 ES6，很大的原因可能是因为*不了解*开发环境该使用哪些配置选项，因为那些配置很令人沮丧。

我希望这个教学课程可以让这些过程可以变得更容易。

## 需求

1. 如果你还没有准备好，请先阅读 [part 1][2]
2. 有关 ES6 的概述，[es6-cheatsheet](https://github.com/DrkSephy/es6-cheatsheet) 是一个很棒的资源。

## 贡献

我很乐意接受任何所有的贡献或是修正。如果你有任何问题，可以将这些问题发成 issue。如果我有错误的话，请将问题指出。最后，如果你觉得我漏了些什么，或者可以将某些部分解释的更好，留下一个 issue 或者是发送 Pull Request。

## 目录

* [Babel](#babel)
  * [Babel 是做什么用的？](#babel-是做什么用的)
  * [配置 Babel](#配置-babel)
* [Webpack](#webpack)
  * [一个新的 Loader](#一个新的-loader)
* [我们完成了？](#我们完成了)
  * [Require ES6 的 Module](#require-es6-的-module)
* [额外收穫](#额外收穫)
  * [Production 环境变数以及 Webpack 和 Babel](#production-环境变数以及-webpack-和-babel)
  * [加入 Lint](#加入-lint)
* [结论](#结论)


## Babel

如果你想要有更深入的说明，和更细微的配置 babel，请参考这个[手册][1]。我在这里说明的是一些基本的配置。

### Babel 是做什么用的？

简单来说，babel 让你可以更完整的使用 JavaScript 的 ES6 feature，因为目前大部分的浏览器和环境都不支援，所以将它转换成 ES5，让它可以更广泛的被支援。

这个 ES6 的代码，目前*只*有最新的浏览器才支援。

```javascript
const square = n => n * n;
```

它会被转成像是：

```javascript
var square = function square(n) {
  return n * n;
};
```

让你可以执行在任何支援 JavaScript 的地方。

### 配置 Babel

另一个工具、另一个配置文件。这个时候我们有个文件叫做：

    .babelrc

感谢啊！`.babelrc` 文件只有一行代码而已。

```javascript
{
  "presets": ["es2015", "stage-2"]
}
```

你只需要指定一个 `presets` 选项，下面是描述的摘录：

> JavaScript 也有一些可能成为标准的提桉，正在 TC39（ECMAScript 标准背后的委员会）的程序中。

> 这个程序被分为 5 个 statge（0-4）。如果提桉获得更多的同意，通过各个 stage，就很容易被接受纳入标准中，最后在 stage 4 中被接受纳入标准。

> 注意，这里没有 stage-4 的 preset，它只是作为的 `es2015` 的 preset。
> 以上。

总结以上，`presets` 就是一些打包了 `plugins` 的 bundles，它们将一些功能加入到你在撰写的代码。`es2015` 中的功能，肯定会出现在 ES6 的官方版本，而 stages 0-3 的 presets ，则是未来 JavaScript 规范的一些提桉，现在还在草桉阶段。如果选择的 stage 越低，你使用的 features 之后将不支援的风险越高。

从我的经验来说，我至少需要 `stage-2`，让我可以使用一个叫作 [object spread](https://github.com/sebmarkbage/ecmascript-rest-spread) 的东西。你可以在[这里](https://github.com/tc39/ecma262)看看其他的提桉，然后决定你要使用哪个 stage。

总之，如果要使用到这些 presets，我们需要安装它们：

    npm install --save-dev babel-preset-es2015 babel-preset-stage-2

而实际上你全部需要做的事情就只有这个。

## Webpack

我们可以使用与 [part 1-范例七](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example7)相同的配置，但是需要加入 ES6 所需要的功能。

目前配置：

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

和

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

### 一个新的 Loader

如果要将我们的代码转换成 ES5，我们需要通过执行一个新的 loader 叫作 `babel-loader`，它和 `babel-core` 有依赖关係。这个 loader 使用了我们的 `.babelrc` 配置来了解和转换我们的代码。

    npm install --save-dev babel-loader babel-core

我们在 dev 和 prod 这两个配置中加入：

```javascript
// 为了节省篇幅我只显示「loaders」的部分。

// webpack.config.dev.js 和 webpack.config.prod.js
module: {
  loaders: [{
    test: /\.css$/,
    loaders: ['style', 'css']
  }, {
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, 'src')
  }]
}
```

一件**非常重要**的事情，请注意 `include` 属性的用法。当我们执行 `webpack` 时，因为我们在 `test` 有配置 `/.js$/`，webpack 会在你的 dependency tree 每一个 `js` 文件尝试执行 babel loader。

你可以看出这有什么问题吗？要是我 `require('bluebird')`，或是任何其他大型的 `npm` package 会怎样？它会藉由 `babel-loader` 尝试执行整个 **node_modules**，这样大量的执行会延长你的 build 过程。

`include` 可以防止这个这个问题，loader 只会套用在你所指定 `src` 目录下的 `.js` 文件。

另一个方式是，你可以将 `include: path.join(__dirname, 'src')` 改变成 `exclude: /node_modules/`，这意思是除了 `node_modules` 目录外其他都包括。更多信息可以在[这里](https://webpack.github.io/docs/configuration.html#module-loaders)找到。

## 我们完成了？

老实说，我以为这个教学会更长，但看起来我忘记了「加入 babel」这件事实际上非常简单。现在我们可以使用 ES6 语法来更新先前 `index.js` 的代码了：

```javascript
// index.js

// 接受 hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // 网页现在有了样式
const Please = require('pleasejs')

const div = document.getElementById('color')
const button = document.getElementById('button')
const changeColor = () => div.style.backgroundColor = Please.make_color()

button.addEventListener('click', changeColor)
```

### Require ES6 的 Module

另一件事情，注意到我们现在可以使用 ES6 的 module 系统。例如：

```javascript
const Please = require('pleasejs')
```

我们可以修改成：

```javascript
import Please from 'pleasejs'
```

## 额外收穫

既然前面没花太多时间，我将再讨论两个很重要且有用的主题。

### 在 Webpack 和 Babel 配置 production 环境变数

#### Webpack

如果我们不想要在 production 执行部分的代码，我们可以使用方便的 [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin)。

这个 plugin 让我们可以为我们整个 bundle 建立全域的常数，我们可以命名任何常数，像是：`DONT_USE_IN_PRODUCTION: true`，但是大多普遍的方式会是 `process.env.NODE_ENV: JSON.stringify('production')`，这会是更好的选择。这是因为许多程序可以识别并根据 `process.env.NODE_ENV` 来使用额外的功能和优化你的代码。

为什么要 `JSON.stringify`？因为根据文件的解释：

> 如果值是一个字串，它会被作为一个代码片段。

这意思说一个 `'production'` 只会是一个错误。如果你认为 `JSON.stringify` 很奇怪，一个有效替代方式是 `'"production"'`。

你的 plugin 阵列现在看起来应该像：

```javascript
plugins: [
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
]
```

现在，假如我们不想要在 production 上执行一些代码，我们可以放入一个 if 条件式：

```javascript
if (process.env.NODE_ENV !== 'production') {
  // not for production
}
```

在我们目前的专桉中，如果在 production 环境下，我们可以排除 hot reload：

```javascript
// 在开发环境下接受 hot module reloading
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept()
  }
}
```

#### Babel

将我们的 production 变数定义为 `process.env.NODE_ENV` 有其他额外的好处。

[根据手册][1]

> 「目前环境」是使用 process.env.BABEL_ENV。当找不到 BABEL_ENV 时，
它会退回去找 NODE_ENV，如果也找不到 NODE_ENV，目前环境将设为预设值 "development"。

这个意思说 babel 环境会 match 到我们的 webpack 环境。

我们可以利用这一点，只要通过在我们的 `.babelrc` 加入 `env` 配置，就可以使用开发环境：

```javascript
{
  "presets": ["es2015", "stage-2"],
  "env": {
    // 只发生在 NODE_ENV 没有被定义或是被配置为 'development'
    "development": {
      // 当 NODE_ENV 是 production 忽略！
  }
}
```

当我们介绍 [React Transform HMR](https://github.com/gaearon/react-transform-hmr)，我们将使用这个在 part 3 和 react。


### 加入 Lint

如果你看过任何关于 Webpack/React 专桉的 seed/starter，你可能看过一个文件叫做 `.eslintrc`。如果你不是使用 IDE，而是使用像是 Atom、Sublime、Ecmas、Vim 等等，eslint 提供语法和风格的检查，指出你的错误。此外，即使你正在使用 IDE，它可以提供更多功能，并确保整个专桉代码风格统一。

请注意，如果你相要在编辑器内使用它，你需要安装一个套件，例如我使用 Atom [linter-eslint](https://github.com/AtomLinter/linter-eslint)。

如果要减少我们手动撰写配置，我们可以充分的利用继承，使用他人的配置。我喜欢使用基于 [airbnb 的风格指南](https://github.com/airbnb/javascript)配置。

开始之前，我们须安装 eslint 和 airbnb 的配置：

    npm install -g eslint
    npm install --save-dev eslint eslint-config-airbnb

我们的配置看起来像：

```javascript
// .eslintrc
{
  "extends": "airbnb/base" //使用 'airbnb/base' ，因为 'airbnb' 是假设使用 react
}
```

然而，因为 linting 是非常**固执**的，我喜欢将它调整一些。如果你想要知道这些规则的含意，或是根据你的喜好调整他们，可以查看[这里](http://eslint.org/docs/rules/)：

```javascript
// .eslintrc
{
  "extends": "airbnb/base",
  "rules": {
    "comma-dangle": 0,
    "no-console": 0,
    "semi": [2, "never"],
    "func-names": 0,
    "space-before-function-paren": 0,
    "no-multi-spaces": 0
  }
}
```

另外，eslint 内建不支援和分辨 babel 语法，所以我们需要安装两个套件：

    npm install --save-dev babel-eslint eslint-plugin-babel

调整我们的配置，再一次的加入 [babel 指定规则](https://github.com/babel/eslint-plugin-babel)：

```javascript
// .eslintrc
{
  "extends": "airbnb/base",
  "parser": "babel-eslint",
  "rules": {
    "comma-dangle": 0,
    "no-console": 0,
    "semi": [2, "never"],
    "func-names": 0,
    "space-before-function-paren": 0,
    "no-multi-spaces": 0,
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 1,
    "babel/object-shorthand": 1,
    "babel/arrow-parens": 1,
    "babel/no-await-in-loop": 1
  },
  "plugins": [
    "babel"
  ]
}
```

最后，在我们的 package.json 文件中的 scripts 加入 lint 会是个好主意。

```javascript
// package.json
"scripts": {
  "build": "webpack --config webpack.config.prod.js",
  "dev": "webpack-dev-server --config webpack.config.dev.js",
  "lint": "eslint src"
}
```

当你执行 `npm run lint` 来确保你的代码没有违反你指定的规则。

## 结论

我已经把所有这一切的最终结果放入到[范例一](https://github.com/neighborhood999/WebpackTutorial/tree/master/part2/example1)。如果你仍然有不理解的地方，可以在 issue 提出你的问题。

所以现在我们可以轻鬆的撰写 ES6 代码，此外，也让我们了解到如何撰写配置 :tada:！

然而，你有能力从头开始撰写它，并不表示你一定要这么做。为了方便，[我有建立一个 repository](https://github.com/AriaFallah/minimal-babel-starter) 让你 clone 下来开始，这是根据这份教学建立的基本文件。

对未来的期望：

* Part 3 将会加入 React
* Part 4 将会涵盖更多进阶的 webpack 功能

感谢你的阅读！

[1]: https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md
[2]: https://github.com/AriaFallah/WebpackTutorial/tree/master/part1
