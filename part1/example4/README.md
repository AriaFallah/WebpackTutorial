# Example 4 - Introducing Loaders

Earlier in the tutorial I mentioned [loaders](#loaders). These will help us require non-js files in our code. In this case, the only loader we will need is the css loader. First we need to install the loader:

    npm install --save-dev css-loader

Now that it's installed we can tweak our config to include the css loader:

```javascript
// webpack.config.js
var path = require('path')
var webpack = require('webpack')

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
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  modules: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  }
}
```

Going over the new properties one by one:

* [modules](http://webpack.github.io/docs/configuration.html#module) - Options affecting your files
  * [loaders](http://webpack.github.io/docs/configuration.html#module-loaders) - An array of loaders that we specify for our application
    * test - A regular expression to match the loader with a file
    * loaders - Which loaders to use for files that match the test

When you run `webpack`, this will create a file called `bundle.js` in the dist folder; however, if we `require` a file that ends in `.css`, then we will apply the `style` and `css` loaders to it, which adds the CSS to the bundle.

**Optional**

If you want to use SCSS instead of CSS you would need to run:

    npm install --save-dev sass-loader node-sass webpack

and instead your loader would be written as

```javascript
{
  test: /\.scss$/,
  loaders: ["style", "css", "sass"]
}
```

The process is similar for LESS.
