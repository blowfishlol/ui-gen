import ActionList from "./actionList"
import storage from "../storage"

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
  data: [],
  app_state: []
}, action) {

  if(action.type === ActionList.SET) {
    /**
     * [MOTI]
     * action SET is used to set any kind of data from the view
     * param required in payload:
     *  path: where the data will be stored in data hierachy, ex: user.name.firstname
     *  value: value that desired to be stored in designated path
     */
    return {
      ...state,
      data: this.state.data.concat(set(action.payload.path.split("."), action.payload.value, clone(storage.getState().data)))
    }
  } else if(action.type === ActionList.SET_CONFIG) {
    return {
      ...state,
      config : action.payload
    }
  } else if(action.type === ActionList.PUSH_STACK) {
    return {
      ...state,
      app_state : this.state.app_state.concat({
        index: action.payload.index,
        history: this.state.data.length
      })
    }
  } else if(action.type === ActionList.POP_STACK) {
    return {
      ...state,
      app_state : this.state.app_state.concat(action.payload.index)
    }
  } else {
    return state;
  }
}
