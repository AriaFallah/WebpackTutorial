# Example 1 - Bundling

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
