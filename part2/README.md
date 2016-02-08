# Beginner Webpack Tutorial Part 2 - Using Webpack with Babel

Now that we learned the basics of using webpack, we're going to learn to leverage babel 6 in order
to write ES6, the new specification of javascript.

If you've ever written ES6, it's hard to want to go back to writing ES5. If you haven't had the
chance to write ES6 yet, a big reason is probably because setting up a dev environment, and *understanding*
all the configuration options is a huge hassle that can be discouraging.

I hope that this tutorial can make that process of getting started much easier.

## Requirements

1. If you haven't already please look at [part 1][2]
2. For an overview of ES6, [this](https://github.com/DrkSephy/es6-cheatsheet) is a good resource.

## Contributing

I will gladly accept any and all contributions/corrections. If you have any questions,
feel free to leave them as issues. If I made mistakes, please point them out. Finally, if you feel
that I left anything out or could have explained something better, make sure to leave an issue or
make a pull request.

## Table Of Contents

* [Babel](#babel)
  * [What Does Babel Do?](#what-does-babel-do)
  * [Configuring Babel](#configuring-babel)
* [Webpack](#webpack)
  * [A New Loader](#a-new-loader)
* [We are Done?](#we-are-done)
* [Extra Credit](#extra-credit)
  * [Production Environment Variables With Webpack and Babel](#production-environment-variables-with-webpack-and-babel)
  * [Adding Linting](#adding-linting)
* [Conclusion](#conclusion)


## Babel

If you want a more in-depth explanation, and finer grained control over babel then please look at
[their handbook][1]. I'm paraphrasing the basics here.

### What Does Babel Do?

Simply stated, babel lets you take advantage of a much more fully featured specification of
javascript, which isn't supported by most browsers and environments, and turns
it into ES5, which has much more widespread support.

With babel, this code, which would be rejected by any browser

```javascript
const square = n => n * n;
```

is transformed into something like

```javascript
var square = function square(n) {
  return n * n;
};
```

which you could run anywhere that supports javascript.

### Configuring Babel

Another tool, another config file. This time around we'll have a file called

    .babelrc

Thankfully, the `.babelrc` file will only be a single line long.

```javascript
{
  "presets": ["es2015", "stage-2"]
}
```

The only option you need to specify is `presets`, which are described in the excerpt below:

> JavaScript also has some proposals that are making their way into the standard
through the TC39's (the technical committee behind the ECMAScript standard)
process.

> This process is broken through a 5 stage (0-4) process. As proposals gain more
traction and are more likely to be accepted into the standard they proceed
through the various stages, finally being accepted into the standard at stage 4.

> Note that there is no stage-4 preset as it is simply the `es2015` preset
> above.

To sum it up, presets are bundles of plugins that add features to the code you're writing. `es2015`
adds features that definitely are going to be in the official release of ES6, and the presets
that are stages 0-3 are proposals for future specifications of Javascript that are still being drafted.
The lower you go, the higher the risk that the features you're using are going to have support dropped.

From my experience, the lowest I've needed to go is `stage-2` to be able to use something called [object spread](https://github.com/sebmarkbage/ecmascript-rest-spread). You can see the rest of the proposals
[here](https://github.com/tc39/ecma262), and decide how low you want to go.

Anyways to use these presets, we need to install them

    npm install --save-dev babel-preset-es2015 babel-preset-stage-2

and that's actually all you need to do.

## Webpack

We're going to use the same exact config as in [example 7 from part 1](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/example7), but add the
functionality needed to use ES6.

### A New Loader

We need to install a new loader called `babel-loader` along with it's dependency `babel-core`.

    npm install --save-dev babel-loader babel-core

and add that to both our dev and prod configs:

```javascript
// To save space I'll just show the "loaders" part

// Both webpack.config.dev.js and webpack.config.prod.js
module: {
  loaders: [{
    test: /\.css$/,
    loaders: ['style', 'css']
  }, {
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, 'src')
  }]
}
```

An **extremely important** thing to note is the usage of the `include` property. When we run
`webpack`, because we have set our `test` to `/.js$/`, webpack will try to run the babel loader on
every single `js` file in your dependency tree.

Can you spot the problem with this? What if I `require('bluebird')`, or any other large `npm` package?
It'll try to run **node_modules** through your `babel-loader`, which will extend your build process
by an extreme amount.

`include` prevents this by specifying that this loader only applies to `.js` files in your `src` directory.

## We are Done?

Honestly I thought this tutorial would be longer, but it seems I forgot that adding babel is
actually pretty trivial. We can now update our earlier code in `index.js` to use the ES6 syntax:

```javascript
// index.js

// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // The page is now styled
const Please = require('pleasejs')
const div = document.getElementById('color')
const button = document.getElementById('button')
const changeColor = () => div.style.backgroundColor = Please.make_color()

button.addEventListener('click', changeColor)
```

## Extra Credit

Since that actually didn't take so long I'm going to cover two more topics that are pretty important
and useful.

### Production Environment Variables With Webpack and Babel

#### Webpack

If we don't want to execute a portion of code in production we can use the handy dandy
[DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin).

The plugin lets us create a global constant for our entire bundle, which we could name anything,
such as `DONT_USE_IN_PRODUCTION: true`, but more practically, a popular choice that looks a bit more
familiar is `process.env.NODE_ENV: JSON.stringify('production')`. Why `JSON.stringify`? Because
according to the docs:

> If the value is a string it will be used as a code fragment.

This means a value of `'production'` would just be an error. If you think `JSON.stringify`
is weird, a valid alternative is `'"production"'`.

Your plugins array should now look like

```javascript
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
]
```

Now, if we don't want to execute some code in production, we can put it in an if statement:

```javascript
if (process.env.NODE_ENV !== 'production') {
  // not for production
}
```

I touched upon a real world usage of this in an isolated section of part 1 [here](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/html-reload).

#### Babel

Defining our production variable as `process.env.NODE_ENV` has another added benefit.

[From the handbook][1]

> The current environment will use process.env.BABEL_ENV. When BABEL_ENV is not available,
it will fallback to NODE_ENV, and if that is not available it will default to "development".

This means that the babel environment will match our webpack environment.

We can take advantage of this, tweaking our `.babelrc` to have development only config by adding `env`:

```javascript
{
  "presets": ["es2015", "stage-2"],
  "env": {
    // only happens if NODE_ENV is undefined or set to 'development'
    "development": {
      // ignored when NODE_ENV is production!
  }
}
```

We'll be using this in part 3 with react when we introduce the
[React Transform HMR](https://github.com/gaearon/react-transform-hmr)

### Adding Linting

If you've looked at any project seeds/starters for Webpack/React, you've probably seen a file called
`.eslintrc`. If you aren't using an IDE, but instead are using a text editor like Atom, Sublime,
Emacs, Vim, etc., eslint provides syntax and style checks, pointing out your mistakes. Do take note
that if you want it integrated into your editor, you need to install a package. For example, I use
[linter-eslint](https://github.com/AtomLinter/linter-eslint) for Atom.

To reduce the amount of our config we write manually, we're going to take advantage of the fact
that eslint lets you inherit from other people's configs. I always like to use a config based upon
[airbnb's style guide](https://github.com/airbnb/javascript).

To get started, we need to install eslint as well as airbnb's config

    npm install --save-dev eslint eslint-config-airbnb

Our starting config will look like:

```javascript
// .eslintrc
{
  "extends": "airbnb/base" // 'airbnb/base' because 'airbnb' assumes usage of react
}
```

However because linting is **highly opiniated**, I like to tweak this a bit. If you want to know what
all these rules mean, or tweak them to fit your preferences look [here](http://eslint.org/docs/rules/):

```javascript
// .eslintrc
{
  "extends": "airbnb/base",
  "rules": {
    "comma-dangle": 0,
    "no-console": 0,
    "semi": [2, "never"],
    "func-names": 0,
    "space-before-function-paren": 0,
    "no-multi-spaces": 0
  }
}
```

Additionally, out of the box, eslint does not support/recognize babel syntax so we be installing
two new packages:

    npm install --save-dev babel-eslint eslint-plugin-babel

and tweaking our config once more to add [babel specific rules](https://github.com/babel/eslint-plugin-babel):

```javascript
// .eslintrc
{
  "extends": "airbnb/base",
  "parser": "babel-eslint",
  "rules": {
    "comma-dangle": 0,
    "no-console": 0,
    "semi": [2, "never"],
    "func-names": 0,
    "space-before-function-paren": 0,
    "no-multi-spaces": 0,
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 1,
    "babel/object-shorthand": 1,
    "babel/arrow-parens": 1,
    "babel/no-await-in-loop": 1
  },
  "plugins": [
    "babel"
  ]
}
```

Finally it's also a good idea to add an npm script for linting

```javascript
"scripts": {
  "build": "webpack --config webpack.config.prod.js",
  "dev": "webpack-dev-server --config webpack.config.dev.js",
  "lint": "eslint src"
}
```

which you can run with `npm run lint` just to make sure none of your code violates the rules you specified.

I've put the end result of all of this into
[example 1](https://github.com/AriaFallah/WebpackTutorial/tree/master/part2/example1) just in case
I wasn't clear on anything.

## Conclusion

So now we can easily write ES6 code, and additionally, understand the config that enables us to write it :tada:!

However, just because you can write it from scratch, it doesn't mean you have to. For your convenience, [I have made a separate repository you can clone](https://github.com/AriaFallah/minimal-babel-starter) to get started,
which is minimal and based on this tutorial series.

Looking towards the future:

* Part 3 will address adding React into the picture
* Part 4 will cover more advanced webpack features

Thank you for reading!

[1]: https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md
[2]: https://github.com/AriaFallah/WebpackTutorial/tree/master/part1
