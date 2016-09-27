# 웹팩 입문 튜토리얼 파트 2 - 웹팩과 Babel사용하기  :zap:

우리가 웹팩의 기본을 배웠으므로, 이제 자바스크립트의 새로운 명세인 ES6를 사용하기 위하여 babel6를 사용하는 것을 배워봅시다. 

만약 당신이 이미 ES6으로 사용하고 있다면 ES5로 돌아가기는 어려울 것입니다. 만약 ES6를 아직 맛보지 못했다면, 그 큰 이유는 아마 개발환경 세팅과 모든 옵션설정들을 이해하는 것과 어떤 옵션을 사용할지 결정하는 것이 힘들기 때문일 것입니다.

이 튜토리얼이 그러한 과정을 좀 더 쉽게 하기를 바랍니다. 

## Requirements (요구사항들)

1. 만약 [part 1][2]을 보지 않았다면 봐주시고,
2. ES6의 오버뷰를 위한 링크로 [여기](https://github.com/DrkSephy/es6-cheatsheet)를 추천드립니다. 

## Contributing

## 기여하기

난 모든 기여와 교정을 기쁘게 받아들일 것이며 질문이 있다면 이슈를 남겨라. 내가 만약 실수를 저지르면 그것들을 지적해주고 내가 어떤 것을 놓치거나, 좀 더 잘 설명할 수 있으면 이슈를 만들고 풀리퀘스트를 해주시오! 


## Table Of Contents

* [바벨](#babel)
  * [바벨이 무엇을 하나요](#what-does-babel-do)
  * [바벨 설정하기](#configuring-babel)
* [웹팩](#webpack)
  * [새로운 로더](#a-new-loader)
* [우리가 다 했나요?](#we-are-done)
  * [ES6모듈로 requiring 하기](#requiring-with-es6-modules)
* [추가 ](#extra-credit)
  * [웹팩과 바벨을 사용하면서 상용 환경설정](#production-environment-variables-with-webpack-and-babel)
  * [Linting 추가하기](#adding-linting)
* [결론](#conclusion)


## Babel

(바벨) 만약 바벨에 대해서 좀 더 알고 싶다면, 바벨에 대해서 잘 정리된 [their handbook][1]을 보세요. 
[their handbook][1]. I'm paraphrasing the basics here(지하철 번역이라 패스).

### What Does Babel Do?

(바벨을 무엇을 하는가) 단순히 시작해보자면, 바벨은 자바스크립트의 아직 대부분의 브라우저와 환경이 지원하지 않는 전체 명세를 좀 더 사용할 수 있게 해줍니다. 그리고 그것들을 좀 더 많은 지원을 받는 ES5로 바꿔줍니다. 

바벨과 함께, 이 코드는 최근의 브라우저에서 지원됩니다. 

```javascript
const square = n => n * n;
```

이것은 다음과 같이 변형됩니다 .

```javascript
var square = function square(n) {
  return n * n;
};
```

자바스크립트를 지원하는 어디 곳에선간에 당신은 실행할 수 있게 됩니다. 

### Configuring Babel

(바벨설정하기 ) 이제 우리는 babelrc라 불리는 다른 도구, 다른 설정 파일인을 가져보겠습니다. 

    .babelrc

고맙게도 `.babelrc` 는 하나의 단일 긴 라인이 될 것입니다. 

```javascript
{
  "presets": ["es2015", "stage-2"]
}
```

당신이 명시해야할 유일한 옵션은  `presets` 인데, 이것은 다음과 같은 것을 설명합니다 : 

> 자바스크립트는  TC39's (the technical committee behind the ECMAScript standard)
process를 통해서 표준에 대한 그들의 로드맵(way?)을 갖고 있습니다. 

> 이 프로세스는 5단계를 거치게 됩니다. 이 제안이 좀더 많은 관심을 받게되고 표준에 의해 점차 받아들여지게 되면 마침내 stage4의 표준에 이르게 됩니다. 

> 위에서는 단지 `es2015` 가 있고 stage-4가 없다는 것을 알아둡시다. 

정리해보자면, presets은 플러그인들의 번들로서 당신의 쓰는 코드에 특징들을 더합니다. `es2015`는 공식적인 ES6의 릴리즈의 특징들을 추가할 것이며, 아직 자바스크립트에서 여전히 진행중인 stages 0-3까지의 제안서들에 대한  presets들을 더할 것입니다. 숫자가 낮아질 수록 당신이 사용하는 특징들에 대한 지원이 끊길 위험이 있습니다. 

제 경험에 의하면, 제가 필요한  가장 낮은 버젼은 `stage-2`로 [object spread](https://github.com/sebmarkbage/ecmascript-rest-spread)라 불리는 것을 사용할 수 있는 버젼입니다. 당신은 제안서의 나머지 부분을 [here](https://github.com/tc39/ecma262)서 볼 수 있으며 당신이 어디 버젼부터 시작할 지 결정할 수 있을 겁니다. 

이 프리셋들을 사용하기 위해 당신은 인스톨해야할 것입니다. 

    npm install --save-dev babel-preset-es2015 babel-preset-stage-2

## Webpack

우리는  [파트1의 예제 7](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1/example7) 에서부터  같은 설정을 가져오고, ES6를 사용하기 위한 기능을 좀 더 추가해보겠습니다. 

현재 설정입니다 : 

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

그리고 

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

### A New Loader

(새로운 로더) 우리의 코드를 ES5 로 변환하기 위해서는 우리는 `babel-loader`라 불리는 새로운 로더를 ㅌㅇ해서 이것을 실행해야 합니다. 이것은 `babel-core`에 대해서 의존성을 가지고 있습니다. 이 로더는 우리의 `.babelrc`설정을 사용하여서 우리의 코드가 새로운 형태로 변환될 것이라는 걸 이해할 겁니다 .

    npm install --save-dev babel-loader babel-core

우리는 개발과 상용 설정에 다음과 같이 추가해야합니다 : 

```javascript
// To save space I'll just show the "loaders" part

// Both webpack.config.dev.js and webpack.config.prod.js
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

`include`속성에 대해서 **매우 중요한 부분** 으로 우리가 `webpack`을 실행할 때, 우리는 `test`에  `/.js$/`를 설정해놨기 때문에, 웹팩이 모든 단일 `js`파일에 바벨로더를 실행해본다는 것입니다. 

이 것의 문제를 예상하실 수 있으실까요? `require('bluebird')`를 해보거나 다른 큰 npm 패키지를 사용해볼까요? 이것은  **node_modules** 를 통하여`babel-loader`를 실행할 것이며. 당신의 빌드시간을 엄청나게 길게 할 것입니다. 

`include` 는 이와 같은 상황을 예방하며. 이 로더는 오직 `src`디렉터리의 `.js`파일들에만 적용될 것입니다. 

대안으로 당신은 `include: path.join(__dirname, 'src')`를 `exclude: /node_modules/`로 바꿀 수 있습니다. 그렇게 하면  `node_modules` 를 제외한 모든 것들을 include하게 됩니다. 좀 더 많은 정보는 [here](https://webpack.github.io/docs/configuration.html#module-loaders)서 알 수 있습니다. 

## We are Done?

(우리가 마친 건가요?) 솔직하게 이 튜토리얼은 좀 더 길어질 것같다고 생각했지만, 제가 바벨을 추가하는 것이 실제로 사소하다는 것을 잊은 것같습니다. 

우리는 이제 이전의 `index.js`에서 ES6문법을 사용하기 위해 좀 더 업데이트 해봅시다 : 

```javascript
// index.js

// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // The page is now styled
const Please = require('pleasejs')

const div = document.getElementById('color')
const button = document.getElementById('button')
const changeColor = () => div.style.backgroundColor = Please.make_color()

button.addEventListener('click', changeColor)
```

### Requiring With ES6 Modules

(ES6 모듈 Requiring하기) 하나 더 명심할 점은 우리는 es6의 모듈시스템을 사용할 수 있다는 것입니다. 예를 들어서 이렇게 하는 대신에

```javascript
const Please = require('pleasejs')
```

이제는 이렇게 할 수 있습니다 .

```javascript
import Please from 'pleasejs'
```

## Extra Credit

(추가?) 실제로 그리 길진 않았기 때문에, 저는 꽤 중요하고 유용한 두 가지 부분들을 다뤄볼까 합니다 .

### Production Environment Variables With Webpack and Babel

#### Webpack

(웹팩과 바벨을 통한 상용 환경설정.웹팩)
만약 우리가 프로덕션의 코드의 일부를 실행하기를 원하지 않는다면 우리는 유용한 [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin)를 사용할 수 있습니다. 

이 플러그인은 우리에게 우리의 전체 번들을 위해서 글로벌 상수를 생성할 수 있게 해주며. 글로벌 상수 이름은 `DONT_USE_IN_PRODUCTION: true`와 같이 어떤 것이든 가능합니다. 하지만 좀 더 실용적으로 `process.env.NODE_ENV: JSON.stringify('production')`가 더 좋을 겁니다. 


이 플러그인은 우리의 전체 번들에서 글로벌 상수를 만들게 해주고 이것의 이름을 어떤 것이든 할 수가 있습니다. `DONT_USE_IN_PRODUCTION: true` 이렇게도 말이죠... 그러나 좀 더 실용적으로 봤을 때, 좀더 친숙하여 인기있는 선택은 `process.env.NODE_ENV: JSON.stringify('production')` 입니다. 왜 JSON.stringfy이냐구요? 문서에 그렇게 나와있어서인듯합니다(?)

> 만약 값이 문자열일 때 우리는 그것을 코드의 조각으로 사용될 것입니다.

이것은 `'production'`의 값이 이 에러를 될 수 있다는 것을 의미합니다. 만약 당신이 `JSON.stringify`가 이상하다고 생각한다면 다른 대안은 `'"production"'`입니다. 

당신의 플러그인 배열은 다음과 같을 것입니다. 

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
그리고 우리는 사용ㅇ에서 어떤 코드들을 실행하지 않기 때문에, 다음과 같은 조건문을 넣을 것입니다: 

```javascript
if (process.env.NODE_ENV !== 'production') {
  // not for production
}
```

우리의 현재 프로젝트에서 우리는 상용설정일 때 hot reloading을 제외할 것이므로 다음과 같이 할 수 있을 겁니다 : 

```javascript
// Accept hot module reloading during development
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept()
  }
}
```

#### Babel

(바벨) 우리의 상용 변수를  `process.env.NODE_ENV` 로 정의하는 것은 또 다른 이점이 있습니다. 

[From the handbook][1]

> 현재 환경변수로 process.env.BABEL_ENV를 사용할 것입니다. BABEL_ENV가 사용가능하지 않을때 그에 대한 대비책으로 NODE_ENV을 사용할 것이며 이마저도 사용가능하지 않을 때는 기본값으로 "development"가 될 것입니다. 

이것이 의미하는 것은 바벨 환경이 웹팩 환경에 맞는(match)다는 것을 의미합니다. 

우리는 이 장점을 활용하여서 `env`를 추가함으로써 `.babelrc`가  개발환경만을 가졌을 때의 행동을 정의할 수 있게 됩니다  : 

```javascript
{
  "presets": ["es2015", "stage-2"],
  "env": {
    // only happens if NODE_ENV is undefined or set to 'development'
    "development": {
      // ignored when NODE_ENV is production!
  }
}
```

우리가 
[React Transform HMR](https://github.com/gaearon/react-transform-hmr)를 소개할 때 part3에서 이것을 사용할 것입니다. 

### Adding Linting

만약 당신이 Webpack/React를 위한 어떤 초기 프로젝트를 본다면, 당신은 `.eslintrc`라는 파일을 아마 봤었을 것입니다. 만약 당신이 IDE 를 사용하지 않고 아톰이나 서브라임, 이맥스, 빔같은 텍스트에디터를 사용한다면 eslint는 스타일이나 문법에 대한 체크를 제공하고 당신의 실수를 지적합니다. 더구나 만약 당신이 IDE를 사용한다면 이것은 더 많은 기능들을 제공할 수 있고 프로젝트의 기여자들에게 코딩스타일의 통일성을 보장합니다. 

만약 당신이 에디터 lint이 통합되는 것에 관심이 있다면, 당신은 패키지를 설치할 수 있을 것입니다. 예를 들자면 저는 Atom 에서 [linter-eslint](https://github.com/AtomLinter/linter-eslint)를 사용합니다. 

우리가 직접 적는 코드의 양을 줄이기 위해서 우리는 다른 사람의 설정으로부터 상속하여서 eslint를 하게 하는 장점을 사용해볼까합니다. 언제나 저는 [airbnb's style guide](https://github.com/airbnb/javascript) 스타일의 설정에서 시작합니다. 

시작하기 위해, 우리는 eslint와 airbnb스타일의 설정을 설치합니다. 

    npm install eslint
    npm install -g eslint-cli
    npm install --save-dev eslint eslint-config-airbnb-base

우리의 설정은 다음과 같은 것입니다 : 

```javascript
// .eslintrc
{
  "extends": "airbnb-base" // 'airbnb-base' because 'airbnb' assumes usage of react
}
```

그러나 linting이  **매우 자기의 의견을 주장하는** 영역이기 때문에, 저는 조금 다르게 설정하여 사용합니다. 
만약 당신이 모든 이러한 규칙이 의미하는 것을 안다면 [(여기를 참조)](http://eslint.org/docs/rules/) 당신의 기호에 맞춰서 lint를 할 수 있을 것입니다 : 


```javascript
// .eslintrc
{
  "extends": "airbnb-base",
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

추가적으로, eslint 는 바벨문법을 지원하지 안힉 때문에 우리는 다음의 두가지 패키지를 설치할 것입니다 : 

    npm install --save-dev babel-eslint eslint-plugin-babel


그리고 우리의 설정을 조금 더 바꾸도록 하겠습니다. 다음의 것을 추가해서말이죠 >> [babel specific rules](https://github.com/babel/eslint-plugin-babel):

```javascript
// .eslintrc
{
  "extends": "airbnb-base",
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
마침내 npm script을 위해서 존재하는 package.json파일에 당신의 linting을 추가하는 것 또한 좋은 생각입니다. 

```javascript
// package.json
"scripts": {
  "build": "webpack --config webpack.config.prod.js",
  "dev": "webpack-dev-server --config webpack.config.dev.js",
  "lint": "eslint src"
}
```

이것은 `num run lint`를 실행하여서 당신은 당신이 명시한 룰에 위반한 코드가 없게 할 수 있습니다. 


## Conclusion

(결론) 저는 불명확한 것이 있을 때를 대비하여 모든 것의 결과물을
[예제](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part2/example1) 여기에 남겨두었습니다..만약 당신이 여전히 이해하는데 문제를 겪고 있다면 이슈를 남겨주세요.

이제 우리는 ES6 코드를 적을 수 있고, 추가적으로 그것들을 쓰게 해주는 설정파일들을 이해할 수 있게 되었습니다.  :tada:!

그러나 당신은 처음부터 그것을 적었지만, 꼭 그래야 하는 것은 아닙니다. 편의를 위해서 시작할 수 있는, [당신이 클론할 수 있는 다른 분리된 레파지토리를](https://github.com/AriaFallah/minimal-babel-starter) 만들었습니다. 

이 튜토리얼 시리즈에 근거한 최소한의 리포지토리입니다. 

다음에 나올 것들을 기대해주세요:


* Part 3 에서는 React를 추가해보면서 다뤄보고 
* Part 4 에서는 React특징들의 좀 더 고급기능을 살펴보려고 합니다. 

읽어주셔서 감사합니다. 

[1]: https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md
[2]: https://github.com/AriaFallah/WebpackTutorial/tree/master/part1
