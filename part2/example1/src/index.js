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
