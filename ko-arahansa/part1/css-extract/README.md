# Extra - Extract Your CSS

예. 당신이 마쳤습니다만, production 에서는 css 파일이 javascript안에 들어가기를 원하지 않습니다. 이러한 목적을 위해서 우리는 
[Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin).
을 사용할 것입니다. 

    npm install --save-dev extract-text-webpack-plugin

그리고 우리의 웹팩 production설정을 다음과 같이 바꿔줘야합니다 : 

```javascript
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    }),
    new ExtractTextPlugin("styles.css")
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }]
  }
}
```

이러한 변화는 [official-repo](https://github.com/webpack/extract-text-webpack-plugin) 에서 유래했습니다. 어떻게 이것이 동작하는 지 알고 싶다면 한번 살펴보세요.

> 엔트리 청크에서 모든 require("style.css")들은 분리된 css 아웃풋 파일로 이동합니다. 그러니 당신의 스타일들은 더 이상 자바스크립트 안에 들어가지않고 css 번들파일안에 들어가게 됩니다. 만약 당신의 전체적인 스타일 시트 볼륨이 크다면, 이게 더 빠를 겁니다. 왜냐하면 스타일시트번들은 자바스크립트 번들과 병렬로 불러와지기 때문입니다.

이제 당신이 `npm run build`를 하면 설정을 사용하여 CSS는 분리된 파일로 들어가게 되고, 흥미롭게도 이미 `inde.html`에 포함(include)될 것입니다. 
```html
<html>
<head>
  <title>Webpack Tutorial</title>
<link href="styles.css" rel="stylesheet"> <------ MAGICALLY ADDED
</head>
<body>
  <h1>Very Website</h1>
  <section id="color"></section>
  <button id="button">Such Button</button>  
<script src="bundle.js"></script></body>
</html>
```
