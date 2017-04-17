# 范例一 - Bundle 和 Loader

![Official Dependency Tree](http://i.imgur.com/YU4xBPQ.png)

Webpack 简称为模组的整合工具。如果你想要深入的话，可以拜访「modules」和「module bundling definitely」这两篇优秀的解释文章：
[JavaScript Modules: A Beginner’s Guide](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.jw1txw6uh)
和 [JavaScript Modules Part 2: Module Bundling](https://medium.com/@preethikasireddy/javascript-modules-part-2-module-bundling-5020383cf306#.lfnspler2)。
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

如果在我的 webpack 配置中，inclue [style-loader](https://github.com/webpack/style-loader) 和 [css-loader](https://github.com/webpack/css-loader)，这是可行的，还可以实际应用 CSS 到我的网页。

你可以在 webpack 使用多个 loader，这裡只是一个单一的例子。
