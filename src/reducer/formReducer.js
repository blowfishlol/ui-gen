import ActionList from "./actionList"
import ComponentType from "../component/ComponentType"
import { clone, lastElementOf } from "../util/toolbox"

function isInteger(arg) {
  return !isNaN(parseInt(arg, 10)) && parseInt(arg, 10).toString() === arg
}

function defaultForPath(arg) {
  return isInteger(arg) ? [] : {}
}

function isNullValue(value, type) {
  switch (type) {
    case ComponentType.TEXT:      return value === ""
    case ComponentType.DATE:      return value === null
    case ComponentType.IMAGE:     return value.length === 0
    case ComponentType.CHECKBOX:  return false
    case ComponentType.TIME:      return value === null
    case ComponentType.TOGGLE:    return false
    case ComponentType.DROPDOWN:  return value === ""
    case ComponentType.NUMBER:    return value === ""
    case ComponentType.COLOR:     return false
    case ComponentType.ARRAY:     return value.length === 0
    case ComponentType.MAP:       return value.length === 0
    default:                      return false
  }
}

/**
 * function set
 * set the given value to this reducer state.data
 * in the given route by path
 * by returning new instance of state.data to overwrite the old one
 */
export function set(path, value, ptr, nullable) {
  if(path.length === 1) {
    if(nullable) {
      if(nullable.isNullable && isNullValue(value, nullable.type)) {
        ptr[path[0]] = null
        return ptr
      }
    }
    ptr[path[0]] = value
    return ptr
  } else {
    if(isInteger(path[0])) {
      ptr[parseInt(path[0], 10)] = set(path.slice(1), value, ptr[path[0]] ? ptr[path[0]] : defaultForPath(path[1]), nullable)
      return ptr
    }
    return {
      ...ptr,
      [path[0]]: set(path.slice(1), value, ptr[path[0]] ? ptr[path[0]] : defaultForPath(path[1]), nullable)
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

const defaultState = {
  data: {},
  paths: [],
  ext_file_ids: [],
  removed_ext_file_ids: [],
  notifier: 1, // --> used to force re rendering on form components (ex: on data change)
}

export default function reducer(state = defaultState, action) {

  if(action.type === ActionList.SET_DATA) {
    return {
      ...state,
      data: set(action.payload.path.split("."), action.payload.value, clone(state.data), action.payload.nullable),
      notifier: (state.notifier + 1) % 10,
      isAllowedToJumpFoward: false
    }
  } else if(action.type === ActionList.SET_DATA_BY_INDEX) {
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === action.payload.index ?
            set(action.payload.path.split("."), action.payload.value, clone(d)) :
            d
       })
    }
  } else if(action.type === ActionList.POP_DATA) {
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === lastElementOf(state.app_state) ?
            pop(action.payload.path.split("."), clone(d)) :
            d
       }),
       notifier: (state.notifier + 1) % 10
    }
  } else if(action.type === ActionList.POP_DATA_BY_INDEX) {
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === action.payload.index ? {} : d
      })
    }
  } else if(action.type === ActionList.ADD_PATH) {
    return {
      ...state,
      paths: state.paths.find(path => path === action.payload) ? state.paths : state.paths.concat(action.payload)
    }
  } else if(action.type === ActionList.REMOVE_PATH) {
    return {
      ...state,
      paths: state.paths.filter(path => path !== action.payload)
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
      paths: [],
      ext_file_ids: [],
      removed_ext_file_ids: []
    }
  } else if(action.type === ActionList.ON_CONFIG_SAVED || action.type === ActionList.ON_BACK_PRESSED_CONFIG ||
            action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
