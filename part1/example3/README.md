# Example 3 - Introducing Plugins

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