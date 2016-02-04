# Example 3 - Minifying Your Bundle

Imagine that you've used webpack to bundle all your files together, and now you've realized that all together it's 900KB. This is a problem that can be ameliorated by minifying your bundle. To do this you need to use a plugin I mentioned earlier called the [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin).

```javascript
// webpack.config.js

module.exports = {
  entry: ['./src/index'], // .js after index is optional
  output: {
    path: __dirname + '/dist',
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

This could reduce your imaginary 900KB file to 200KB by removing all the whitespace among other things.

You can also add the [OrderOccurencePlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin)

> Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids. This make ids predictable, reduces to total file size and is recommended.

To be honest I'm not sure how this helps, but it says recommended so why not just throw it in your config.

```javascript
// webpack.config.js

module.exports = {
  entry: ['./src/index'], // .js after index is optional
  output: {
    path: __dirname + '/dist',
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
