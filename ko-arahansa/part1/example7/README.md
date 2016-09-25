# Example 7 - Start Coding

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
