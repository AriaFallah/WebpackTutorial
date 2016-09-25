# Example 5 - Adding More Plugins

이제 우리는 우리의 우리가 스타일할 실제 웹페이지에 스타일을 적용할 수 있을 기반을 가졌습니다. 
우리는 이것을 [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)을 통해서 할 것인데 이것은 HTML페이지를 생성하거나 이미 존재하는 페이지를 사용합니다. 우리는 이미 존재하는 `index.html`을 사용하고자 합니다. 

먼저 플러그인을 설치해보도록 하겠습니다 : 

    npm install --save-dev html-webpack-plugin@2


그리고 우리는 우리의 설정파일에 추가해보도록 하겠습니다. 

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

여기서 우리는 `webpack`을 실행하면, 우리가 `HtmlWebpackPlugin`을 `./src/index.html`에 적용해뒀기 때문에, 이것은 `dist`폴더에 `./src/index.html`를 기반으로 하여서 `index.html` 을 생성할 것입니다. 

(There's no point in using `index.html` as a template if it's empty.)
이제 실제로 실제로 index.html을 만들어봅시다.

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

여기서 우리는 `bundle.js` 를 위한 `<script>`태그를 HTML 에 적지 않았다는 것을 알아둡시다. 이 플러그인은 실제로 당신을 위하여 이 일(번들을 넣어주는 일)을 해줍니다. 만약 당신이 script태그를 적는다면 당신은 같은 코드를 두번 불러오게 될 것입니다. 

그리고 기초 스타일을 `styles.css`에 적어두도록 하겠습니다. 

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


#### 기타 노트
저는 `html-webpack-plugin`가 꽤 덜 사용되어져야 한다고 말하고 싶습니다. 저에게는 웹팩이 정말 간단하게 SPA를 만들려고 부트스트랩할 것을 가지고 있을 때나 HTML파일들을 만들었습니다. 하나의 HTML파일을을 만들어내는 경험으로는 유용하지만 12개의 HTML파일들을 새성하는 것을 추천하지는 않습니다. 이것은 당신이 angular디렉티브나같은 것들을 사용할 수 없다는 뜻이 아닙니다. 이러한 경우(여러개의  HTML파일 생성) 당신은 다음과 같이 할 수 있을 것입니다 : 

```javascript
// ...directive stuff
template: require('./templates/button.html') // using raw loader
```

대신에 , 당신은 이렇게 할 수도 있을 것입니다 : 

```javascript
new HtmlWebpackPlugin
  template: './src/index.html'
}),
new HtmlWebpackPlugin({
  template: './src/button.html'
}),new HtmlWebpackPlugin({
  template: './src/page2.html'
})
```

내가 틀렸다면 누구든지 자신의 경험을 얘기해주고 저를 교정해주세요~
