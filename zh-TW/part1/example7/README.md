# 範例七 - 開始撰寫程式

大多數的人會慌亂的原因似乎是因為：webpack 事實上需要通過這些取得的進入點來撰寫 JavaScript；然而我們現在已經到達了這個教學課程最高潮的部分。

如果你還沒準備好：執行 `npm run dev`，以及導到 `http://localhost:8080`。設定 dev server 是不是可以 hot reload。在你每次儲存你專案所編輯的任何一個檔案部份時，瀏覽器將會重新載入來顯示你的修改。

我們也需要一個 npm package，為了來示範如何在前端使用它們。

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
