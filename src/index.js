import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import '@progress/kendo-theme-material/dist/all.css';
import { compose } from "recompose"
import ActionList from "./reducer/actionList"
import registerServiceWorker from './registerServiceWorker';
import storage from "./storage"
import './index.css';
import App from './ui-component/App';
import config from "./example";


// console.log(config);
//
// const testString = "appointment.patient.gender";
// const testValue = "male";
// var outputObject = {};
//
// pathToObj(testString, testValue, outputObject);
// pathToObj("appointment.patient.age", 25, outputObject);
//
// console.log(outputObject);
console.log(config);

//bingung kalo di loop harus gimana, cara gabunginnya bingung
function mapValueToPath(path, value) {
  var p = path.split(".");
  if(p.length == 1) {
    return {
      [p[0]]: value
    }
  }
  return {
    [p[0]]: mapValueToPath(path.slice(path.indexOf(".") + 1, path.length), value)
  }
}

//manipulasi di dalem functionnya, gak return apa2
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
function generateJSON(event) {

  const stateNow = storage.getState();
  var thing = {};
  for( var key in stateNow ) {
    console.log(key, stateNow[key]);
    pathToObj(key, stateNow[key],thing);
  }

  console.log(thing);

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
