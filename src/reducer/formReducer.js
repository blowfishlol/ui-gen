import ActionList from "./actionList"

function isInteger(arg) {
  return !isNaN(parseInt(arg, 10)) && parseInt(arg, 10).toString() === arg
}

function defaultForPath(arg) {
  return isInteger(arg) ? [] : {}
}

/**
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
    if(isInteger(path[0])) {
      ptr[parseInt(path[0], 10)] = set(path.slice(1), value, ptr[path[0]] ? ptr[path[0]] : defaultForPath(path[1]))
      return ptr
    }
    return {
      ...ptr,
      [path[0]]: set(path.slice(1), value, ptr[path[0]] ? ptr[path[0]] : defaultForPath(path[1]))
    }
  }
}

function pop(path, ptr) {
  if(path.length === 1) {
    delete ptr[path[0]]
    return ptr
  } else {
    if(ptr.hasOwnProperty(path[0])) {
      return {
        ...ptr,
        [path[0]]: pop(path.slice(1), ptr[path[0]])
      }
    } else {
      return ptr
    }
  }
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function lastElement(obj) {
  return obj[obj.length - 1]
}

const defaultState = {
  data: [],
  app_state: [],
  notifier: 1, // --> used to force re rendering on form components (ex: on data change)
  description: [],
  config: {},
  ext_file_ids: [],
  removed_ext_file_ids: []
}

export default function reducer(state = defaultState, action) {

  if(action.type === ActionList.SET_DATA) {
    /**
     * action SET is used to set any kind of data from the view
     * param required in payload:
     *  path: where the data will be stored in data hierachy, ex: user.name.firstname
     *  value: value that desired to be stored in designated path
     */
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === lastElement(state.app_state) ?
            set(action.payload.path.split("."), action.payload.value, clone(d)) :
            d
       }),
      notifier: (state.notifier + 1) % 10
    }
  } else if(action.type === ActionList.SET_DATA_BY_INDEX) {
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === action.payload.index ?
            set(action.payload.path.split("."), action.payload.value, clone(d)) :
            d
       }),
      notifier: (state.notifier + 1) % 10
    }
  } else if(action.type === ActionList.POP_DATA) {
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === lastElement(state.app_state) ?
            pop(action.payload.path.split("."), clone(d)) :
            d
       }),
       notifier: (state.notifier + 1) % 10
    }
  } else if(action.type === ActionList.SET_CONFIG) {
    return {
      ...state,
      config: action.payload
    }
  } else if(action.type === ActionList.SET_DESCRIPTION) {
    return {
      ...state,
      description: action.payload,
      data: Array(action.payload.length).fill({}),
      app_state: state.app_state.concat(0),
      notifier: (state.notifier + 1) % 10
    }
  } else if(action.type === ActionList.PUSH_APP_STATE) {
    /**
     * param: index
     */
    return {
      ...state,
      app_state: state.app_state.concat(action.payload.index)
    }
  } else if(action.type === ActionList.POP_APP_STATE) {
    /**
     * param: index
     */
    return {
      ...state,
      app_state: state.app_state.slice(0, state.app_state.length - action.payload.index)
    }
  } else if(action.type === ActionList.CLEAR_STATE) {
    return {
      ...state,
      app_state: []
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
  } else if(action.type === ActionList.ADD_EXT_FILE_REF) {
    return {
      ...state,
      ext_file_ids: state.ext_file_ids.concat(action.payload)
    }
  } else if(action.type === ActionList.REMOVE_EXT_FILE_REF) {
    return {
      ...state,
      ext_file_ids: state.ext_file_ids.filter(saved_id => {
        return saved_id !== action.payload
      })
    }
  } else if(action.type === ActionList.ADD_REMOVED_EXT_FILE_REF) {
    return {
      ...state,
      removed_ext_file_ids: state.removed_ext_file_ids.concat(action.payload)
    }
  } else if(action.type === ActionList.CLEAR_DATA) {
    return {
      ...state,
      data: [],
      ext_file_ids: [],
      removed_ext_file_ids: []
    }
  } else if(action.type === ActionList.ON_CONFIG_SAVED) {
    return defaultState
  } else if(action.type === ActionList.ON_BACK_PRESSED_CONFIG) {
    return defaultState
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
