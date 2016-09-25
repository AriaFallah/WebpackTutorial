# Example 6 - The Development Server

이제 우리는 실제로 우리의 우리의 코드를 서비스하는 웹사이트를 브라우저로 보기를 원합니다. 편리하게 웹팩은 

Now we want to actually see our website in the browser, which requires a web  `webpack-dev-server`를 가지고 있는데 이것은 로컬과 글로벌로 동시에 설치하는 것을 필요로 합니다. 

    npm install -g webpack-dev-server
    npm install --save-dev webpack-dev-server

웹팩개발서버는 브라우저로 당신의 웹사이트를 보는데 꽤 유용하며 빠른 개발을 하게 해줍니다. 기본적으로 당신은 `http://localhost:8080` 로 접속해서 볼 수가 있습니다. 불행하게도 핫모듈 대체같은 것은 꽤 훌륭하진 않아서 몇가지 추가 설정이 필요합니다. 

왜냐하면 우리는 지금까지 이 튜토리얼에서 단순하게 해왔고, 지금까지 많은 차이가 없을 테지만, 웹팩 설정의 기초적인 설정이었습니다. 우리는 나눌 설정파일들을 `webpack.config.dev.js` 와 `webpack.config.prod.js` 로 부르겠습니다. 

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


**변화들**

1. 웹팩 개발 서버는 다시 재building을 하는데 있어서 불필요한 최적화들을 생략합니다. 그래서  `webpack.optimize`플러그인들이 없습니다. 

2. 개발설정은 개발서버를  위하여 필요하며 여기를 더 읽어보시면 될겁니다. 
[here](https://webpack.github.io/docs/webpack-dev-server.html).

요약 Summarized:

* entry : 두개의 새로운 엔트리포인트가 서버와 브라우저에 접속하여 HMR을 허용합니다. 
* devServer
  * contentBase: 제공할 파일들을 위치를 지정합니다. 
  * hot: 핫모듈 대체를 활성화하합니다. 

프로덕션 설정은 별로 바뀐 것이 없습니다

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

여기서 개발설정와 프로덕션 설정에도 새로운 속성을 추가해줬습니다 : 

* [devtool](https://webpack.github.io/docs/configuration.html#devtool) - 디버깅 목적입니다.
기본적으로 당신이 에러를 얻을 때, 이것은 당신이 크롬개발콘솔같이 어디서 실수를 만들어냈는지 보기 쉽게 해줍니다. 
`source-map`과 `cheap-eval-source-map`의 차이는 문서를 찾기 어렵지만, 제가 분명히 말씀드릴 수 있는 것은 `source-map`은 프로덕션용이고 오버헤드가 많으며 `cheap-eval-source-map` 는 오버헤드가 적고 개발만을 위합니다.

개발서버를 실행시키기 위해 다음과 같이 실행할 것입니다

    webpack-dev-server --config webpack.config.dev.js

그리고 프로덕션 코드는 다음과 같이 실행할 것입니다. 

    webpack --config webpack.config.prod.js


우리의 삶을 좀 더 쉽게 하기 위해 우리는 `package.json`에 간단한 태스크 실행기를 추가하여서 우리가 저런 명령들을 계속 타이핑 하지 않게 할 수 있습니다 .

우리는 설정에 `scripts` 속성들을 추가할 것입니다


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

그러면 다음과 같이 실행하면 됩니다

```
npm run build
npm run dev
```

당신은 당신의 아름다움 웹사이트를 `npm run dev`를 실행시킴으로써 볼 수가 있습니다. 그리고 `http://localhost:8080`로 접속해보세요

**기타 노트**: 제가 이 부분을 테스트해보면서 `index.html`을 수정하였을때 서버가 핫리로드 되지 않았단 것을 알 수가 있었습니다. 이것에 대한 해결책으로 [html-reload](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1/html-reload)를 보시면 됩니다. 이것은 웹팩의 좀 더 많은 설정을 살펴보는 유용한 정보지만 저는 이것을 이 튜토리얼과 분리하도록 하겠습니다. 