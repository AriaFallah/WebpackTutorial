# Example 7 - Start Coding

The reason most people seem to be flustered by webpack is the fact that they need to go through all
of this to get to the point where they finally write javascript; however, now we have arrived at the
climax of our tutorial.

Just in case you haven't already: do `npm run dev`, and navigate to `http://localhost:8080`. Setting
up that dev server with hot reloading wasn't for show. Every single time you save while editing
any part of your project, the browser will reload to show your changes.

We are also going to require a npm package just to demonstrate how you can use them in your
frontend now.

    npm install --save pleasejs

PleaseJS is a random color generator, which we're going to hook up to our button to change the color
of our div.

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

Interestingly, [in order for Hot Module Replacement to work](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html#what-is-needed-to-use-it)
You need to include the code:

```javascript
if (module.hot) {
  module.hot.accept()
}
```

in a module or a parent of that module.
