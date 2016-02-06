var Please = require('pleasejs')
var div = document.getElementById('color')
var button = document.getElementById('button')

function changeColor() {
  div.style.backgroundColor = Please.make_color()
  console.log('pls do work')
}

button.addEventListener('click', changeColor)
