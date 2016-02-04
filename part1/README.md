# Beginner Webpack Tutorial Part 1 - Introduction To Webpack :zap:

This is for the people like me who's first intro to webpack was a repository similar to:

* https://github.com/davezuko/react-redux-starter-kit
* https://github.com/webpack/react-starter

At the very least you are expected to know the basics of node.js and npm.

## Contributing

I will gladly accept any and all contributions/corrections. Before filing an issue/opening a pull request just make sure to include some *objective* reason why you think the change is necessary.

## Table of Contents

* [Why Webpack?](#why-webpack)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [The Basics](#the-basics)
* [Your Config File](#your-config-file)
  * [A Minimal Example](#a-minimal-example)
  * [Introducing Plugins](#introducing-plugins)
* [A More Complete Example](#a-more-complete-example)
  * [Introducing Loaders](#introducing-loaders)
  * [Adding More Plugins](#adding-more-plugins)
  * [The Development Server](#the-development-server)
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

* Bundle js files - Lets you write modular javascript, but you do not need to include a separate `<script>` tag for each js file. (Configurable in case you do need more than one js file)

* Use npm packages in your frontend code - npm is the biggest ecosystem of open source code on the internet. Chances are you can save writing code by taking a look at npm, and including the packages you want in your frontend.

* ES6/ES7 - Adds lots of features to javascript that makes it more powerful and easier to write. [Look here for an intro](https://github.com/DrkSephy/es6-cheatsheet).

* Minify/Optimize Code - Reduces the size of file that you're distributing. Benefits include things like faster page loads.

* Turn LESS/SCSS into CSS - Nicer way to write CSS. [Here's an intro if you're unfamiliar](http://alistapart.com/article/why-sass).

* Use HMR - A huge boost in productivity. Basically you can make it so every time you save your code, it gets injected into the page without requiring you to refresh the page. This is really handy if you need to maintain the state of the page while you are editing your code.

* Include any type of file into your javascript - Reduces need for other build tools, and allows you to programmatically modify/use those files.

* Advanced stuff - Webpack is really modular and extensible. You can do a lot of crazy stuff with it. However, that stuff is beyond the scope of this *beginner* tutorial.

## Getting Started

### Installation

To use most of the features of webpack you only need a global installation:

    npm install -g webpack

However some features of webpack, such as optimization plugins, require you to have it installed locally. In which case you'll need to:

    npm install --save-dev webpack

### The Basics

#### The Command Line

To run webpack:

    webpack

If you want webpack to build every time you change a file:

    webpack --watch

If you want to use a config file with webpack with a custom name:

    webpack --config myconfig.js

#### Bundling

[Example 1](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example1)

Webpack is formally referred to as a module bundler. The way that it works is that you specify a single file as your entry point. Then every single file that is included in your entry point through `require` is concatenated into a single file called a bundle.

For example lets say you have the files `index.js` (your entry point), `file1.js`, `file2.js`, and `file3.js` all in the same directory.

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

Then, when you run webpack, you'll get a bundle with the contents of `index.js`, `file1.js`, and `file2.js` because, through `require`, `file1.js` and `file2.js` are part of the dependency tree that starts at the entrypoint `index.js`. As you've probably noticed `file3.js` will not be part of the bundle because it is neither an entrypoint or a part of the dependency tree:

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

// file3.js
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

#### Loaders

The really cool, and interesting thing about webpack is that you can `require` more than just javascript files. There is this concept in webpack called a loader. Using these loaders, you can include anything from `.css` and `.html` to `.png` files.

```javascript
var myhtml = require('./myhtmlfile.html')
var mycss  = require('./mycssfile.css')
var mypng  = require('./mypng.png')
```

The image loader can be used to modify/minify image files. The HTML loader can be used to pull in and programmatically modify/process/use your HTML files. The CSS loader can be used to include css in your web pages.

These are just a few examples of the many loaders that webpack provides.


#### Plugins

Plugins, like the name suggests, add extra functionality to webpack. One frequently used plugin is the `UglifyJsPlugin`, which lets you minify your javascript code. We'll cover how to use this later.

## Your Config File

Webpack does not work out of the box so you need to tailor it to your needs. In order to do this you need to create a file called

    webpack.config.js

as this is the name that webpack recognizes as default. If you choose to use a different name you would have to use the `--config` flag to specify the file's name.

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
  entry: ['./src/index'], // .js after index is optional
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

Going over the new properties one by one:

* [entry](https://webpack.github.io/docs/configuration.html#entry) - The entrypoint of your bundle, which we discussed in the [bundling](#bundling) section. It's an array because webpack allows multiple entry points if you want to generate multiple bundles.

* [output](https://webpack.github.io/docs/configuration.html#output) - Dictates the form of the output by webpack
  * [path](https://webpack.github.io/docs/configuration.html#output-path) - where to put the bundle
  * [filename](https://webpack.github.io/docs/configuration.html#output-filename) - what to call the bundle

When you run `webpack`, this will create a file called `bundle.js` in the dist folder.

### Introducing Plugins

[Example 3](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example3)

Imagine that you've used webpack to bundle all your files together, and now you've realized that all together it's 900KB. This is a problem that can be ameliorated by minifying your bundle. To do this you need to use a plugin I mentioned earlier called the [UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin).

Moreover you will need to have webpack installed locally to actually be able to use the plugin.

    npm install --save-dev webpack

Now you can require webpack and minify your code.

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
    })
  ]
}
```
Going over the new properties one by one:

* plugins - An array that holds your plugins.
  * [webpack.optimize.UglifyJsPlugin](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) - Minify your code, and suppress warning messages.

When you run `webpack`, this will create a file called `bundle.js` in the dist folder; however, now that you have the `UglifyJsPlugin` this could reduce your imaginary 900KB file to 200KB by through processes such as removing all the whitespace.

You can also add the [OrderOccurencePlugin](https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin)

> Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids. This make ids predictable, reduces to total file size and is recommended.

To be honest I'm not sure how the underlying mechanisms work, but it says recommended so why not just throw it in your config.

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
  ]
}
```

## A More Complete Example

So now we have written a config that allows us to minify and bundle our javascript. This bundle could be copied and pasted into another project's directory, and thrown into a `<script>` tag there.

Alternatively, because webpack can do more than just work with javascript, you can avoid the copy-pasting and manage your entire project with webpack.

In the following section, we are going to create a very simple website using webpack. If you wish to follow along with the example, create a directory with the structure

```
MyDirectory
|- dist
|- src
   |- index.js
   |- website.html
   |- styles.css
|- package.json
|- webpack.config.js
```

#### Contents

1. [Introducing Loaders](#introducing-loaders) - We will add loaders, which allow us to add CSS to our bundle.
2. [Adding More Plugins](#adding-more-plugins) - We will add a plugin that'll help us create/use an HTML file.
3. [The Development Server](#the-development-server) - We'll split our webpack config into separate `development` and `production` files. Then use the webpack-dev-server to view our website and enable HMR.
4. [Start Coding](#start-coding) - We will actually write some javascript.

#### Introducing Loaders

[Example 4](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example4)

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

#### Adding More Plugins

[Example 5](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example5)

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
  <h1 id="header">Great Website</h1>
  <script src="bundle.js"></script>
</body>
</html>
```

and while we're at it let's add some basic styling in `styles.css`

```css
h1 {
  color: rgb(114, 191, 190);
}
```

#### The Development Server

[Example 6](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example5)

Now we want to actually see our website in the browser, which requires a web server to serve our code. Conveniently, webpack comes with the `webpack-dev-server`, which you can install using

    npm install --save-dev webpack-dev-server

This is a good point to split up our webpack config into one meant for development and one meant for production. Since we're keeping it simple in this tutorial, it won't be a huge difference, but it's an introduction to the extreme configurability of webpack. We'll call them `webpack.config.dev.js` and `webpack.config.prod.js`.

```javascript
// webpack.config.dev.js
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-eval-source-mao',
  entry: ['./src/index'], // .js after index is optional
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
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

and

```javascript
// webpack.config.prod.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
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

The dev config omits the optimizations as they are unnecessary overhead when you are constantly rebuilding. I've also added a brand new property to both the dev config and the prod config:

* [devtool](https://webpack.github.io/docs/configuration.html#devtool) - This is a debugging aid. Basically, when you get a error, it'll help you see where you made the mistake something like the chrome developer console. As for the difference between `source-map` and `cheap-eval-source-map` it's a little hard to glean from the docs. What I can say definitively is that `source-map` is meant for production and has a lot of overhead, and that `cheap-eval-source-map` has less overhead and is meant for developing only.

To make our lives a little easier we are now going to use `package.json` as a simple task runner so that we don't need to keep typing out every command.

```json
// package.json
{

}
```

#### Start Coding

The reason most people seem to be flustered by webpack is the fact that they need to go through all of this to get to the point where they finally write javascript. Hopefully I've reduced the "fatigue" :wink: left to reach this point.

```javascript
// index.js
require('./styles.css')

// TODO other stuff
```

## Conclusion

I hope this is helpful. If you have any questions, feel free to leave them as issues.

Webpack first and foremost is a module bundler. It's an extremely modular and useful tool, which you can use without ES6, and without React.

Now given that

* Part 2 will address using Webpack to transpile ES6 with Babel
* Part 3 will address using Webpack with React

Since those are the most common use cases.
