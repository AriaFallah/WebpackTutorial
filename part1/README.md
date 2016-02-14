# Beginner Webpack Tutorial Part 1 - Introduction To Webpack :zap:

This is for the people like me who's first intro to webpack was a repository similar to:

* https://github.com/davezuko/react-redux-starter-kit
* https://github.com/webpack/react-starter

While these repositories are very well put together, they aren't necessarily the best learning tools.
In my case, I got pretty confused trying to understand what was going on, and scrapped together my
understanding from a lot of scattered resources.

I hope that this tutorial can make Webpack easy to learn.

## Requirements

At the very least you are expected to know the basics of node.js and npm.

## Contributing

I will gladly accept any and all contributions/corrections. If you have any questions,
feel free to leave them as issues. If I made mistakes, please point them out. Finally, if you feel
that I left anything out, or could have explained something better make sure to leave an issue or
make a pull request.

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
  * [Start Coding](#start-coding)
* [Conclusion](#conclusion)
* [Closing Thoughts](#closing-thoughts)

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

![Official Dependency Tree](http://i.imgur.com/YU4xBPQ.png)

Webpack is formally referred to as a module bundler. If you want an indepth and accessible explanation
on modules and module bundling definitely check out these two great articles:
[here](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.jw1txw6uh)
and [here](https://medium.com/@preethikasireddy/javascript-modules-part-2-module-bundling-5020383cf306#.lfnspler2).
We're gonna keep it simple. The way that it works is that you specify a single file as your entry point.
This file will be the root of your tree. Then every time you `require` a file from another file it's
added to the tree. When you run `webpack`, all these files/modules are bundled into a single file.

Here's a simple example:

![Dependency Tree](http://i.imgur.com/dSghwwL.png)

Given this picture you could have the directory:

```
MyDirectory
|- index.js
|- UIStuff.js
|- APIStuff.js
|- styles.css
|- extraFile.js
```

and this could be the content of your files

```javascript
// index.js
require('./styles.css')
require('./UIStuff.js')
require('./APIStuff.js')

// UIStuff.js
var React = require('React')
React.createClass({
  // stuff
})

// APIStuff.js
var fetch = require('fetch') // fetch polyfill
fetch('https://google.com')
```

```css
/* styles.css */
body {
  background-color: rgb(200, 56, 97);
}
```

When you run `webpack`, you'll get a bundle with the contents of this tree, but `extraFile.js`,
which was in the same directory, will not be part of the bundle because it was never `required`.

`bundle.js` will look like:

```javascript
// contents of styles.css
// contents of UIStuff.js + React
// contents of APIStuff.js + fetch
```

The things that are bundled are only the things that you explicitly required across your files.

### Loaders

As you probably noticed, I did something strange in the above example. I `required` a css file in
a javascript file.

The really cool, and interesting thing about webpack is that you can `require` more than just
javascript files.

There is this thing in webpack called a loader. Using these loaders, you can
`require` anything from `.css` and `.html` to `.png` files.

For example in the diagram above I had

```javascript
// index.js
require('./styles.css')
```

If I include [the style-loader](https://github.com/webpack/style-loader) and the [the css-loader](https://github.com/webpack/css-loader) in my webpack config, this is not only perfectly
valid, but also will actually apply the CSS to my page.

This is just a single example of the many loaders you can use with webpack.

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
imaginary 900KB file to 200KB through processes such as removing all the whitespace.

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
4. [Start Coding](#start-coding) - We will actually write some javascript.

#### Introducing Loaders

[Example 4](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example4)

Earlier in the tutorial I mentioned [loaders](#loaders). These will help us require non-js files in
our code. In this case, we will need the style loader and the css loader. First we need to install the loaders:

    npm install --save-dev style-loader css-loader

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
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  }
}
```

Going over the new properties one by one:

* [module](http://webpack.github.io/docs/configuration.html#module) - Options affecting your files
  * [loaders](http://webpack.github.io/docs/configuration.html#module-loaders) - An array of loaders that we specify for our application
    * test - A regular expression to match the loader with a file
    * loaders - Which loaders to use for files that match the test

This time when you run `webpack`, if we `require` a file that ends in `.css`, then we will apply
the `style` and `css` loaders to it, which adds the CSS to the bundle.

If we didn't have the loaders,
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

An important aspect to recognize is that there is an *order* to which these loaders need to be specified. In the above example, the `sass` loader is first applied to your `.scss` files, then the `css` loader, and finally the `style` loader. As you can see, the pattern is that these loaders are applied from right to left.

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
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
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

Note that we aren't putting a `<script>` tag into our HTML for `bundle.js`. The plugin will actually
automatically do that for you. If you do put in the script tag, you'll end up loading your same code twice.

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

#### The Development Server

[Example 6](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example6)

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
      loaders: ['style', 'css']
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
      loaders: ['style', 'css']
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

We add the `scripts` property to the config

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
[html-reload](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/html-reload). It's useful
information that covers some more configuration options of webpack, which I recommend looking at,
but I left it separate because I feel like it lengthens the tutorial for too trivial of a reason.

#### Start Coding

[Example 7](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example7)

The reason most people seem to be flustered by webpack is the fact that they need to go through all
of this to get to the point where they finally write javascript; however, now we have arrived at the
climax of our tutorial.

Just in case you haven't already: do `npm run dev`, and navigate to `http://localhost:8080`. Setting
up that dev server with hot reloading wasn't for show. Every single time you save while editing
any part of your project, the browser will reload to show your changes.

We are also going to require a npm package just to demonstrate how you can use them in your
frontend now.

    npm install --save pleasejs

PleaseJS is a random color generator, which we're going to hook up to our button to change the color
of our div.

```javascript
// index.js

// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // The page is now styled
var Please = require('pleasejs')
var div = document.getElementById('color')
var button = document.getElementById('button')

function changeColor() {
  div.style.backgroundColor = Please.make_color()
}

button.addEventListener('click', changeColor)
```

Interestingly, [in order for Hot Module Replacement to work](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html#what-is-needed-to-use-it)
You need to include the code:

```javascript
if (module.hot) {
  module.hot.accept()
}
```

in a module or a parent of that module.

and we're done!

**Side Note:** You might have noticed a delay before your css was applied, or maybe you hate the
fact that your css is in your javascript file. I've put aside an example,
[css-extract](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/css-extract),
that describes how to put your CSS in a different file.

## Conclusion

I hope this is helpful.

Webpack first and foremost is a module bundler. It's an extremely modular and useful tool,
which, in fact, is not chained to ES6 and React.

Now given that

* Part 2 will address using Webpack to transpile ES6 to ES5 with Babel
* Part 3 will address using Webpack with React + Babel

Since those are the most common use cases.

## Closing Thoughts

Congratulations! You made a button that changes the color of a div! Isn't webpack great?

Yes it is; however, if all you're doing is making a button that changes the color of a div, it's
probably not worth it writing a config like this. If you do, you might get...fatigued :anguished:
