import './toasted.css'

const Toasted = (children, className = 'info', timeout = 5000) => {
  let duration = timeout/1000
  let elementExists = document.getElementById('toasted')

  let ul = document.createElement('ul')
  ul.id = 'toasted'

  let node = document.createElement('li')
  node.className = `toasted ${className}`
  node.style.animation = `showToaster ${duration}s`

  if(elementExists) {
    elementExists.appendChild(node)
    ReactDOM.render(children, node)
  } else {
    document.body.appendChild(ul)
    ul.appendChild(node)
    ReactDOM.render(children, node)
  }

  setTimeout(() => {
    document.getElementById('toasted').removeChild(node)
  }, timeout - 50)
}

export default Toasty
