import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import "@progress/kendo-theme-bootstrap/dist/all.css"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./style/style.css"

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

    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <button onClick={() => {alert("HOLD!")}}>HANG</button>
  </div>
</Provider>, document.getElementById("root"))
registerServiceWorker()