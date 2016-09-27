# 웹팩입문자를 위한 튜토리얼 파트1 - 웹팩 입문 ! :zap:

이것은 나같은 입문자를 위한 비슷한 리파지토리들이다. :

* https://github.com/davezuko/react-redux-starter-kit
* https://github.com/webpack/react-starter

이러한 리파지토리들이 잘 설명을 해놓긴 했는데, 이것들은 배우기에 최고의 도구들은 아니다. 
나의 경우에는 뭐가 뭔지 조금 이해하기 힘들었고, 여기저기서 널리 흩어진 자료들과 내가 이해한 바를 같이 모아보았다. 

이 튜토리얼이 웹팩을 배우기 쉽게 해줬으면 한다. 

## Requirements

적어도 당신은 node.js의 기초와 npm 을 알기를 바란다. 

## Contributing

난 모든 기여와 교정을 기쁘게 받아들일 것이며 질문이 있다면 이슈를 남겨라. 내가 만약 실수를 저지르면 그것들을 지적해주고 내가 어떤 것을 놓치거나, 좀 더 잘 설명할 수 있으면 이슈를 만들고 풀리퀘스트를 해주시오! 

## Table of Contents

* [왜 웹팩인가](#why-webpack)
* [기초](#the-basics)
  * [설치](#installation)
  * [번들링](#bundling)
  * [로더들](#loaders)
  * [플러그인들](#plugins)
* [설정파일](#your-config-file)
  * [가장 작은 예제](#a-minimal-example)
  * [플러그인들 소개](#introducing-plugins)
* [좀 더 복잡한 예제](#a-more-complete-example)
  * [로더들의 소개](#introducing-loaders)
  * [더 많은 플러그인 추가하기](#adding-more-plugins)
  * [개발 서버 ](#the-development-server)
  * [코딩 시작 !](#start-coding)
* [결론](#conclusion)
* [마무으리](#closing-thoughts)

## Why Webpack? 


(왜 웹팩인가) 많은 리액트리덕스 튜토리얼들이 당신이 웹팩을 안다고 가정한다 (역주:원저자가 많이 데었나?)  :cry:
좀 더 현실적으로 여기 당신이 웹팩을 사용하고자 하는 이유가 있다.

혜택:
  * 당신의 js파일들을 하나의 파일로 번들링해준다. 
  * npm 패키지들을 프론트엔드 코드에 사용한다. 
  * ES6/ES7 자바스크립트를 babel의 힘과 함께 써주게 해준다. 
  * 코드를 최소화/최적화 한다.
  * LESS/SCSS를 CSS로 바꿔준다.
  * Use HMR (핫 모듈 리플레이스)
  * 어떤 파일이건 자바스크립트 안에 넣어준다. 
  * 내가 다루지 않은 좀 더 대단한 많은 것들 !!

#####  왜 내가 이러한 것들을 원하는 가? 

* JS파일 번들링 - 당신의 모듈러 자바스크립트를 써본다고 할 때 당신은 각각의 분리된 `<script>`태그를 매 파일마다 적고 싶지 않을 것이다. 

* npm 패키지들을 프론트엔드 코드에 사용 - npm은 인터넷 오픈소스의 거대한 생태계이다. npm 을 잠깐 보고 원하는 패키지를 당신의 프론트엔드에  추가하는 것만으로도 당신은 많은 코드를 적지 않아도 된다. 

* ES6/ES7 - 자바스크립트에 많은 특징들이 들어가게 되어서 좀 더 강력하고 사용하기 쉽게 해준다. 
[더 알고 싶다면 여기를 좀 더 보자.](https://github.com/DrkSephy/es6-cheatsheet).

* 최소화/최적화 Code - 분배할 파일 사이즈를 경감시키고 페이지 로딩같은 것을 좀 더 빠르게 해준다. 

* Turn LESS/SCSS into CSS - CSS를 적는 좋은 방법 !
[만약 당신이 친숙하지 않아면 여기에 인트로가 있다 ! ](http://alistapart.com/article/why-sass).

* HMR 사용하기 - 생산성의 부스트 ! 당신이 코드를 저장할 때 마다 페이지 전체를 갱신할 필요없이 이것들이 페이지에 들어가게 됩니다. 이것은 당신이 코드를 편집하는 동안 페이지의 상태를 유지할 때 무척 편합니다! 

* 어떤 타입이건간에 자바스크립트에 넣기 - 다른 빌드도구를 덜 사용하게 해주고 그러한 파일들을 선언적으로 수정/사용하게 해줍니다.

## The Basics
(기초)

### Installation


(설치) 웹팩의 많은  기능을 사용하기 위해  글로벌로 설치합시다. : 

    npm install -g webpack

그러나 몇가지 웹팩의 기능을 사용하기 위해서 (최적화 플러그인같은..) 당신은 로컬로 설치하는 것이 필요합니다. 이러한 경우 이렇게 치면 됩니다. 

    npm install --save-dev webpack

### The Command Line

(커맨드라인도구) 웹팩은 이렇게 실행합니다. 

    webpack

만약 파일이 변경될때마다 웹팩이 빌드되기를 원한다면 다음과 같이 치세요  :

    webpack --watch

If you want to use a config file with webpack with a custom name:

    webpack --config myconfig.js

### Bundling

번들링  [예제 1](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1/example1)

웹팩은 공식적으로 모듈 번들러로 얘기됩니다.만약 당신이 좀 더 모듈과 모듈번들링에 대해서 깊이 있는 정보를 원한다면 여기 두개의 무척 좋은 글을 읽어보세요 
[here](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.jw1txw6uh)
and [here](https://medium.com/@preethikasireddy/javascript-modules-part-2-module-bundling-5020383cf306#.lfnspler2).

우리는 단순하게 갈 것입니다. 이것이 동작하는 방식은 당신이 하나의 파일을 엔트리 포인트로 설정하는 것입니다. 
이 파일은 당신의 트리의 root가 될 것인데 당신이 다른 파일로부터 파일을 `require` 할 때마다 이 트리에 추가가 되게 됩니다. 당신이 `webpack`을 치면 모든 이러한 파일/모듈들은 하나의 단일 파일로 번들링되게 됩니다. 

여기 예제가 있습니다. : 

![Dependency Tree](http://i.imgur.com/dSghwwL.png)

이 사진은 디렉터리를 보여줍니다 :

```
MyDirectory
|- index.js
|- UIStuff.js
|- APIStuff.js
|- styles.css
|- extraFile.js
```

그리고 이것은 당신의 파일의 내용을 보여줍니다.

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

만약 당신이 `webpack` 을 치면 당신은 이 계층구조가 가진 내용들의 번들을 받게 됩니다. 하지만 같은 폴더 내에 있어도 `required`되지 않은 `extraFile.js`은 번들링에 포함되지 않게 됩니다. 

`bundle.js` 는 다음과 같을 것입니다 : 

```javascript
// contents of styles.css
// contents of UIStuff.js + React
// contents of APIStuff.js + fetch
```

번들되는 것은 당신이 명시적으로 required 한 것들만 번들링됩니다. 

### Loaders

(로더) 당신은 아마 눈치 챘겠지만, 위의 예제에서 제가 뭔가 이상한 것을 했었습니다. 저는 자바스크립트 파일에 css파일을 `required` 했습니다.

자바스크립트 이외의 것들을 `require` 할 수 있다는 것은 웹팩에서 꽤 좋으면서 흥미롭습니다. 
웹팩에서는 로더라는 것이 존재하는 데, 이러한 로더들을 사용하여서 당신은  `.css` 와 `.png`, `.html` 파일들 같은 것 무엇이든지 `require`할 수 있습니다. 

예로, 위의 다이어그램에서

```javascript
// index.js
require('./styles.css')
```

만약 제가 웹팩설정에 [the style-loader](https://github.com/webpack/style-loader) 와  [the css-loader](https://github.com/webpack/css-loader)를 추가하는 것은 유효할 뿐만 아니라, 제 페이지에 실제로 적용될 것입니다. 

이것은 당신이 웹팩을 가지고서 할 수 있는 많은 로더들의 하나의 예일뿐입니다.

### Plugins

(플러그인들) 이름이 제시하는 대로 플러그인은 웹팩에 그외의 여러가지 기능들을 제공합니다. 자주 사용되는 플러그인은 `UglifyJsPlugin` 입니다 (역주: `webpack -p` 하면 압축되면서 용량 같이 나오는 것아닌가? 흠..) 
이것은 자바스크립트 코드를 최소화 시켜주는데 나중에 다뤄보도록 하겠습니다. 

## Your Config File

(설정파일) 웹팩은 필요에 맞게 설정파일을 필요로 합니다. 당신은 다음의 파일을 생성해야 합니다. 

    webpack.config.js

해당 파일명은 웹팩이 기본으로 인식하므로, 다른 이름을 사용하고 싶다면 `--config` 플래그를 사용하면서 파일명을 구체적으로 적어줘야 합니다. 

### A Minimal Example
(최소한의 예제)
[예제 2](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1/example2)

당신의 디렉터리 구조가 다음과 같다고 합시다 : 

```
MyDirectory
|- dist
|- src
   |- index.js
|- webpack.config.js

```

그러면 당신의 최소 웹팩 설정은 다음과 같이 만들 수 있을 것입니다. 

```javascript
// webpack.config.js
var path = require('path')

module.exports = {
  entry: ['./src/index'], // file extension after index is optional for .js files
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

새로운 속성들을 하나하나씩 알아보겠습니다 :

* [entry](https://webpack.github.io/docs/configuration.html#entry) - 당신의 번들의 엔트리포인트입니다. [번들링](#bundling) 섹션에서 좀 더 알아볼 것입니다.. 

웹팩은 여러개의 번들을 생성하기를 원하면, 여러개의 엔트리 포인트들을 허용하기 때문에 엔트리포인트는 배열입니다.

* [output](https://webpack.github.io/docs/configuration.html#output) - 웹팩에 의해 출력되는 형태를 나타냅니다. 
  * [path](https://webpack.github.io/docs/configuration.html#output-path) - 번들을 놓을 곳입니다. 
  * [filename](https://webpack.github.io/docs/configuration.html#output-filename) - 번들을 어떻게 부를 지 나타냅니다. 

`webpack`을 실행하면 이것은 `bundle.js` 라는 파일을 dist폴더 안에 생성할 것입니다. 

### Introducing Plugins

( 플러그인 소개하기 ) [Example 3](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example3)


당신이 모든 파일들을 한꺼번에 번들링했다가 당신이 그것이 900KB라는 것을 깨달았다고 해봅시다. 이것은 번들을 최소화함으로써 개선될 수 있습니다. 제가 이전에 언급한 [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin)를 사용하여서 이러한 문제를 해결할 수 있습니다. 

당신은 플러그인을 사용하려고 웹팩을 로컬로 설치하고 싶을 겁니다.

    npm install --save-dev webpack

당신은 이제 웹팩을 사용하여서 코드를 최소화 하세요 

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

새로운 속성들을 하나하나 알아보도록 하겠습니다 : 

* plugins - 플러그인들을 적을 배열.
  * [webpack.optimize.UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) - 코드를 최소화하고 경고 메시지를 숨깁니다. 

여기서 당신이 `webpack`을 칠 때, 당신은 `UglifyJsPlugin`을 가지고서 공백을 제거함으로써 900KB를 200KB 까지 줄일 수 있습니다. 

당신은 또한 [OccurrenceOrderPlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin) 을 추가할 수가 있습니다.

> 모듈을 할당하고 발생 카운트 아이디들을 발생(?chunk)시킵니다. ID들은 종종 적은(짧은) id들을 얻는데 사용됩니다. 이것은 id가 예상가능하며 파일 전체 크기를 경감시켜 추천됩니다. 

솔직히 어떤 메커니즘이 하부에 있는 지 모르겠지만 현재(1버젼?)에서는 기본으로 들어가지 않기 때문에 [webpack2 beta it's included by default](https://gist.github.com/sokra/27b24881210b56bbaff7), 이것또한 추가해줬습니다 .


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
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
```

우리는 설정파일을 써서 우리의 번들 자바스크립트 파일을 최소화하였습니다. 이 번들은 다른 프로젝트의 디렉터리로 복사될 수 있습니다. 그리고 그곳의 script태그로 던져질 수 있습니다. 만약 당신이 웹팩의 기초만을 *자바스크립트만* 사용하기를 원한다면 [결론](#conclusion)을 생략할 수 있습니다. 


## A More Complete Example

(좀더 복잡한 예제 ) 웹팩이 자바스크립트 번들 이상의 것을 하기 때문에, 당신은 복붙을 피하고 전체 프로젝트를 웹팩으로 관리할 수가 있습니다. 

다음의 섹션에서는 우리는 웹팩을 사용하여 무척 간단한 예제를 만들 것입니다. 
만약 당신이  예제와 함께 따라가고 싶다면 다음 구조로 디렉터리를 만드십시오. 

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

#### Contents

1. [로더 소개하기](#introducing-loaders) - 우리는 여기서 우리의 번들에 CSS를 추가하게 해주는 로더들을 추가할 것입니다. 
2. [많은 플러그인 더하기](#adding-more-plugins) - 우리는 HTML파일을 생성하고 사용하는데 도움을 주는 플러그인 같은 것들을 추가할 것입니다.
3. [개발서버](#the-development-server) - 우리는 웹팩설정을  `development`과 `production` 용도로 나눌 것입니다. 그러고 webpack-dev-server를 이용하여 우리의 웹사이트를 볼것이며 핫 모듈 대체(HMR)을 사용할 것입니다. 
4. [코딩 시작하기](#start-coding) - 우리는 실제로 몇가지 자바스크립트를 작성할 것입니다. 

#### Introducing Loaders

(로더소개하기)[예제 4](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1/example4)

이 튜토리얼의 앞에서 [로더들](#loaders)을 얘기했듯이, 이것들은 우리에게 js파일이 아닌것을 우리의 코드에 require하게 해줍니다. 이러한 경우 우리는 style loader 와 css loader를 필요로 합니다. 먼저 이 로더들을 설치하도록 하겠습니다:

    npm install --save-dev style-loader css-loader

이제 이것들은 설치되었고 설정을 좀 더 바꿔서 css loader 를 추가해줘보도록 하겠습니다. : 


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
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  }
}
```

새로운 속성들을 하나하나 알아보도록 하겠습니다 : 

* [모듈](http://webpack.github.io/docs/configuration.html#module) - 당신의 파일들에 영향을 주는 옵션들 입니다. 
  * [loaders](http://webpack.github.io/docs/configuration.html#module-loaders) - 어플리케이션을 위해 적어줄 로더들의 배열입니다. 
    * test - 로더가 적용될 파일을 매칭하기 위한 정규식입니다. 
    * loaders - test에서 매칭된 파일에 어떤 로더를 사용할지 결정합니다. 

여기서 우리가 `webpack`을 실행할 때, 만약 당신이  `.css`로 끝나는 파일들을 `require` 했다면 우리는 이것들에  `style`과 `css` 로더를 적용하고 번들에 해당 css를 추가합니다.

만약 우리가 로더들을 가지고 있지 않았다면, 우리는 다음과 같은 에러를 얻을 것입니다 : 

```
ERROR in ./test.css
Module parse failed: /Users/Developer/workspace/tutorials/webpack/part1/example1/test.css
Line 1: Unexpected token {
You may need an appropriate loader to handle this file type.
```

**Optional(옵션)**

만약 당신이 CSS대신에 SCSS 를 사용하기를 원핟다면 다음과 같이 실행하세요 : 

    npm install --save-dev sass-loader node-sass webpack

그리고 로더 부분을 다음과 같이 적으세요.. 

```javascript
{
  test: /\.scss$/,
  loaders: ["style", "css", "sass"]
}
```

LESS도 비슷합니다. 

로더를 인식하는 점에서 중요한 점은 이러한 로더들이 적혀지는 *순서*입니다. 위의 예제에서 `sass`로더가 제일 처음 당신의 `.scss` 파일들에 적용이 되고 그리고 `css`로더가 적용이 되며 마지막으로 `style`로더가 적용이 되게 됩니다. 당신이 볼 수 있듯이, 패턴이 적용되는 순서는 오른쪽에서 왼쪽입니다. 

#### Adding More Plugins

(더 많은 플러그인 추가하기) [예제 5](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1/example5)

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

#### The Development Server

(개발서버)[예제 6](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1/example6)

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

#### Start Coding

(코딩시작하기)[예제 7](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example7)

대부분의 사람이 웹팩에 의해 처음에 어리둥절하는 것은, 그들이 자바스크립트를 작성하기 위한 시점까지 가기 위해 이러한 것들을 모두 거쳐야 하기 때문입니다. 그러나 우리는 마침내 이 튜토리얼의 클라이맥스에 도달하였습니다. 

당신이 아직 준비가 되지 않았을 지도 모르니.. `npm run dev`를 치시고 `http://localhost:8080`를 쳐보세요.. 개발서버를 핫리로딩으로 세팅한 것이 아직 나타나진 않지만, 당신 프로젝트의 어떤 부분을 수정하건간에(역주: entry에 설정한 부분일듯)  브라우저는 그 변화를 반영할 것입니다. 

우리는 npm 패키지를 하나 더 얻어서, 어덯게 이것들을 프론트엔드에서 지금 사용할 것인지 설명할 것입니다. 

    npm install --save pleasejs

PleaseJS는 랜덤 컬러 생성기로 우리의 div 색상을, 버튼에 이벤트를 연결해서 바꿀 것입니다. 

```javascript
// index.js

// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // The page is now styled
var Please = require('pleasejs')
var div = document.getElementById('color')
var button = document.getElementById('button')

function changeColor() {
  div.style.backgroundColor = Please.make_color()
}

button.addEventListener('click', changeColor)
```

흥미롭게도, [핫모듈 대체가 동작하게 하기 위해](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html#what-is-needed-to-use-it)

당신은 이 코드를 필요로 할 것입니다 : 

```javascript
if (module.hot) {
  module.hot.accept()
}
```

이것을 모듈의 부모나 모듈안에 넣어두세요. 
그러면 됬습니다. 

**기타 노트:** 당신은 아마 css가 적용되는 동안에 딜레이를 눈치채거나 css가 자바스크립트안에 들어가있는 것을 싫어할수도 있습니다. 그런 경우를 대비하여서 다른 예제를 만들었습니다. 
[css-extract](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/css-extract). 
여기서는 어떻게 CSS를 다른 파일에 넣을 것인지 설명합니다. 

## Conclusion

(결론) 이것이 꽤 도움이 될 것입니다. 

웹팩은 모듈번들러입니다. 이것은 매우 모듈화되어있고, 유용한 도구고..사실 ES6와 React와는 연결되어있지 않습니다. 

그러면 다음 차례로

* Part 2 에서는 웹팩과 bable을 사용하여서 ES6를 ES5로 트랜스파일 해보겠습니다.
* Part 3 에서는 웹팩에서 React와 Babel을 사용해보도록 하겠습니다. 

저것들이 보통 흔한 사용 예이기 때문입니다. 


## Closing Thoughts

(마치면서) 축하드립니다! 당신은 div의 색상을 변할 수 이게 하는 버튼을 만들었습니다. 웹팩이 대단하지 않나요? 
예 대단합니다. 하지만 만약 당신이 이런 색상을 바꾸는 버튼만 만든다면 이러한 설정을 작성하는 것은 그다지 가치가 있지 않을 것입니다. 만약 그렇다면 당신은 피로감을 얻겠죠... :anguished:
