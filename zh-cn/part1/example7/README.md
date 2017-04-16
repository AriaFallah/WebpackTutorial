# 范例七 - 开始撰写程式

大多数的人会慌乱的原因似乎是因为：webpack 事实上需要通过这些取得的进入点来撰写 JavaScript；然而我们现在已经到达了这个教学课程最高潮的部分。

如果你还没准备好：执行 `npm run dev`，以及导到 `http://localhost:8080`。设定 dev server 是不是可以 hot reload。在你每次储存你专桉所编辑的任何一个档桉部份时，浏览器将会重新载入来显示你的修改。

我们也需要一个 npm package，为了来示范如何在前端使用它们。

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
