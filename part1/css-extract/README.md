# Example 7 - Extract Your CSS

Ok so now you've finished, but in production you don't want your CSS file to be inline with your
javascript. For this purpose we'll be using the
[Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin).

    npm install --save-dev extract-text-webpack-plugin

And we make the necessary changes to our webpack prod config:

```javascript
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin("styles.css")
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }]
  }
}
```

These changes come straight from the README of the
[official-repo](https://github.com/webpack/extract-text-webpack-plugin). Make sure to take a look if
you want to know how it works more in depth.

> It moves every require("style.css") in entry chunks into a separate css output file. So your styles are no longer inlined into the javascript, but separate in a css bundle file (styles.css). If your total stylesheet volume is big, it will be faster because the stylesheet bundle is loaded in parallel to the javascript bundle.

Now if you do an `npm run build` using this config your CSS will be in a separate file, and
interestingly, already included in your `index.html`.

```html
<html>
<head>
  <title>Webpack Tutorial</title>
<link href="styles.css" rel="stylesheet"> <------ MAGICALLY ADDED
</head>
<body>
  <h1>Very Website</h1>
  <section id="color"></section>
  <button id="button">Such Button</button>  
<script src="bundle.js"></script></body>
</html>
```
