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
  /**
   * action SET_DATA is used to set any kind of data from the view
   * data will be stored in data[i]
   * where i is the value of the last element of app_state
   * @param (in action.payload)
   * Object {
   *   string path, (where the data will be stored in data hierachy)
   *          value, (value that desired to be stored in designated path)
   *   Object nullable {
   *     boolean isNullable,
   *     string  type
   *   }
   * }
   */
  if(action.type === ActionList.SET_DATA) {
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === lastElementOf(state.app_state) ?
            set(action.payload.path.split("."), action.payload.value, clone(d), action.payload.nullable) :
            d
       }),
      notifier: (state.notifier + 1) % 10,
      isAllowedToJumpFoward: false
    }
  /**
   * action SET_DATA_BY_INDEX is used to set data to a specific index of data[]
   * @param (in action.payload)
   * Object {
   *   string path, (where the data will be stored in data hierachy)
   *          value, (value that desired to be stored in designated path)
   *   number index
   * }
   */
  } else if(action.type === ActionList.SET_DATA_BY_INDEX) {
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === action.payload.index ?
            set(action.payload.path.split("."), action.payload.value, clone(d)) :
            d
       })
    }
  /**
   * remove value contained in action.payload.path in the data[i]
   * where i is the value of the last element of app_state
   * @param (in action.payload)
   * Object {
   *   string path
   * }
   */
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
  /**
   * replace all value data[i] with an empty object
   * where i is the value of the last element of app_state
   * @param (in action.payload)
   * Object {
   *   number index
   * }
   */
  } else if(action.type === ActionList.POP_DATA_BY_INDEX) {
    return {
      ...state,
      data: state.data.map((d, index) => {
        return index === action.payload.index ? {} : d
      })
    }
  /**
   * @param (in action.payload)
   * JSON Object containing config data
   */
  } else if(action.type === ActionList.SET_CONFIG) {
    return {
      ...state,
      config: action.payload
    }
  /**
   * @param (in action.payload)
   * JSON Array containing description data
   */
  } else if(action.type === ActionList.SET_DESCRIPTION) {
    return {
      ...state,
      description: action.payload,
      data: Array(action.payload.length).fill({}),
      app_state: state.app_state.concat(0),
      notifier: (state.notifier + 1) % 10
    }
  /**
   * @param (in action.payload)
   * Object {
   *   number index
   * }
   */
  } else if(action.type === ActionList.PUSH_APP_STATE) {
    return {
      ...state,
      app_state: state.app_state.concat(action.payload.index),
      labels: [],
      element_refs: [],
      isAllowedToJumpFoward: false
    }
  /**
   * @param (in action.payload)
   * Object {
   *   number index (represent how many index will be pop out of the stack)
   * }
   */
  } else if(action.type === ActionList.POP_APP_STATE) {
    return {
      ...state,
      app_state: state.app_state.slice(0, state.app_state.length - action.payload.index),
      labels: [],
      element_refs: []
    }
  /**
   * @param (in action.payload)
   * [empty]
   */
  } else if(action.type === ActionList.CLEAR_STATE) {
    return {
      ...state,
      app_state: []
    }
  /**
   * @param (in action.payload)
   * boolean containing the flag
   */
  } else if(action.type === ActionList.SET_NEW_FORM_FLAG) {
    return {
      ...state,
      isNewForm: action.payload
    }
  /**
   * @param (in action.payload)
   * boolean containing the flag
   */
  } else if(action.type === ActionList.ALLOW_JUMP) {
    return {
      ...state,
      isAllowedToJumpFoward: true
    }
  /**
   * @param (in action.payload)
   * number containing desired file id
   */
  } else if(action.type === ActionList.ADD_EXT_FILE_REF) {
    return {
      ...state,
      ext_file_ids: state.ext_file_ids.concat(action.payload)
    }
  /**
   * @param (in action.payload)
   * number containing desired file id
   */
  } else if(action.type === ActionList.REMOVE_EXT_FILE_REF) {
    return {
      ...state,
      ext_file_ids: state.ext_file_ids.filter(saved_id => {
        return saved_id !== action.payload
      })
    }
  /**
   * @param (in action.payload)
   * number containing desired file id
   */
  } else if(action.type === ActionList.ADD_REMOVED_EXT_FILE_REF) {
    return {
      ...state,
      removed_ext_file_ids: state.removed_ext_file_ids.concat(action.payload)
    }
  /**
   * @param (in action.payload)
   * HTML ref containing reference to a rendered <Label> element
   */
  } else if(action.type === ActionList.ADD_ELELEMENT_REF) {
    return {
      ...state,
      labels: state.labels.concat(action.payload.props.label),
      element_refs: state.element_refs.concat(action.payload)
    }
  /**
   * @param (in action.payload)
   * number containing index of element_refs desired to be deleted
   */
  } else if(action.type === ActionList.REMOVE_ELEMENT_REF) {
    return {
      ...state,
      labels: state.labels.slice(0, action.payload).concat(state.labels.slice(action.payload + 1, state.labels.length)),
      element_refs: state.element_refs.slice(0, action.payload).concat(state.element_refs.slice(action.payload + 1, state.element_refs.length))
    }
  /**
   * @param (in action.payload)
   * [empty]
   * used to partially clear reducer data
   */
  } else if(action.type === ActionList.CLEAR_DATA) {
    return {
      ...state,
      data: [],
      labels: [],
      element_refs: [],
      ext_file_ids: [],
      removed_ext_file_ids: []
    }
  /**
   * @param (in action.payload)
   * [empty]
   * used to reset this reducer back to default
   */
  } else if(action.type === ActionList.ON_CONFIG_SAVED || action.type === ActionList.ON_BACK_PRESSED_CONFIG ||
            action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
