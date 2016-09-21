# Example 3 - Introducing Plugins

Imagine that you've used webpack to bundle all your files together, and now you've realized that all
together it's 900KB. This is a problem that can be ameliorated by minifying your bundle. To do this
you need to use a plugin I mentioned earlier called the
[UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin).

Moreover you will need to have webpack installed locally to actually be able to use the plugin.

    npm install --save-dev webpack

Now you can require webpack and minify your code.

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
    })
  ]
}
```
Going over the new properties one by one:

* plugins - An array that holds your plugins.
  * [webpack.optimize.UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) - Minify your code, and suppress warning messages.

This time, when you run `webpack`, now that you have the `UglifyJsPlugin` this could reduce your
imaginary 900KB file to 200KB by through processes such as removing all the whitespace.

You can also add the [OrderOccurencePlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin)

> Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids. This make ids predictable, reduces to total file size and is recommended.

To be honest I'm not sure how the underlying mechanisms work, but in the current [webpack2 beta it's included by default](https://gist.github.com/sokra/27b24881210b56bbaff7) so I include it as well.

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
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
```

So now we have written a config that allows us to minify and bundle our javascript. This bundle
could be copied and pasted into another project's directory, and thrown into a `<script>` tag there.
You can skip to the [conclusion](#conclusion) if you only care about the basics of using webpack
with *only javascript*.
