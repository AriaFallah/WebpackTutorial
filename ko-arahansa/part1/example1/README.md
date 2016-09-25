# Example 1 - Bundling and Loaders

![Official Dependency Tree](http://i.imgur.com/YU4xBPQ.png)

번들링  [예제 1](https://github.com/AriaFallah/WebpackTutorial/tree/master/ko-arahansa/part1/example1)

![Official Dependency Tree](http://i.imgur.com/YU4xBPQ.png)

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