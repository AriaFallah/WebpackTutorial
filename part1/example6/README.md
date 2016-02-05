# Example 6 - The Development Server

Now we want to actually see our website in the browser, which requires a web server to serve our
code. Conveniently, webpack comes with the `webpack-dev-server`, which you need to install both
locally and globally

    npm install -g webpack-dev-server
    npm install --save-dev webpack-dev-server

The dev server is an extremely useful resource for seeing what your website looks like in the browser, and more rapid development. By default you can visit it at `http://localhost:8080`. Unfortunately, features such as hot reloading don't work out of the box, and require some more configuration.

This is a good point to split up our webpack config into one meant for development and one meant for
production. Since we're keeping it simple in this tutorial, it won't be a huge difference, but it's
an introduction to the extreme configurability of webpack. We'll call them `webpack.config.dev.js`
and `webpack.config.prod.js`.

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
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```


**Changes**

1. The dev config omits the optimizations as they are unnecessary overhead when you are constantly
rebuilding. So no `webpack.optimize` plugins.

2. The dev config has the necessary configuration for the dev server, which you can read more about
[here](https://webpack.github.io/docs/webpack-dev-server.html).

Summarized:

* entry: The two new entry points connect the server to the browser to allow for HMR.
* devServer
  * contentBase: Where to serve files from
  * hot: enable HMR
---

The prod config doesn't change much

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

I've also added a brand new property to both the dev config and the prod config:

* [devtool](https://webpack.github.io/docs/configuration.html#devtool) - This is a debugging aid.
Basically, when you get a error, it'll help you see where you made the mistake something like the
chrome developer console. As for the difference between `source-map` and `cheap-eval-source-map`
it's a little hard to glean from the docs. What I can say definitively is that `source-map` is meant
for production and has a lot of overhead, and that `cheap-eval-source-map` has less overhead and is
meant for developing only.

To run the dev server we have to run

    webpack-dev-server --config webpack.config.dev.js

and to build the production code we have to run

    webpack --config webpack.config.prod.js


To make our lives a little easier we are now going to use `package.json` as a simple task runner so
that we don't need to keep typing out either command.

We add them `scripts` property of the config

```javascript
// package.json
{
  //...
  "scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev"  : "webpack-dev-server --config webpack.config.dev.js"
  }
  //...
}
```

We can run these commands with

```
npm run build
npm run dev
```

You can now view your beautiful website by running `npm run dev`, and navigating to
`http://localhost:8080`.

**Side Note:** while I was testing this portion I realized that the server would not hot reload
when I modified the `index.html` file. The solution to this problem is over at
[extra](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/extra). It's useful
information that covers some more configuration options of webpack, which I recommend looking at,
but I left it separate because I feel like it lengthens the tutorial for too trivial of a reason.
