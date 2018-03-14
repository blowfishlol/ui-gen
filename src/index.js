import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { compose } from "recompose"

import '@progress/kendo-theme-material/dist/all.css';

import storage from "./storage"
import ActionList from "./reducer/actionList"
import App from './ui-component/App';
import config from "./example";
import registerServiceWorker from './registerServiceWorker';
import "./index.css";
//manipulasi di dalem functionnya, gak return apa2
//converts a path and its value to fill an object.
function pathToObj(path, value, object) {
  var parts = path.split(".");
  var part;
  while(part = parts.shift()){
    if( typeof object[part] != "object" ) {
      if(!parts[0]){
        object[part]=value;
      } else {
        object[part]={};
      }
    }
    object = object[part];
  }
}
//generates json by looping on the path and value array
function generateJSON(event) {
  const stateNow = storage.getState();
  var thing = {};
  for( var key in stateNow ) {
    console.log(key, stateNow[key]);
    pathToObj(key, stateNow[key],thing);
  }
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


storage.dispatch({type:ActionList.SET, payload: {
  path: "appointment.id",
  value: 10
}});
console.log("xxxx", storage.getState());
storage.dispatch({type:ActionList.SET, payload: {
  path: "appointment.time.start",
  value: "10:20"
}});
console.log("xxxx", storage.getState());
storage.dispatch({type:ActionList.SET, payload: {
  path: "patient.time.start",
  value: "10:20"
}});
console.log("xxxx", storage.getState());
storage.dispatch({type:ActionList.SET, payload: {
  path: "document",
  value: null
}});
console.log("xxxx", storage.getState());
