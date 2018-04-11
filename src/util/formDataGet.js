import storage from "../storage"
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

export function getElementRefs() {
  return storage.getState().form.element_refs
}

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

export function fetchAllData() {
  const data = storage.getState().form.data
  let merged = {}
  data.forEach(element => {
    merged = mergeDeep(merged, element)
  })
  return merged
}

export function getNoDispatch(path, type) {
  try {
    return get(fetchAllData(), path.split("."), type)
  } catch(error) {
    try {
      return findInConfig(path, type)
    } catch(error2) {
      return defaultValue(type)
    }
  }
}

export function setByIndex(path, type, index) {
  let result
  try {
    result = findInConfig(path, type)
  } catch(error) {
  }
  // result = result ? result : defaultValue(type)
  if(result !== undefined) {
    storage.dispatch({
      type: ActionList.SET_DATA_BY_INDEX,
      payload: {
        "path": path,
        "value": result,
        "index": index
      }
    })
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
function isObject(obj) {
  return (obj && typeof obj === 'object' && !Array.isArray(obj));
}

function lastElement(arr) {
  return arr[arr.length-1]
}

function mergeDeep(obj1, obj2) {
  let output = {...obj1}
  Object.keys(obj2).forEach(key => {
    if(isObject(obj2[key])) {
      if(!(key in obj1)) {
        output = {
          ...output,
          [key]: obj2[key]
        }
      } else {
        output[key] = mergeDeep(obj1[key], obj2[key])
      }
    } else {
      output = {
        ...output,
        [key]: obj2[key]
      }
    }
  })
  return output;
}

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
    if(typeof result !== "object") {
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
    if(!(!!result) || !(result.constructor === Object)) {
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
  let result = get(storage.getState().form.config, path.split("."), type)
  return validateType(result, type)
}

/**
 * find value of given path inside current description default value
 */
function findInDesc(path) {
  let appState = lastElement(storage.getState().form.app_state)
  let form = storage.getState().form.description[appState].form
  form.forEach(element => {
    if(element.path === path) {
      if(element.hasOwnProperty("value")) {
        if(element.value.hasOwnProperty("default")) {
          return element.value.default
        }
      }
    }
  })
  throw new Error()
}

/**
 * set will be called when get fail to find value for given path inside form.data
 * set will dispatch a value for given path to form reducer
 */
function set(path, type) {
  let result
  try {
    result = findInConfig(path, type)
  } catch(error) {
    try {
      result = findInDesc(path)
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
