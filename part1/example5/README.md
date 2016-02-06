# Example 5 - Adding More Plugins

Now that we have the infrastructure for styling our website we need an actual page to style.
We'll be doing this through the
[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin),
which lets us generate an HTML page or use an existing one. We'll use an existing one `index.html`.

First we install the plugin:

    npm install --save-dev html-webpack-plugin@2

Then we can add it to our config

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
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  }
}
```

This time, when you run `webpack`, because we specified an `HtmlWebpackPlugin` with a template of
`./src/index.html`, it will generate a file called `index.html` in our `dist` folder with the
contents of `./src/index.html`

There's no point in using `index.html` as a template if it's empty. Now would be a good time to
actually populate it.

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

and while we're at it let's add some basic styling in `styles.css`

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

#### Side note

I feel like I should mention that the `html-webpack-plugin` should
be used sparingly. To me, webpack should generate HTML files if you just have a really simple
one to bootstrap a SPA. So while it was useful for the learning experience, which required only
one HTML file, I wouldn't recommend it to generate 12 HTML files. This doesn't mean you can't use
html files with something like angular directives, which require HTML template files. In that case
you could do something like:

```javascript
// ...directive stuff
template: require('./templates/button.html') // using raw loader
```

Instead, it means that you should not be doing something like this:

```javascript
new HtmlWebpackPlugin
  template: './src/index.html'
}),
new HtmlWebpackPlugin({
  template: './src/button.html'
}),new HtmlWebpackPlugin({
  template: './src/page2.html'
})
```

Anyone with other experience feel free to correct me if I'm wrong.
