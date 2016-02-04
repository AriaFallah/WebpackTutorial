# Example 1 - Bundling

Webpack is formally referred to as a module bundler. From my understanding, the way that it works is that you specify a single file as your entry point. Then every single file that is included in your entry point through `require` is concatenated into a single file called a bundle.

For example lets say you have the files `index.js` (your entry point), `file1.js`, and `file2.js` all in the same directory.

```
MyDirectory
|- index.js
|- file1.js
|- file2.js
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
```

Then, when you run webpack, you'll get a bundle with the contents of all three files like this because `index.js` required `file1.js`, which also required `file2.js`:

So the process would look like this:

```javascript
// index.js
require('./file1.js')
console.log('Third!')

// file1.js
/** require('./file2.js') is replaced by the contents of file2 **/
console.log('First!')
console.log('Second!')
```

---


```javascript
// index.js
/** require('./file1.js') is replaced by the contents of file1 **/
console.log('First!')
console.log('Second!')
console.log('Third!')
```

---

The things that are bundled are only the things that you explicitly required across your files.
