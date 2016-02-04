# Beginner Webpack Tutorial Part 1 - Introduction To Webpack :zap:

This is for the people like me who's first intro to webpack was a repository similar to:

* https://github.com/davezuko/react-redux-starter-kit
* https://github.com/webpack/react-starter

While these repositories are very well put together, they aren't necessarily the best learning tools. In my case, I got pretty confused trying to understand what was going on, and scrapped together my understanding from a lot of scattered resources.

I hope that this tutorial can make Webpack easy to learn.

## Requirements

At the very least you are expected to know the basics of node.js and npm.

## Contributing

I will gladly accept any and all contributions/corrections. Before filing an issue/opening a pull request just make sure to include some *objective* reason why you think the change is necessary.

## Table of Contents

* [Why Webpack?](#why-webpack)
* [The Basics](#the-basics)
  * [Installation](#installation)
  * [Bundling](#bundling)
  * [Loaders](#loaders)
  * [Plugins](#plugins)
* [Your Config File](#your-config-file)
  * [A Minimal Example](#a-minimal-example)
  * [Introducing Plugins](#introducing-plugins)
* [A More Complete Example](#a-more-complete-example)
  * [Introducing Loaders](#introducing-loaders)
  * [Adding More Plugins](#adding-more-plugins)
  * [The Development Server](#the-development-server)
  * [Just Kidding We Need Some More Things](#just-kidding-we-need-some-more-things)
  * [Start Coding](#start-coding)

## Why Webpack?

Because every single react/redux tutorial assumes you know it :cry:

More realistically here are some reasons you would want to use webpack.

* Lets you
  * Bundle your js files into a single file
  * Use npm packages in your frontend code
  * Write ES6/ES7 javascript (with help from babel)
  * Minify/Optimize code
  * Turn LESS/SCSS into CSS
  * Use HMR (Hot Module Replacement)
  * Include any type of file into your javascript
  * A lot more advanced stuff, which I won't cover

##### Why do I want these features?

* Bundle js files - Lets you write modular javascript, but you do not need to include a separate
`<script>` tag for each js file. (Configurable in case you do need more than one js file)

* Use npm packages in your frontend code - npm is the biggest ecosystem of open source code on the
internet. Chances are you can save writing code by taking a look at npm, and including the packages
you want in your frontend.

* ES6/ES7 - Adds lots of features to javascript that makes it more powerful and easier to write.
[Look here for an intro](https://github.com/DrkSephy/es6-cheatsheet).

* Minify/Optimize Code - Reduces the size of file that you're distributing. Benefits include things
like faster page loads.

* Turn LESS/SCSS into CSS - Nicer way to write CSS.
[Here's an intro if you're unfamiliar](http://alistapart.com/article/why-sass).

* Use HMR - A boost to productivity. Every time you save your code, it gets injected into the page
without requiring a full page refresh. This is really handy if you need to maintain the state of the
page while you are editing your code.

* Include any type of file into your javascript - Reduces need for other build tools, and allows you
to programmatically modify/use those files.

## The Basics

### Installation

To use most of the features of webpack you only need a global installation:

    npm install -g webpack

However some features of webpack, such as optimization plugins, require you to have it installed
locally. In which case you'll need to:

    npm install --save-dev webpack

### The Command Line

To run webpack:

    webpack

If you want webpack to build every time you change a file:

    webpack --watch

If you want to use a config file with webpack with a custom name:

    webpack --config myconfig.js

### Bundling

[Example 1](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example1)

Webpack is formally referred to as a module bundler. The way that it works is that you specify a
single file as your entry point. Then every single file that is included in your entry point through
`require` is concatenated into a single file called a bundle.

For example lets say you have the files `index.js` (your entry point), `file1.js`, `file2.js`, and
`file3.js` all in the same directory.

```
MyDirectory
|- index.js
|- file1.js
|- file2.js
|- file3.js
```

and this is the content of your files

```javascript
// index.js
require('./file1.js')
console.log('Third!')

// file1.js
require('./file2.js')
console.log('Second!')

// file2.js
console.log('First!')

// file3.js
console.log('No one likes me')
```

When you run `webpack`, you'll get a bundle with the contents of `index.js`, `file1.js`, and
`file2.js` because, through `require`, `file1.js` and `file2.js` are part of the dependency tree
that starts at the entrypoint `index.js`. As you've probably noticed `file3.js` will not be part of
the bundle because it is neither an entrypoint nor a part of the dependency tree:

So if you were to imagine the bundling process, it would look like this:

1.
```javascript
// index.js
require('./file1.js')
console.log('Third!')

// file1.js
/** require('./file2.js') is replaced by the contents of file2 **/
console.log('First!')
console.log('Second!')

// file3.js
console.log('No one likes me')
```

---
2.
```javascript
// index.js
/** require('./file1.js') is replaced by the contents of file1 **/
console.log('First!')
console.log('Second!')
console.log('Third!')

// file3.js - Completely ignored :'(
console.log('No one likes me')
```

---

3.
```javascript
// bundle.js - file3.js not a part of the final bundle
console.log('First!')
console.log('Second!')
console.log('Third!')
```

---

The things that are bundled are only the things that you explicitly required across your files.

### Loaders

The really cool, and interesting thing about webpack is that you can `require` more than just
javascript files. There is this concept in webpack called a loader. Using these loaders, you can
include anything from `.css` and `.html` to `.png` files.

```javascript
var myhtml = require('./myhtmlfile.html')
var mycss  = require('./mycssfile.css')
var mypng  = require('./mypng.png')
```

The image loader can be used to modify/minify image files. The HTML loader can be used to pull in
and programmatically modify/process/use your HTML files. The CSS loader can be used to include css
in your web pages.

These are just a few examples of the many loaders that webpack provides.


### Plugins

Plugins, like the name suggests, add extra functionality to webpack. One frequently used plugin is
the `UglifyJsPlugin`, which lets you minify your javascript code. We'll cover how to use this later.

## Your Config File

Webpack does not work out of the box so you need to tailor it to your needs. In order to do this you
need to create a file called

    webpack.config.js

as this is the name that webpack recognizes by default. If you choose to use a different name you
would have to use the `--config` flag to specify the file's name.

### A Minimal Example
[Example 2](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example2)

Say your directory structure looks like this:

```
MyDirectory
|- dist
|- src
   |- index.js
|- webpack.config.js

```

Then a very minimal webpack config you can make is this

```javascript
// webpack.config.js
var path = require('path')

module.exports = {
  entry: ['./src/index'], // file extension after index is optional for .js files
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

Going over the new properties one by one:

* [entry](https://webpack.github.io/docs/configuration.html#entry) - The entrypoint of your bundle,
which we discussed in the [bundling](#bundling) section. It's an array because webpack allows
multiple entry points if you want to generate multiple bundles.

* [output](https://webpack.github.io/docs/configuration.html#output) - Dictates the form of the output by webpack
  * [path](https://webpack.github.io/docs/configuration.html#output-path) - where to put the bundle
  * [filename](https://webpack.github.io/docs/configuration.html#output-filename) - what to call the bundle

When you run `webpack`, this will create a file called `bundle.js` in the dist folder.

### Introducing Plugins

[Example 3](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example3)

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

## A More Complete Example

Alternatively, because webpack can do more than just work with javascript, you can avoid the
copy-pasting and manage your entire project with webpack.

In the following section, we are going to create a very simple website using webpack. If you wish to
follow along with the example, create a directory with the structure

```
MyDirectory
|- dist
|- src
   |- index.js
   |- index.html
   |- styles.css
|- package.json
|- webpack.config.js
```

#### Contents

1. [Introducing Loaders](#introducing-loaders) - We will add loaders, which allow us to add CSS to our bundle.
2. [Adding More Plugins](#adding-more-plugins) - We will add a plugin that'll help us create/use an HTML file.
3. [The Development Server](#the-development-server) - We'll split our webpack config into separate `development` and `production` files. Then use the webpack-dev-server to view our website and enable HMR.
4. [Just Kidding We Need Some More Things](#just-kidding-we-need-some-more-things)
5. [Start Coding](#start-coding) - We will actually write some javascript.

#### Introducing Loaders

[Example 4](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example4)

Earlier in the tutorial I mentioned [loaders](#loaders). These will help us require non-js files in
our code. In this case, the only loader we will need is the css loader. First we need to install the loader:

    npm install --save-dev css-loader

Now that it's installed we can tweak our config to include the css loader:

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

This time when you run `webpack`, if we `require` a file that ends in `.css`, then we will apply
the `style` and `css` loaders to it, which adds the CSS to the bundle. If we didn't have the loaders,
then we would get an error like this:

```
ERROR in ./test.css
Module parse failed: /Users/Developer/workspace/tutorials/webpack/part1/example1/test.css
Line 1: Unexpected token {
You may need an appropriate loader to handle this file type.
```

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

#### Adding More Plugins

[Example 5](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example5)

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
  modules: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  }
}
```

This time, when you run `webpack` because we specified an `HtmlWebpackPlugin` with a template of
`./src/index.html`, it will generate a file called `index.html` in our `dist` folder with the
contents of `./src/index.html`

There's no point in using `index.html` as a template if it's empty so now would be a good time to
actually populate it.

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

#### The Development Server

[Example 6](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example6)

Now we want to actually see our website in the browser, which requires a web server to serve our
code. Conveniently, webpack comes with the `webpack-dev-server`, which you need to install both
locally and globally

    npm install -g webpack-dev-server
    npm install --save-dev webpack-dev-server

This is a good point to split up our webpack config into one meant for development and one meant for
production. Since we're keeping it simple in this tutorial, it won't be a huge difference, but it's
an introduction to the extreme configurability of webpack. We'll call them `webpack.config.dev.js`
and `webpack.config.prod.js`.

```javascript
// webpack.config.dev.js
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  var path = require('path')
  var webpack = require('webpack')
  var HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    devtool: 'cheap-eval-source-mao',
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
        filename: 'index.html',
        template: './src/website.html'
      })
    ],
    modules: {
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

and

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
  modules: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"]
    }]
  }
}
```

There are two major differences between the dev config, and the prod config:

1. The dev config omits the optimizations as they are unnecessary overhead when you are constantly
rebuilding. So no `webpack.optimize` plugins.

2. The dev config has the necessary configuration for the dev server, which you can read more about
[here](https://webpack.github.io/docs/webpack-dev-server.html).

Summarized:

* entry: The two new entry points connect the server to the browser to allow for HMR.
* devServer
  * contentBase: Where to serve files from
  * hot: enable HMR

I've also added a brand new property to both the dev config and the prod config:

* [devtool](https://webpack.github.io/docs/configuration.html#devtool) - This is a debugging aid.
Basically, when you get a error, it'll help you see where you made the mistake something like the
chrome developer console. As for the difference between `source-map` and `cheap-eval-source-map`
it's a little hard to glean from the docs. What I can say definitively is that `source-map` is meant
for production and has a lot of overhead, and that `cheap-eval-source-map` has less overhead and is
meant for developing only.

To make our lives a little easier we are now going to use `package.json` as a simple task runner so
that we don't need to keep typing out every command.

We will be adding a few commands to the `scripts` property of the config

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

They're not necessary, but they'll save you from constantly having to write out the longer webpack commands.

You can now view your beautiful website by running `npm run dev`, and navigating to
`http://localhost:8080`.

If you don't care that the server doesn't reload when you modify your html file. Feel free to skip
ahead to the [Start Coding](#start-coding).

#### Just Kidding We Need Some More Things

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
  devtool: 'cheap-eval-source-mao',
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
  modules: {
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
      process.env.NODE_ENV: JSON.stringify('production')
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

and in our `index.js` we will add a condition

```javascript
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
```

Phew problem solved. In a production build, when we don't need the `index.html` as part of the
dependency tree, we won't require `index.html`, which also means we don't need the `raw-loader`.

#### Start Coding

[Example 7](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example7)

The reason most people seem to be flustered by webpack is the fact that they need to go through all
of this to get to the point where they finally write javascript. However, now we have arrived at the
climax of our tutorial.

Just in case you haven't already: do `npm run dev`, and navigate to `http://localhost:8080`. Setting
up that dev server with hot reloading wasn't for show. Every single time you save while editing your
any part of your project the browser will reload to show your changes.

We are also going to require a npm package just to demonstrate how you can use them in your
frontend now.

    npm install --save pleasejs

PleaseJS is a random color generator, which we're going to hook up to our button to change the color
of our div.

```javascript
// index.js
require('./styles.css') // The page is now styled
var Please = require('pleasejs')

// TODO other stuff
```

## Conclusion

I hope this is helpful. If you have any questions, feel free to leave them as issues. If you feel
that I left anything out, make sure to leave an issue or make a pull request.

Webpack first and foremost is a module bundler. It's an extremely modular and useful tool,
which, in fact, you can use without ES6, and without React.

Now given that

* Part 2 will address using Webpack to transpile ES6 to ES5 with Babel
* Part 3 will address using Webpack with React + Babel

Since those are the most common use cases.

**Important Note:** I feel like I should mention that the `html-webpack-plugin` should
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

## Closing Thoughts

Congratulations! You made a button that changes the color of a div! Isn't webpack great?

Yes it is; however, if all you're doing is making a button that changes the color of a div, it's
probably not worth it writing a config like this. The config from example 2 would have been
sufficient :smile:. Use the right tool for the job.
