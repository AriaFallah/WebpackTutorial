# 範例一 - Bundle 和 Loader

![Official Dependency Tree](http://i.imgur.com/YU4xBPQ.png)

Webpack 簡稱為模組的整合工具。如果你想要深入的話，可以拜訪「modules」和「module bundling definitely」這兩篇優秀的解釋文章：
[JavaScript Modules: A Beginner’s Guide](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.jw1txw6uh)
和 [JavaScript Modules Part 2: Module Bundling](https://medium.com/@preethikasireddy/javascript-modules-part-2-module-bundling-5020383cf306#.lfnspler2)。
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

關於 webpack 真的很酷，有趣的事情是，你可以 `require` 更多不只是 JavaScript 的檔案。

在 webpack 這些東西我們稱為 loader。使用這些 loader，你可以 `require` 任何 `.css` 和 `.html`  到 `.png` 檔。

例如在上圖我有：

```javascript
// index.js
require('./styles.css')
```

如果我在我的 webpack 設定檔中，inclue [style-loader](https://github.com/webpack/style-loader) 和 [css-loader](https://github.com/webpack/css-loader)，這不僅是可以的，還可以實際應用 CSS 到我的網頁。

你可以在 webpack 使用多個 loader，這裡只是一個單一的例子。
