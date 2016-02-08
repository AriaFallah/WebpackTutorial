import Please from 'pleasejs' // use es6 module import
require('./styles.css') // The page is now styled

// Accept hot module reloading during development
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept()
  }
}

const div = document.getElementById('color')
const button = document.getElementById('button')
const changeColor = () => div.style.backgroundColor = Please.make_color()

button.addEventListener('click', changeColor)
