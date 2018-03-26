import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import '@progress/kendo-theme-bootstrap/dist/all.css';
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import './style.css'

import storage from "./storage"
import ActionList from "./reducer/actionList"

// import FormSelector from './component/nav-component/FormSelector';
import Navigator from './component/nav-component/Navigator';
import registerServiceWorker from './registerServiceWorker';

import descriptions from "./example";

storage.dispatch({type:ActionList.SET_DESCRIPTIONS, payload: descriptions})
// ReactDOM.render(<Provider store={storage}>
//     <div className="container-fluid">
//       <FormSelector config={defaultConfig()} descriptions={descriptionGet()} />
//     </div>
//   </Provider>, document.getElementById('root'));
// registerServiceWorker();

ReactDOM.render(<Provider store={storage}>
  <div className="container-fluid">
    <Navigator />
  </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();
