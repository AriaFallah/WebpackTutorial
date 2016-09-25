# 추가 - HTML을 핫리로드하게 만들기

제가 테스트를 할 동안에 저는 index.html이 hot reload되지 않는 다는 것을 꺠달았습니다. 잠시 검색한 후에 저는 최종적으로 여기들을 보았습니다. 

[이것이 도움이 되는 답변이었고](http://stackoverflow.com/questions/33183931/how-to-watch-index-html-using-webpack-dev-server-and-html-webpack-plugin) 약간 hacky한 해결책을 이루기위해서, 
[로더를 더 필요했습니다. ](https://github.com/webpack/raw-loader) 

그리고 이 솔루션이 프로덕션으로 가는 것을 방지하기 위해 [one more plugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin) 이 더 필요했습니다. 

기본적으로 웹팩에서 HTML을 핫리로드하기 위해서, 우리는 그것을 우리의 우리가 require 하는 파일들 중 하나로, 의존성 계층의 하나로 만들어야 합니다. 이것은 HTML을 문자열로 자바스크립트로 불러오는데 이것이 우리가 필요로 하는 것입니다. 그리고 의존성 계층에 HTML을 더할 것입니다. 

그러면 우리의 개발설정에 로더를 추가해봅시다 : 

먼저 다음과 같이 치고

    npm install --save-dev raw-loader

다음과 같이 칩시다 :

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
    }, {
      test: /\.html$/,
      loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```
여기서 당신이 `webpack`을 실행하고 `.html`로 끝나는 파일을 `require`하게 되어있다면 우리는 그것들에 `raw-loader`를 적용하여 HTML을 번들에 추가할 것입니다. 

우리는 현재 우리가 비어있는 `index.js` 에서 해볼 것입니다. 

This time, when you run `webpack`, if we `require` a file that ends in `.html`, then we will apply
the `raw-loader` loader to it, which adds the HTML to the bundle.

Now in our currently empty `index.js` file we can do.

```javascript
// index.js
require('./index.html')
```

만약 우리가 검사해보면, 핫리로드는 동작할 것입니다. 하지만 당신은 `index.js`에 `index.html`을 require해야 한다는 것을 깨달을 것입니다. 그리고 이것은 실제 의미없는 일입니다.. (맞나?;;) 

우리는 프로덕션에서 이렇게 되기를 원하지 않으므로 이것이 우리가 [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin) 을 필요로 하는 이유입니다 .

이 플러그인은 우리의 전체 번들에서 글로벌 상수를 만들게 해주고 이것의 이름을 어떤 것이든 할 수가 있습니다. `DONT_USE_IN_PRODUCTION: true` 이렇게도 말이죠... 그러나 좀 더 실용적으로 봤을 때, 좀더 친숙하여 인기있는 선택은 `process.env.NODE_ENV: JSON.stringify('production')` 입니다. 왜 JSON.stringfy이냐구요? 문서에 그렇게 나와있어서인듯합니다(?)

> 만약 값이 문자열일 때 우리는 그것을 코드의 조각으로 사용될 것입니다.

이제 우리는 우리의 프로덕션 설정에 이플러그인을 추가할 것입니다 : 

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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
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
그리고 우리의 `index.js`에서 우리는 다음과같은 조건을 넣을 것입니다


```javascript
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
```
휴, 문제가 해결되었군요.  production 빌드에서는 우리는 의존성 계층에 `index.html`을 필요로 하지 않기 때문에 `index.html`을 require하지 않을 것입니다. 이것은 또한 `raw-loader`를 필요로 하지 않는다는 것을 의미합니다. 