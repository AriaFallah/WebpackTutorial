# Example 2 - A minimal example

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
