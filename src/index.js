import React from 'react'
import ReactDOM from 'react-dom'

const style = document.createElement('style')

//You can customize the toast CSS here
const css = `@keyframes bottom {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  20% {
    opacity: 1;
    transform: translateY(-25px);
  }
  80% {
    opacity: 1;
    transform: translateY(-25px);
  }
  100% {
    opacity: 0;
    transform: translateY(0px);
  }
}

@keyframes top {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  20% {
    opacity: 1;
    transform: translateY(25px);
  }
  80% {
    opacity: 1;
    transform: translateY(25px);
  }
  100% {
    opacity: 0;
    transform: translateY(0px);
  }
}

.onTop--true{
  transform: rotate(180deg);
}

.onTop--true li{
  transform: rotate(-180deg);
}

.bottom {
  bottom: 0px;
}

.top {
  top: 0px;
}

.center {
  left: 25%;
  width: 50%;
}

.left{
  left: 10px;
  width: 225px;
}

.right{
  right: 50px;
  width: 225px;
}

#toasted{
  display: flex;
  text-align: center;
  position: absolute;
  z-index: 9999;
  opacity: 1;
  flex-direction: column;
  list-style: none;
}

.toasted {
  width: 100%;
  padding: 15px;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 10px;
}

.success{
  background-color: rgba(30, 156, 4, 0.84);
}

.info{
  background-color: rgba(4, 102, 156, 0.84);
}

.warning{
  background-color: rgba(238, 114, 0, 0.84);
}

.error{
  background-color: rgba(158, 40, 40, 0.84);
}`

style.type = 'text/css'
style.appendChild(document.createTextNode(css))


//Toasted Function - You can change the default values for the toast here
//classname can be info, warning, success and error OR you can create another style in the css above
//position should respect the order VERTICAL first HORIZONTAL second. IE: top left or bottom right
//timeout can be any number in milliseconds. 5000 is 5 seconds
//if true, OnTop displays new toats above the last one
const Toasted = (children, type = 'info', position = 'bottom center', timeout = 5000, onTop = false) => {

  let duration = timeout/1000
  let elementExists = document.getElementById('toasted')

  let ul = document.createElement('ul')
  ul.id = 'toasted'
  ul.className = `${position} onTop--${onTop}`

  let node = document.createElement('li')

  const Tstr = () => (
    <div
      className={`toasted ${type}`}
      style={{animation: `${position.split(' ')[0]} ${duration}s`}}
    >
      {children}
    </div>
  )

  if(elementExists) {
    elementExists.appendChild(node)
    ReactDOM.render(<Tstr /> , node)
  } else {
    document.getElementsByTagName('head')[0].appendChild(style)

    document.body.appendChild(ul)
    ul.appendChild(node)
    ReactDOM.render(<Tstr /> , node)
  }

  setTimeout(() => {
    document.getElementById('toasted').removeChild(node)
  }, timeout - 50)
}

export default Toasted
