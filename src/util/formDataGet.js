import storage from "../storage"
import { isObject, lastElementOf, mergeDeep } from "./toolbox"
import { getSelectedDescription, getSelectedConfig, getSelectedTemplate } from "./activeDataGet"
import ActionList from "../reducer/actionList"
import ComponentType from "../component/ComponentType"

const COLOR_DEFAULT = {
  palette : "red",
  base: "50",
  hue1: "50",
  hue2: "50",
  hue3: "50",
  contrastDefaultColor: ""
}

/**
 * return a defined default value for given type(ComponentType)
 */
export function defaultValue(type) {
  switch(type) {
    case ComponentType.TEXT:     return ""
    case ComponentType.DATE:     return "2000-01-01"
    case ComponentType.IMAGE:    return []
    case ComponentType.CHECKBOX: return {}
    case ComponentType.TIME:     return "12:00"
    case ComponentType.TOGGLE:   return false
    case ComponentType.DROPDOWN: return ""
    case ComponentType.NUMBER:   return 0
    case ComponentType.COLOR:    return COLOR_DEFAULT
    case ComponentType.ARRAY:    return []
    case ComponentType.MAP:      return []
    default:                     return ""
  }
}

/**
 * fetch data from all form.data indexes merged together into a single object
 */
export function fetchAllData() {
  return storage.getState().form.data
}

/**
 * get the data from form.data or form.config or form.description or default value
 */
export function getNoDispatch(path, type) {
  try {
    return get(fetchAllData(), path.split("."), type)
  } catch(error) {
    try {
      return findInConfig(path, type)
    } catch(error2) {
      try {
        return findInDesc(path)
      } catch(error3) {
        return defaultValue(type)
      }
    }
  }
}

/**
 * param: string
 * return: boolean
 * check in the storage whether or not a value is stored
 * with the given path
 */
export function check(path) {
  try {
    get(fetchAllData(), path.split("."), "")
    return true
  } catch(error) {
    return false
  }
}

/**
 * param: string, ComponentType
 * return: value (type according to ComponentType param)
 * check in the storage whether or not a value is stored with the given path,
 * if not available check in form config for availability,
 * if not available check whether description set a default value for this element
 * otherwise create default value for this path
 * then return the obtained value to the caller
 */
export default function f(path, type) {
  try {
    return get(fetchAllData(), path.split("."), type)
  } catch(error) {
    return set(path, type)
  }
}

/**
 * Utility functions
 * isObject -> assert is an arg is an object
 * lastElement -> return last element of array
 * mergeDeep -> return new instance of 2 object merged together
 * validateType -> check if given value match criteria of the given type(ComponentType)
 *                 throw Error if criteria is not met
 */
function validateType(result, type) {
  if(type === ComponentType.TEXT) {
    if(typeof result !== "string") {
      throw new Error()
    }
  } else if(type === ComponentType.DATE) {
    if(typeof result !== "string") {
      throw new Error()
    } else if(!result.match(/\d{1,2}-\d{1,2}-\d{4}/i)) {
      throw new Error()
    }
  } else if(type === ComponentType.IMAGE) {
    if(result.constructor !== Array) {
      throw new Error()
    }
    result.forEach(res => {
      if(typeof res !== "number") {
        throw new Error()
      }
    })
  } else if(type === ComponentType.CHECKBOX) {
    if(!isObject(result)) {
      console.debug("something is wrong!")
      throw new Error()
    }
  } else if(type === ComponentType.TIME) {
    if(typeof result !== "string") {
      throw new Error()
    } else if(!result.match(/\d{1,2}:\d{1,2}/i)) {
      throw new Error()
    }
  } else if(type === ComponentType.TOGGLE) {
    if(typeof result !== "boolean") {
      throw new Error()
    }
  } else if(type === ComponentType.DROPDOWN) {
    if(typeof result !== "string") {
      throw new Error()
    }
  } else if(type === ComponentType.NUMBER) {
    if(typeof result !== "number") {
      throw new Error()
    }
  } else if(type === ComponentType.COLOR) {
    if(!isObject(result)) {
      console.debug("something is wrong!")
      throw new Error()
    }
    if(!result.hasOwnProperty("palette") || !result.hasOwnProperty("base") ||
      !result.hasOwnProperty("hue1") || !result.hasOwnProperty("hue2") || !result.hasOwnProperty("hue3")) {
      throw new Error()
    }
  } else if(type === ComponentType.ARRAY) {
    if(result.constructor !== Array) {
      throw new Error()
    }
  } else if(type === ComponentType.MAP) {
    if(result.constructor !== Array) {
      throw new Error()
    }
  } else {
    throw new Error()
  }
  return result
}

/**
 * find value of given path inside current config (form.config)
 * then validate the value data
 */
function findInConfig(path, type) {
  let result = get(getSelectedConfig(), path, type)
  return validateType(result, type)
}

/**
 * find value of given path inside current description default value
 * throw Error if path not found or no value.default property to the element with given path
 */
function findInDesc(path, type) {
  if(type === ComponentType.CHECKBOX) {
    let childPath = path[path.length - 1]
    path = path.slice(0, path.length - 1)
    return get(getSelectedDescription(), path, type).value.contents.find(c => c.value === childPath).checked
  }
  return get(getSelectedDescription(), path, type).value.default
}

/**
 * set will be called when get fail to find value for given path inside form.data
 * set will dispatch a value for given path to form reducer
 */
function set(path, type) {
  let result
  try {
    result = findInConfig(path.split("."), type)
  } catch(error) {
    try {
      result = findInDesc(path.split("."), type)
    } catch(error2) {
    }
  }
  result = result !== undefined ? result : defaultValue(type)
  storage.dispatch({
    type: ActionList.SET_DATA,
    payload: {
      "path": path,
      "value": result
    }
  })
  return result
}

/**
 * Iteratively try to find a value inside form.data with a given path
 * throw Error if given path is unavailable inside form.data
 */
function get(ptr, path, type) {
  if(ptr[path[0]] === undefined) {
    throw new Error()
  }
  if(path.length === 1) {
    if(ptr[path[0]] === null) {
      return defaultValue(type)
    }
    return ptr[path[0]]
  }
  return get(ptr[path[0]], path.slice(1), type)
}
