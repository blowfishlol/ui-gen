import ActionList from "./actionList"
import ComponentType from "../component/ComponentType"

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

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function lastElement(obj) {
  return obj[obj.length - 1]
}

const defaultState = {
  data: [],
  app_state: [],
  description: [],
  config: {},
  ext_file_ids: [],
  removed_ext_file_ids: [],
  labels: [],
  element_refs: [],
  notifier: 1, // --> used to force re rendering on form components (ex: on data change)
  isNewForm: true,
  isAllowedToJumpFoward: false
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
            set(action.payload.path.split("."), action.payload.value, clone(d), action.payload.nullable) :
            d
       }),
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
      app_state: state.app_state.concat(action.payload.index),
      labels: [],
      element_refs: [],
      isAllowedToJumpFoward: false
    }
  } else if(action.type === ActionList.POP_APP_STATE) {
    /**
     * param: index
     */
    return {
      ...state,
      app_state: state.app_state.slice(0, state.app_state.length - action.payload.index),
      labels: [],
      element_refs: []
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
  } else if(action.type === ActionList.SET_NEW_FORM_FLAG) {
    return {
      ...state,
      isNewForm: action.payload
    }
  } else if(action.type === ActionList.ALLOW_JUMP) {
    return {
      ...state,
      isAllowedToJumpFoward: true
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
  } else if(action.type === ActionList.ADD_ELELEMENT_REF) {
    return {
      ...state,
      labels: state.labels.concat(action.payload.props.label),
      element_refs: state.element_refs.concat(action.payload)
    }
  } else if(action.type === ActionList.CLEAR_ELEMENT_REF) {
    let index = state.element_refs.findIndex(element => element.props.path === action.payload)
    return {
      ...state,
      labels: state.labels.slice(0, index).concat(state.labels.slice(index + 1, state.labels.length)),
      element_refs: state.element_refs.slice(0, index).concat(state.element_refs.slice(index + 1, state.element_refs.length))
    }
  } else if(action.type === ActionList.CLEAR_DATA) {
    return {
      ...state,
      data: [],
      labels: [],
      element_refs: [],
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
