# Example 2 - A minimal example

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

module.exports = {
  entry: ['./src/index'], // .js after index is optional
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}
```

Going over the properties one by one:

* [entry](https://webpack.github.io/docs/configuration.html#entry) - The entrypoint of your bundle, which we discussed in the [bundling](#bundling) section. It's an array because webpack allows multiple entry points if you want to generate multiple bundles.

* [output](https://webpack.github.io/docs/configuration.html#output) - Dictates the form of the output by webpack
  * [path](https://webpack.github.io/docs/configuration.html#output-path) - where to put the bundle
  * [filename](https://webpack.github.io/docs/configuration.html#output-filename) - what to call the bundle
