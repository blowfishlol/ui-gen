import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import "@progress/kendo-theme-bootstrap/dist/all.css"
import "./style/style.css"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { Ripple } from "@progress/kendo-react-ripple"
import Navigator from "./component/nav-component/Navigator"
import Dialog from "./component/Dialog"
import Window from "./component/Window"

import storage from "./storage"

import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<Provider store={storage}>
  <div className="container-fluid">
    <Ripple>
      <Navigator />
      <Dialog />
      <Window />
    </Ripple>
  </div>
</Provider>, document.getElementById("root"))
registerServiceWorker()

var size = 21
var buffer = ""

for(let i = 0; i < size; i++) {
  for(let j = 0; j < size; j++) {
    if(isPrintCond(i, j, 0, size - 1)) {
      buffer += "#"
    } else {
      buffer += " "
    }
  }
  buffer += "\n"
}
console.log(buffer)

function isPrintCond(i, j, min, max) {
  // return i === j || i === 0 || j === 0 || i === max || j === max || i+j === max
  // return Math.pow(i - max/2, 2) + Math.pow(j - max/2, 2) < Math.pow(max/2, 2)
  // return Math.floor(max/2) >= Math.abs(Math.floor(max/2) - i) + Math.abs(Math.floor(max/2) - j)
  return min > max || !(min <= i && i <= max) || !(min <= j && j <= max) ? false : i === min || i === max || j === min || j === max || isPrintCond(i, j, min+2, max-2)
  // return (min > max || !(min <= i && i <= max) || !(min <= j && j <= max)) && !(i === min && j === min-1) ? false : ((i === min || i === max || j === min || j === max || (i === min && j === min-1)) && !(i === min+1 && j === min)) || isPrintCond(i, j, min+2, max-2)
}

let string = "user.name.first"
console.log(string.substring(0, string.lastIndexOf(".")))