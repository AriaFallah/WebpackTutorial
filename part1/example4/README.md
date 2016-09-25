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
