# Example 5 - Adding More Plugins

Now that we have the infrastructure for styling our website we need an actual page to style. We'll be doing this through the [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin), which lets us generate an HTML page or use an existing one. We'll use an existing one `website.html`.

First we install the plugin:

    npm install --save-dev html-webpack-plugin@2

Then we can add it to our config

```javascript
// webpack.config.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/index'], // .js after index is optional
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/website.html'
    })
  ],
  modules: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  }
}
```

Adding the plugin just means requiring it, and adding it to your plugins array. We also specify that we want it to use `website.html` as the template, but call it index.html in the dist folder.

We'll also have to actually put something in `website.html`

```html
<html>
<head>
  <title>Webpack Tutorial</title>
</head>
<body>
  <h1>Very Website</h1>
  <section id="color"></section>
  <button>Such Button</button>
  <script src="bundle.js"></script>
</body>
</html>
```

and while we're at it let's add some basic styling in `styles.css`

```css
h1 {
  color: rgb(114, 191, 190);
}

#color {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

button {
  cursor: pointer;
  display: inline-block;
  height: 20px;
  background-color: rgb(123, 109, 198);
  color: rgb(255, 255, 255);
  padding: 10px 5px;
  border-radius: 4px;
  border-bottom: 2px solid rgb(143, 132, 200);
}
```
