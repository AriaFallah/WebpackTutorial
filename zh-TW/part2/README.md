# Webpack 初學者教學課程 Part 2 - 使用 Webpack 與 Babel :zap:

現在我們已經學習了基礎的 webpack 使用方式，為了撰寫 ES6，我們要學會利用 babel 6，因為 ES6 是 JavaScript 新的規範。

如果你曾經撰寫過 ES6，應該就不想再回去寫 ES5 了。如果你還沒有機會撰寫 ES6，很大的原因可能是因為*不了解*開發環境該使用哪些設定選項，因為那些設定很令人沮喪。

我希望這個教學課程可以讓這些過程可以變得更容易。

## 需求

1. 如果你還沒有準備好，請先閱讀 [part 1][2]
2. 有關 ES6 的概述，[es6-cheatsheet](https://github.com/DrkSephy/es6-cheatsheet) 是一個很棒的資源。

## 貢獻

我很樂意接受任何所有的貢獻或是修正。如果你有任何問題，可以將這些問題發成 issue。如果我有錯誤的話，請將問題指出。最後，如果你覺得我漏了些什麼，或者可以將某些部分解釋的更好，留下一個 issue 或者是發送 Pull Request。

## 目錄

* [Babel](#babel)
  * [Babel 是做什麼用的？](#babel-是做什麼用的)
  * [設定 Babel](#設定-babel)
* [Webpack](#webpack)
  * [一個新的 Loader](#一個新的-loader)
* [我們完成了？](#我們完成了)
  * [Require ES6 的 Module](#require-es6-的-module)
* [額外收穫](#額外收穫)
  * [Production 環境變數以及 Webpack 和 Babel](#production-環境變數以及-webpack-和-babel)
  * [加入 Lint](#加入-lint)
* [結論](#結論)


## Babel

如果你想要有更深入的說明，和更細微的設定 babel，請參考這個[手冊][1]。我在這裡說明的是一些基本的設定。

### Babel 是做什麼用的？

簡單來說，babel 讓你可以更完整的使用 JavaScript 的 ES6 feature，因為目前大部分的瀏覽器和環境都不支援，所以將它轉換成 ES5，讓它可以更廣泛的被支援。

這個 ES6 的程式碼，目前*只*有最新的瀏覽器才支援。

```javascript
const square = n => n * n;
```

它會被轉成像是：

```javascript
var square = function square(n) {
  return n * n;
};
```

讓你可以執行在任何支援 JavaScript 的地方。

### 設定 Babel

另一個工具、另一個設定檔案。這個時候我們有個檔案叫做：

    .babelrc

感謝啊！`.babelrc` 檔案只有一行程式碼而已。

```javascript
{
  "presets": ["es2015", "stage-2"]
}
```

你只需要指定一個 `presets` 選項，下面是描述的摘錄：

> JavaScript 也有一些可能成為標準的提案，正在 TC39（ECMAScript 標準背後的委員會）的程序中。

> 這個程序被分為 5 個 statge（0-4）。如果提案獲得更多的同意，通過各個 stage，就很容易被接受納入標準中，最後在 stage 4 中被接受納入標準。

> 注意，這裡沒有 stage-4 的 preset，它只是作為的 `es2015` 的 preset。
> 以上。

總結以上，`presets` 就是一些打包了 `plugins` 的 bundles，它們將一些功能加入到你在撰寫的程式碼。`es2015` 中的功能，肯定會出現在 ES6 的官方版本，而 stages 0-3 的 presets ，則是未來 JavaScript 規範的一些提案，現在還在草案階段。如果選擇的 stage 越低，你使用的 features 之後將不支援的風險越高。

從我的經驗來說，我至少需要 `stage-2`，讓我可以使用一個叫作 [object spread](https://github.com/sebmarkbage/ecmascript-rest-spread) 的東西。你可以在[這裡](https://github.com/tc39/ecma262)看看其他的提案，然後決定你要使用哪個 stage。

總之，如果要使用到這些 presets，我們需要安裝它們：

    npm install --save-dev babel-preset-es2015 babel-preset-stage-2

而實際上你全部需要做的事情就只有這個。

## Webpack

我們可以使用與 [part 1-範例七](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example7)相同的設定檔，但是需要加入 ES6 所需要的功能。

目前設定檔：

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

### 一個新的 Loader

如果要將我們的程式碼轉換成 ES5，我們需要透過執行一個新的 loader 叫作 `babel-loader`，它和 `babel-core` 有依賴關係。這個 loader 使用了我們的 `.babelrc` 設定檔來了解和轉換我們的程式碼。

    npm install --save-dev babel-loader babel-core

我們在 dev 和 prod 這兩個設定檔中加入：

```javascript
// 為了節省篇幅我只顯示「loaders」的部分。

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

一件**非常重要**的事情，請注意 `include` 屬性的用法。當我們執行 `webpack` 時，因為我們在 `test` 有設定 `/.js$/`，webpack 會在你的 dependency tree 每一個 `js` 檔案嘗試執行 babel loader。

你可以看出這有什麼問題嗎？要是我 `require('bluebird')`，或是任何其他大型的 `npm` package 會怎樣？它會藉由 `babel-loader` 嘗試執行整個 **node_modules**，這樣大量的執行會延長你的 build 過程。

`include` 可以防止這個這個問題，loader 只會套用在你所指定 `src` 目錄下的 `.js` 檔案。

另一個方式是，你可以將 `include: path.join(__dirname, 'src')` 改變成 `exclude: /node_modules/`，這意思是除了 `node_modules` 目錄外其他都包括。更多資訊可以在[這裡](https://webpack.github.io/docs/configuration.html#module-loaders)找到。

## 我們完成了？

老實說，我以為這個教學會更長，但看起來我忘記了「加入 babel」這件事實際上非常簡單。現在我們可以使用 ES6 語法來更新先前 `index.js` 的程式碼了：

```javascript
// index.js

// 接受 hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // 網頁現在有了樣式
const Please = require('pleasejs')

const div = document.getElementById('color')
const button = document.getElementById('button')
const changeColor = () => div.style.backgroundColor = Please.make_color()

button.addEventListener('click', changeColor)
```

### Require ES6 的 Module

另一件事情，注意到我們現在可以使用 ES6 的 module 系統。例如：

```javascript
const Please = require('pleasejs')
```

我們可以修改成：

```javascript
import Please from 'pleasejs'
```

## 額外收穫

既然前面沒花太多時間，我將再討論兩個很重要且有用的主題。

### 在 Webpack 和 Babel 設定 production 環境變數

#### Webpack

如果我們不想要在 production 執行部分的程式碼，我們可以使用方便的 [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin)。

這個 plugin 讓我們可以為我們整個 bundle 建立全域的常數，我們可以命名任何常數，像是：`DONT_USE_IN_PRODUCTION: true`，但是大多普遍的方式會是 `process.env.NODE_ENV: JSON.stringify('production')`，這會是更好的選擇。這是因為許多程式可以識別並根據 `process.env.NODE_ENV` 來使用額外的功能和優化你的程式碼。

為什麼要 `JSON.stringify`？因為根據文件的解釋：

> 如果值是一個字串，它會被作為一個程式碼片段。

這意思說一個 `'production'` 只會是一個錯誤。如果你認為 `JSON.stringify` 很奇怪，一個有效替代方式是 `'"production"'`。

你的 plugin 陣列現在看起來應該像：

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

現在，假如我們不想要在 production 上執行一些程式碼，我們可以放入一個 if 條件式：

```javascript
if (process.env.NODE_ENV !== 'production') {
  // not for production
}
```

在我們目前的專案中，如果在 production 環境下，我們可以排除 hot reload：

```javascript
// 在開發環境下接受 hot module reloading
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept()
  }
}
```

#### Babel

將我們的 production 變數定義為 `process.env.NODE_ENV` 有其他額外的好處。

[根據手冊][1]

> 「目前環境」是使用 process.env.BABEL_ENV。當找不到 BABEL_ENV 時，
它會退回去找 NODE_ENV，如果也找不到 NODE_ENV，目前環境將設為預設值 "development"。

這個意思說 babel 環境會 match 到我們的 webpack 環境。

我們可以利用這一點，只要透過在我們的 `.babelrc` 加入 `env` 設定，就可以使用開發環境：

```javascript
{
  "presets": ["es2015", "stage-2"],
  "env": {
    // 只發生在 NODE_ENV 沒有被定義或是被設定為 'development'
    "development": {
      // 當 NODE_ENV 是 production 忽略！
  }
}
```

當我們介紹 [React Transform HMR](https://github.com/gaearon/react-transform-hmr)，我們將使用這個在 part 3 和 react。


### 加入 Lint

如果你看過任何關於 Webpack/React 專案的 seed/starter，你可能看過一個檔案叫做 `.eslintrc`。如果你不是使用 IDE，而是使用像是 Atom、Sublime、Ecmas、Vim 等等，eslint 提供語法和風格的檢查，指出你的錯誤。此外，即使你正在使用 IDE，它可以提供更多功能，並確保整個專案程式碼風格統一。

請注意，如果你相要在編輯器內使用它，你需要安裝一個套件，例如我使用 Atom [linter-eslint](https://github.com/AtomLinter/linter-eslint)。

如果要減少我們手動撰寫設定，我們可以充分的利用繼承，使用他人的設定檔。我喜歡使用基於 [airbnb 的風格指南](https://github.com/airbnb/javascript)設定檔。

開始之前，我們須安裝 eslint 和 airbnb 的設定檔：

    npm install -g eslint
    npm install --save-dev eslint eslint-config-airbnb

我們的設定檔看起來像：

```javascript
// .eslintrc
{
  "extends": "airbnb/base" //使用 'airbnb/base' ，因為 'airbnb' 是假設使用 react
}
```

然而，因為 linting 是非常**固執**的，我喜歡將它調整一些。如果你想要知道這些規則的含意，或是根據你的喜好調整他們，可以查看[這裡](http://eslint.org/docs/rules/)：

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

另外，eslint 內建不支援和分辨 babel 語法，所以我們需要安裝兩個套件：

    npm install --save-dev babel-eslint eslint-plugin-babel

調整我們的設定檔，再一次的加入 [babel 指定規則](https://github.com/babel/eslint-plugin-babel)：

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

最後，在我們的 package.json 檔案中的 scripts 加入 lint 會是個好主意。

```javascript
// package.json
"scripts": {
  "build": "webpack --config webpack.config.prod.js",
  "dev": "webpack-dev-server --config webpack.config.dev.js",
  "lint": "eslint src"
}
```

當你執行 `npm run lint` 來確保你的程式碼沒有違反你指定的規則。

## 結論

我已經把所有這一切的最終結果放入到[範例一](https://github.com/neighborhood999/WebpackTutorial/tree/master/part2/example1)。如果你仍然有不理解的地方，可以在 issue 提出你的問題。

所以現在我們可以輕鬆的撰寫 ES6 程式碼，此外，也讓我們了解到如何撰寫設定檔 :tada:！

然而，你有能力從頭開始撰寫它，並不表示你一定要這麼做。為了方便，[我有建立一個 repository](https://github.com/AriaFallah/minimal-babel-starter) 讓你 clone 下來開始，這是根據這份教學建立的基本檔案。

對未來的期望：

* Part 3 將會加入 React
* Part 4 將會涵蓋更多進階的 webpack 功能

感謝你的閱讀！

[1]: https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md
[2]: https://github.com/AriaFallah/WebpackTutorial/tree/master/part1
