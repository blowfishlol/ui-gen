import ActionList from "./actionList"
import storage from "../storage"

// function pathToObj(path, value, object) {
//   var parts = path.split(".");
//   var part;
//   while(part = parts.shift()){
//     if( typeof object[part] != "object" ) {
//       if(!parts[0]){
//         object[part]=value;
//       } else {
//         object[part]={};
//       }
//     }
//     object = object[part];
//   }
// }
//
// function generateJSON(event) {
//   const stateNow = storage.getState();
//   var thing = {};
//   for( var key in stateNow ) {
//     pathToObj(key, stateNow[key],thing);
//   }
// }

/**
 * [MOTI]
 * function set
 * set the given value to this reducer state.data
 * in the given route by path
 * by returning new instance of state.data to overwrite the old one
 */
function set(path, value, ptr) {
  if(path.length === 1) {
    ptr[path[0]] = value
    return ptr
  } else {
    return {
      ...ptr,
      [path[0]]: set(path.slice(1), value, ptr[path[0]] ? ptr[path[0]] : {})
    }
  }
}

/**
 * [MOTI]
 * TODO
 * modify this clone function with a better way to clone an object
 *[msg from wibi:]
 *Ini udh bagus kok, daripada rempong dan ini performance wise optimal wkwk
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default function reducer(state={
  data: {}
}, action) {

  if(action.type === ActionList.SET) {
    return {
      ...state,
      data: set(action.payload.path.split("."), action.payload.value, clone(storage.getState().data))
    }
  } else if(action.type === ActionList.SET_CONFIG) {
      return {
        ...state,
        config : action.payload
      }
  } else {
    return state;
  }
}
