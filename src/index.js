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

console.log(config);

const testString = "appointment.patient.gender";
const testValue = "male";
var outputObject = {};

pathToObj(testString, testValue, outputObject);
pathToObj("appointment.patient.age", 25, outputObject);

console.log(outputObject);

//Manipulates an object to put a new value depending on the path given.
//example: path human.gender, with value male
//will try to put human : { gender : male }
function pathToObj(path, value, object) {
  var parts = path.split(".");
  var part;
  while(part = parts.shift()){
    if( typeof object[part] != "object" ) {
      if(!parts[0]){
        console.log("MASUKKKK!!")
        object[part]=value;
      } else {
        object[part]={};
      }
    }
    object = object[part];
  }
}


storage.dispatch({type:ActionList.SET_CONFIG, payload: config});
ReactDOM.render(<Provider store={storage}>
    <div className="k-form">
      <App config={storage.getState().config} />
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
