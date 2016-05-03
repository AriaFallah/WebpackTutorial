# Example 1 - Bundling and Loaders

![Official Dependency Tree](http://i.imgur.com/YU4xBPQ.png)

Webpack is formally referred to as a module bundler. If you want an in-depth and accessible explanation
on modules and module bundling definitely check out these two great articles:
[here](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.jw1txw6uh)
and [here](https://medium.com/@preethikasireddy/javascript-modules-part-2-module-bundling-5020383cf306#.lfnspler2).
We're gonna keep it simple. The way that it works is that you specify a single file as your entry point.
This file will be the root of your tree. Then every time you `require` a file from another file it's
added to the tree. When you run `webpack`, all these files/modules are bundled into a single file.

Here's a simple example:

![Dependency Tree](http://i.imgur.com/dSghwwL.png)

Given this picture you could have the directory:

```
MyDirectory
|- index.js
|- UIStuff.js
|- APIStuff.js
|- styles.css
|- extraFile.js
```

and this could be the content of your files

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

When you run `webpack`, you'll get a bundle with the contents of this tree, but `extraFile.js`, which was in the same directory, will not be part of
the bundle because it is not a part of the dependency tree:

`bundle.js` will look like:

```javascript
// contents of styles.css
// contents of UIStuff.js + React
// contents of APIStuff.js + fetch
```

The things that are bundled are only the things that you explicitly required across your files.

### Loaders

As you probably noticed, I did something strange in the above example. I `required` a css file in a javascript file.

The really cool and interesting thing about webpack is that you can `require` more than just
javascript files.

There is this thing in webpack called a loader. Using these loaders, you can
`require` anything from `.css` and `.html` to `.png` files.

For example in the diagram above I had

```javascript
// index.js
require('./styles.css')
```

If I include [the style-loader](https://github.com/webpack/style-loader) and the [the css-loader](https://github.com/webpack/css-loader) in my webpack config, this is not only perfectly
valid, but also will actually apply the CSS to my page.

This is just a single example of the many loaders you can use with webpack.
