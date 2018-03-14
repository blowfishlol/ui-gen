import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import '@progress/kendo-theme-material/dist/all.css';
import "./index.css"

import storage from "./storage"
import ActionList from "./reducer/actionList"
import App from './ui-component/App';
import config from "./example";
import registerServiceWorker from './registerServiceWorker';

function generateJSON(event) {
  alert(JSON.stringify(storage.getState().data));
}

storage.dispatch({type:ActionList.SET_CONFIG, payload: config});
//storage.dispatch({type:ActionList.SET_CONFIG, payload: {name: "baba", id: "bubu"}});
console.log(storage.getState());
ReactDOM.render(<Provider store={storage}>
    <div className="k-form">
      <App config={storage.getState().config} />
      <button onClick={generateJSON}>Generate JSON</button>
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
