# Webpack 初學者教學課程 Part 1 - Webpack 簡介 :zap:

對於像我這樣的人來說，第一次接觸到 webpack 是像是這些 repository：

* https://github.com/davezuko/react-redux-starter-kit
* https://github.com/webpack/react-starter

雖然這些 repository 放在一起很棒，但它們不一定是最好的學習工具。
像我的情況，我試著了解發生了那些事情，但還是很困惑，所以我決定不從這些大量而且分散的資源來理解。

我希望這個教學課程可以讓 webpack 更容易的學習。

## 需求

至少希望你了解基本的 node.js 和 npm。

## 貢獻

我很樂意接受任何所有的貢獻或是修正。如果你有任何問題，可以將這些問題發成 issue。如果我有錯誤的話，請將問題指出。最後，如果你覺得我漏了些什麼，或者可以將某些部分解釋的更好，留下一個 issue 或者是發送 Pull Request。

## 目錄

* [為什麼要 Webpack？](#為什麼要-webpack)
* [基礎](#基礎)
  * [安裝](#安裝)
  * [Bundling](#bundling)
  * [Loaders](#loaders)
  * [Plugins](#plugins)
* [你的 webpack 設定檔案](#你的-webpack-設定檔案)
  * [一個簡單的範例](#一個簡單的範例)
  * [介紹 Plugins](#介紹-plugins)
* [一個更完整的範例](#一個更完整的範例)
  * [介紹 Loaders](#介紹-loaders)
  * [加入更多的 Plugins](#加入更多的-plugins)
  * [開發伺服器](#開發伺服器)
  * [開始撰寫程式](#開始撰寫程式)
* [結論](#結論)
* [反思](#反思)

## 為什麼要 Webpack？

因為每個 react 或 redux 教學課程都假設你知道什麼是 webpack。:cry:

以下這些是更現實的原因，你可能會需要使用 webpack。

你可以：
  * 將你的 js 檔案 Bundle 變成單一的檔案
  * 在你的前端程式碼中使用 npm packages
  * 撰寫 JavaScript ES6 或 ES7（需要透過 babel 來幫助）
  * Minify 或優化程式碼
  * 將 LESS 或 SCSS 轉換成 CSS
  * 使用 HMR（Hot Module Replacement）
  * 包含任何類型的檔案到你的 JavaScript
  * 更多進階的東西，暫時不介紹

##### 為什麼我需要這些功能？

* Bundle JS 檔案 - 讓你可以撰寫模組化的 JavaScript，但是你不需要 include 每個 JavaScript `<script>` 的檔案（如果你需要多個 JavaScript 檔案可以透過設定來完成）。

* 在你的前端程式碼中使用 npm packages - npm 在 internet 上是一個大型的 open source 生態系統。可以儲存或發佈你的程式碼，你可以到 npm 看一看，可能包含你想要的前端套件。

* ES6 和 ES7 - 加入一些 JavaScript 的新功能，讓撰寫程式碼可以更容易而且更強大，[請看這裡的介紹](https://github.com/DrkSephy/es6-cheatsheet)。

* Minify 或優化程式碼 - 減少你的檔案大小，好處包括像是更快的將頁面載入。

* 將 LESS 或 SCSS 轉換成 CSS - 使用更好的方式來撰寫 CSS，
[如果你不熟悉的話，這裡有一些介紹](http://alistapart.com/article/why-sass)。

* 使用 HMR - 增加開發速度。每當你儲存程式碼的時候，它可以注入到網頁，而不需將網頁刷新。如果當編輯你的程式碼，你需要維護頁面的狀態，這是非常方便的。

* 包含任何類型的檔案到你的 JavaScript - 減少對其他 build 工具的需要，讓你可以透過程式的方式修改或使用這些檔案。

## 基礎

### 安裝

你需要全域安裝來使用 webpack 大部分的功能：

    npm install -g webpack

然而 webpack 有些功能，像是優化的 plugins，需要你將它安裝在本機。像這種情況下你需要：

    npm install --save-dev webpack

### 命令

如果要執行 webpack：

    webpack

如果你想要在 webpack 每次 build 的時候查看改變的檔案：

    webpack --watch

如果你想要使用自訂的 webpack 設定檔：

    webpack --config myconfig.js

### Bundling

[範例一](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example1)

![Official Dependency Tree](http://i.imgur.com/YU4xBPQ.png)

Webpack 簡稱為模組整合工具。如果你想要深入的話，可以拜訪 [JavaScript Modules: A Beginner’s Guide](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.jw1txw6uh) 和 [JavaScript Modules Part 2: Module Bundling](https://medium.com/@preethikasireddy/javascript-modules-part-2-module-bundling-5020383cf306#.lfnspler2) 這兩篇優秀的解釋文章：

我們要保持它的簡單，webpack 運作的方式是透過指定一個單一檔案作為你的進入點。
這個檔案會是 tree 的 root。然後你每次 `require` 一個檔案從其他檔案並把它加入到 tree。當你執行 `webpack`，所有的檔案和 module 都會被 bundle 成一個檔案。

這裡是一個簡單的範例：

![Dependency Tree](http://i.imgur.com/dSghwwL.png)

根據這樣的情況，你可以有這樣的目錄：

```
MyDirectory
|- index.js
|- UIStuff.js
|- APIStuff.js
|- styles.css
|- extraFile.js
```

這些可能是你檔案的內容：

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

當你執行 `webpack`，你會得到一個這個 tree 的 bundle 內容，雖然 `extraFile.js` 也是在相同的目錄中，但它不是被 bundle 的一部份，因為它在 `index.js` 沒有被 `require`。

`bundle.js` 看起來會像：

```javascript
// contents of styles.css
// contents of UIStuff.js + React
// contents of APIStuff.js + fetch
```

被 bundle 的這些檔案是你明確所 require 進來的檔案。

### Loaders

你可能會注意到，我在上方的範例做了一些奇怪的事情。我在 JavaScript 檔案中 `require` 一個 css 檔案。

關於 webpack 真的很酷，有趣的事情是，你可以 `require` 其他不只是 JavaScript 的檔案。

在 webpack 這些東西我們稱為 loader。使用這些 loader，你可以 `require` 任何 `.css` 和 `.png` 到 `.html` 檔。

例如在上圖我有：

```javascript
// index.js
require('./styles.css')
```

如果在我的 webpack 設定檔中，inclue [style-loader](https://github.com/webpack/style-loader) 和 [css-loader](https://github.com/webpack/css-loader)，這是可行的，還可以實際應用 CSS 到我的網頁。

你可以在 webpack 使用多個 loader，這裡只是一個單一的例子。

### Plugins

Plugin，顧名思義就是替 webpack 增加額外的功能。其中常使用到的一個 plugin 是 `UglifyJsPlugin`，它可以 minify 你的 JavaScript 程式碼。我們之後會介紹如何使用。

## 你的 webpack 設定檔案

Webpack 沒辦法直接使用，需要透過你的需求來做設定。為了做到這一點，你需要建立一個檔案叫做：

    webpack.config.js

預設情況下，webpack 會去識別這個檔名。如果你選擇使用不同的檔名，你需要加入 `--config` 來指定你的檔案名稱。

### 一個簡單的範例
[範例二](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example2)

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
  entry: ['./src/index'], // 在 index 檔案後的 .js 副檔名是可選的
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

### 介紹 Plugins

[範例三](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example3)

想像一下，你使用 webpack 將你的檔案 bundle 在一起，然後你發現到 bundle 後的結果是 900KB。這裡有個問題，但是你可以透過 minify 你的 bundle 檔案來做改善。如果需要做到這一點，你需要使用一個我在前面稍早提到的 [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) plugin。

此外，你需要在本機安裝 webpack 才能實際的去使用這個 plugin。

    npm install --save-dev webpack

現在你可以 require webpack 並 minify 你的程式碼。

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
我們一個一個複習這些屬性：

* plugins - 一個可以儲存你的 plugin 的陣列。
  * [webpack.optimize.UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) - Minify 你的程式碼，並顯示警告訊息。

這個時候，當我們執行 `webpack`，`UglifyJsPlugin` 通過像是移除所有空白的處理，可以將你的檔案減少至 200KB。

你也可以加入 [OccurenceOrderPlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin)。

> 透過發生次數分配 module 和 chunk 的 id。一些常用的 Id 取得較低（短）的 id。這使得 id 可以預測，減少檔案的大小和建議。

老實說，我不太確定底層的機制是如何工作的，但在根據目前 [webpack2 beta 的預設情況下](https://gist.github.com/sokra/27b24881210b56bbaff7)，所以我將它包含在內。

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
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
```

所以現在我們寫了一個設定檔讓我們可以 minify 和 bundle 我們的 JavaScript。這個 bundle 檔案可以被複製並貼到其他的專案目錄中，放入 `<script>` 就可以使用。如果*只有 JavaScript*，而且你只在乎關於 webpack 基本的使用，你可以直接跳到[結論](#conclusion)。

## 一個更完整的範例

此外，比起單單使用 JavaScript，使用 webpack 可以做的更多，你可以避免複製、貼上並透過 webpack 管理你的整個專案。

在下面的部份中，我們要使用 webpack 建立一個非常簡單的網站。如果你想要跟著這個範例，建立一個像下方的目錄結構：

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

#### 內容

1. [介紹 Loader](#introducing-loaders) - 我們將會加入 loader，這可以讓我 bundle 加入的 CSS。
2. [加入更多 Plugin](#adding-more-plugins) - 我們加入一個 plugin 來幫助我們建立和使用一個 HTML 檔案。
3. [開發伺服器](#the-development-server) - 我們會將 webpack 設定檔案分為 `development` 和 `production` 兩種版本，然後使用 webpack-dev-server 來查看我們的網站並啟用 HMR。
4. [開始撰寫程式](#start-coding) - 我們來實際寫一些 JavaScript。

#### 介紹 Loader

[範例四](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example4)

在稍早前面的教學課程中我提到了 [loaders](#loaders)。這些程式碼來幫助我們 require 非 JavaScript 的檔案。在這種情況下，我們將需要 `style-loader` 和 `css-loader`。首先我們需要安裝這些 loader：

    npm install --save-dev style-loader css-loader

現在安裝完後，我們可以調整我們的 webpack 設定來引入 `css-loader`：

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

我們一個一個複習這些屬性：

* [module](http://webpack.github.io/docs/configuration.html#module) - 設定你的檔案選項。
  * [loaders](http://webpack.github.io/docs/configuration.html#module-loaders) - 我們為應用程式所指定的一個 loader 陣列。
    * test - 一個正規表達式來匹配 loader 的檔案。
    * loaders - loader 用於這些匹配 test （正規表達式）的檔案。

這個時候你執行 `webpack`，如果你 `require` 的檔案結尾是 `.css`，然會我們會使用 `style` 和 `css` loader，將 CSS 加入到 bundle。

如果我們沒有 loaders，我們會得到像是這樣的錯誤：

```
ERROR in ./test.css
Module parse failed: /Users/Developer/workspace/tutorials/webpack/part1/example1/test.css
Line 1: Unexpected token {
You may need an appropriate loader to handle this file type.
```

**可選項目**

如果你想要使用 SCSS 而不是 CSS 你需要執行：

    npm install --save-dev sass-loader node-sass webpack

然後你的 loader 必須修改成：

```javascript
{
  test: /\.scss$/,
  loaders: ["style", "css", "sass"]
}
```

處理 LESS 也類似於這個方式。

要知道這些需要被指定的 loader 是有*順序*的，這是一個很重要部分。在上面的範例，`sass` loader 是第一個應用在你的 `.scss` 檔案，然後是 `css` loader，最後是 `style` loader。你可以看到，這些 loader 的應用模式是由右到左。

#### 加入更多的 Plugins

[範例五](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example5)

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

#### 開發伺服器

[範例六](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example6)

現在我們想要實際在瀏覽器看到我們的網站，需要一個 web 伺服器來服務我們的程式碼。webpack 自帶了方便的 `webpack-dev-server`，你需要在本機和全域安裝。

    npm install -g webpack-dev-server
    npm install --save-dev webpack-dev-server

dev server 可以在瀏覽器看到你的網站外觀以及可以更快速的開發，是一個相當有用的資源。預設情況下你可以拜訪 `http://localhost:8080`。不幸的是，像是 hot reloading 的功能並不是內建的，還需要一些其他的設定。

這是 webpack 設定檔一個很棒的分離點，意思是說你可以將他分成用於「development」以及「production」。因為我們必須在這個教學課程中保持簡單的方式，所不會有很大的改變，但是會介紹 webpack 很棒的可設置性。我們稱他們為 `webpack.config.dev.js` 和 `webpack.config.prod.js`。

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


**修改**

1. dev 設定檔省略了優化，當你不斷的 rebuild 時，他們是不必要的。所以不需要 `webpack.optimize` plugins。

2. dev 設定檔需要對 dev server 做必要的設定，你可以到[這裡](https://webpack.github.io/docs/webpack-dev-server.html)了解更多。

總結：

* entry: 兩個新的進入點將伺服器連結到瀏覽器，方便 HMR。
* devServer
  * contentBase: 服務的檔案來自哪裡。
  * hot: 啟用 HMR。

prod 設定檔不需要改變太多：

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

我也加入一個全新的屬性在 dev 和 prod 設定檔：

* [devtool](https://webpack.github.io/docs/configuration.html#devtool) - 這是協助 debug 的工具。基本上，當你得到一個錯誤，它會幫助你找到哪裡發生了錯誤，像是 chrome developer console。`source-map` 和 `cheap-eval-source-map` 之間的差異從文件說明有點難解釋。我可以肯定的是，`source-map` 是用於 `production`，`cheap-eval-source-map` 是用於 `development`。

如果要執行 dev server，我們可以執行：

    webpack-dev-server --config webpack.config.dev.js

如果我們要 build production 的程式碼，我們可以執行：

    webpack --config webpack.config.prod.js


如果想要讓這些指令使用的更容易，我們可以到 `package.json` 來設定簡單的 script。

我們加入 `scripts` 屬性到設定檔：

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

我們可以執行這些指令：

```
npm run build
npm run dev
```

你現在可以透過 `npm run dev`，並導到 `http://localhost:8080` 看到你的網站。

**備註：** 當我正在測試這個部份時，我了解到，當我修改 `index.html` 檔案時，伺服器不能 hot reload。解決這個問題的方法在 [html-reload](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/html-reload)。這裡涵蓋了一些 webpack 設定檔選項的有用資訊，我推薦你可以看一下，但是我把它分開了，因為我覺得會因為這個不太重要的原因，這會延長這個教學課程。

#### 開始撰寫程式

[範例七](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/example7)

大多數的人似乎會慌亂的原因是因為：webpack 事實上需要通過這些取得的進入點來撰寫 JavaScript；然而我們現在已經到達了這個教學課程最高潮的部分。

如果你還沒準備好：執行 `npm run dev`，以及導到 `http://localhost:8080`。設定 dev server 是不是可以 hot reload。在你每次儲存你專案所編輯的任何一個檔案部份時，瀏覽器將會重新載入來顯示你的修改。

我們也需要 npm package，為了來示範如何在前端使用它們。

    npm install --save pleasejs

PleaseJS 是一個隨機色彩的產生器，其中我們需要在按鈕中加入 hook 來改變我們的 div 顏色。

```javascript
// index.js

// 接受 hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // 網頁現在有了樣式
var Please = require('pleasejs')
var div = document.getElementById('color')
var button = document.getElementById('button')

function changeColor() {
  div.style.backgroundColor = Please.make_color()
}

button.addEventListener('click', changeColor)
```

有趣的是，[為了讓 Hot Module Replacement 可以執行](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html#what-is-needed-to-use-it)，你需要加入下面的程式碼：

```javascript
if (module.hot) {
  module.hot.accept()
}
```

在一個 module 或是它的父 module。

然後我們就完成了！

**備註：** 你可能已經注意到在你的 css 被使用之前有些 delay，或許事實上你討厭將你的 css 放入到 JavaScript 檔案中。我留了另一個範例：[css-extract](https://github.com/neighborhood999/WebpackTutorial/tree/master/zh-TW/part1/css-extract)，描述如何將你的 CSS 放在不同的檔案。

## 結論

我希望這些是有幫助的。

首先 Webpack 最重要的它是一個模組整合工具。它是一個高度模組化的工具，事實上，它並不是被限於在 ES6 和 React。

現在考慮到：

* Part 2 將解決使用 Webpack 透過 Babel 將 ES6 轉換到 ES5。
* Part 3 將解決使用 Webpack 和 React + Babel。

因為這是這常見的例子。

## 反思

恭喜！你已經讓你個按鈕去改變你的 div 的顏色！webpack 是不是很棒？

沒錯是的！但是，如果你所做的事情只是讓按鈕去改變 div 的顏色，它可能不值得你去寫像是這樣的設定。如果你想這麼做的話，你可能會感到...疲累。:anguished:
