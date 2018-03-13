import ActionList from "./actionList"

function map(path) {
  return path.split(".");
}

function s(path) {
  return path.slice(path.indexOf(".") + 1, path.length)
}

// function set(path, value, storage) {
//   if(typeof(storage[path]) == "array") {
//     return storage;
//   } else {
//     return {
//       ...storage,
//       [path]: value
//     }
//   }
// }

function f(path, value, storage) {
  if(map(path).length == 1) {
    storage[path] = value;
  } else {
    f(s(path), value, storage[map(path)[0]])
  }
}

// function mapValueToPath(path, value) {
//   var p = path.split(".");
//   if(p.length == 1) {
//     return {
//       [p[0]]: value
//     }
//   }
//   return {
//     [p[0]]: mapValueToPath(path.slice(path.indexOf(".") + 1, path.length), value)
//   }
// }
//
// console.log(mapValueToPath("root.child.granchild", 10));

export default function reducer(state={}, action) {

    if(action.type === ActionList.SET) {
      return {
          ...state,
          [action.payload.path] : action.payload.value
      }
      // f(action.payload.path, action.payload.value, state)
    } else if(action.type === ActionList.SET_CONFIG) {
        return {
            ...state,
            config : action.payload
        }
    } else {
        return state;
    }
}
