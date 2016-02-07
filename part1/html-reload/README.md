# Extra - Make your HTML hot reload

So while I was testing I realized that index.html would not hot reload! After searching for a bit
I finally came across
[this helpful answer](http://stackoverflow.com/questions/33183931/how-to-watch-index-html-using-webpack-dev-server-and-html-webpack-plugin),
which will require
[one more loader](https://github.com/webpack/raw-loader) to make our hacky solution come to life,
and [one more plugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin) to prevent
our hacky solution from going into production.

Basically to make Webpack hot reload our HTML we need to make it part of our dependency tree by
requiring it in one of our files. In order to do this, we will be using the `raw-loader` loader,
which pulls our HTML into javascript as a string, but additionally will do exactly what we need:
add the HTML to the dependency tree.

So lets add the loader to our dev config:

First we install with

    npm install --save-dev raw-loader

Then we can add it:

```javascript
// webpack.config.dev.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }, {
      test: /\.html$/,
      loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```

This time, when you run `webpack`, if we `require` a file that ends in `.html`, then we will apply
the `raw-loader` loader to it, which adds the HTML to the bundle.

Now in our currently empty `index.js` file we can do.

```javascript
// index.js
require('./index.html')
```

If you were to check now, hot reloading should be working, but also you should realize we just
required `index.html` in our `index.js`, and then did absolutely nothing with it. We don't want
to do that in production, which is why we will be using the handy dandy
[DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin).

The plugin lets us create a global constant for our entire bundle, which we could name anything,
such as `DONT_USE_IN_PRODUCTION: true`, but more practically, a popular choice that looks a bit more
familiar is `process.env.NODE_ENV: JSON.stringify('production')`. Why JSON.stringify? Because
according to the docs:

> If the value is a string it will be used as a code fragment.

Now that we know that, we'll be adding this plugin to our production config:

```javascript
// webpack.config.prod.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
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

and in our `index.js` we will add a condition

```javascript
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
```

Phew problem solved. In a production build, when we don't need the `index.html` as part of the
dependency tree, we won't require `index.html`, which also means we don't need the `raw-loader`.
