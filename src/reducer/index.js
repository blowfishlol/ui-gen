import ActionList from "./actionList"
// import storage from "../storage"

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

function lastElement(obj) {
  return obj[obj.length - 1]
}

export default function reducer(state={
  data: [],
  app_state: [],
  notifier: false
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
      data: state.data.map((d, index) => {
        return index === lastElement(state.app_state) ?
            set(action.payload.path.split("."), action.payload.value, clone(state.data[lastElement(state.app_state)])) :
            d
       }),
      notifier: !state.notifier
    }
  } else if(action.type === ActionList.SET_PAGE) {
    /**
     * param: page, put page directy inside payload
     */
    return {
      ...state,
      page: action.payload,
      data: Array(action.payload.length).fill({})
    }
  } else if(action.type === ActionList.PUSH_APP_STATE) {
    /**
     * param: index
     */
    return {
      ...state,
      app_state: state.app_state.concat(action.payload.index)
    }
  } else if(action.type === ActionList.POP_DATA_BY_INDEX) {
    /**
     * param: index
     * CHANGE!
     * now instead used to rewind, use to remove value of a certain data index
     */
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === action.payload.index ? {} : d
      })
    }
  } else {
    return state;
  }
}
