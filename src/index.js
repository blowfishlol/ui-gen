import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"

import '@progress/kendo-theme-bootstrap/dist/all.css'
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import './style.css'

import storage from "./storage"

import { Ripple } from '@progress/kendo-react-ripple'
import Navigator from './component/nav-component/Navigator'
import ConfirmationDialog from './component/ConfirmationDialog'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(<Provider store={storage}>
  <div className="container-fluid">
    <Ripple>
      <Navigator key="1"/>
      <ConfirmationDialog key="2" />
    </Ripple>
  </div>
</Provider>, document.getElementById('root'))
registerServiceWorker()
