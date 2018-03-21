import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import '@progress/kendo-theme-bootstrap/dist/all.css';
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import './style.css'

import storage from "./storage"
import ActionList from "./reducer/actionList"
import descriptionGet from "./data-accessor/descriptionGet"

import FormSelector from './component/nav-component/FormSelector';
import registerServiceWorker from './registerServiceWorker';

import descriptions from "./example";

function defaultConfig() {
  return {
    name: "New Configuration",
    version: 1,
    data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":{}}
  }
}

storage.dispatch({type:ActionList.SET_DESCRIPTIONS, payload: descriptions})
ReactDOM.render(<Provider store={storage}>
    <div className="container-fluid">
      <FormSelector config={defaultConfig()} descriptions={descriptionGet()} />
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

console.log([{}, {a:1}, "string"].constructor === Array)
console.log([].constructor === Array)
