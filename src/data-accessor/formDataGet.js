import storage from "../storage"
import ActionList from "../reducer/actionList"
import ComponentType from "../component/ComponentType"

/**
 * param: string, ComponentType
 * return: var (according to ComponentType param)
 * check in the storage whether or not a value is stored
 * with the given path, create default value if not available
 * then return the obtained value to the calldescriptionGeter
 */
export default function f(path, type) {
  try {
    return get(fetchAllData(), path.split("."))
  } catch(error) {
    return set(path, type)
  }
}

function findInConfig(path, type) {
  var result = get(storage.getState().form.config, path.split("."))
  return validateType(result, type)
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
    if(typeof result !== "string") {
      throw new Error()
    }
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
  } else if(type === ComponentType.ARRAY) {
    if(result.constructor !== Array) {
      throw new Error()
    }
  } else if(type === ComponentType.MAP) {
    if(typeof result !== "object") {
      throw new Error()
    }
  } else {
    throw new Error()
  }
  return result
}

function set(path, type) {
  var result = null
  try {
    result = findInConfig(path, type)
  } catch(error) {
  }
  result = result ? result : defaultValue(type)
  storage.dispatch({
    type: ActionList.SET_DATA,
    payload: {
      "path": path,
      "value": result
    }
  })
  return result
}

function get(ptr, path) {
  if(ptr[path[0]] === undefined) {
    throw new Error()
  }
  if(path.length === 1) {
    return ptr[path[0]]
  }
  return get(ptr[path[0]], path.slice(1))
}

function defaultValue(type) {
  switch(type) {
    case ComponentType.TEXT:     return ""
    case ComponentType.DATE:     return "2000-01-01"
    case ComponentType.IMAGE:    return ""
    case ComponentType.CHECKBOX: return {}
    case ComponentType.TIME:     return "12:00"
    case ComponentType.TOGGLE:   return false
    case ComponentType.DROPDOWN: return ""
    case ComponentType.NUMBER:   return 0
    case ComponentType.ARRAY:    return []
    case ComponentType.MAP:      return {}
    default:                     return ""
  }
}

function isObject(obj) {
  return (obj && typeof obj === 'object' && !Array.isArray(obj));
}

function mergeDeep(obj1, obj2) {
  var output = {...obj1}
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

export function fetchAllData() {
  const data = storage.getState().form.data
  // return data[data.length-1]
  var merged = {}
  data.forEach(element => {
    merged = mergeDeep(merged, element)
  })
  return merged
}

/**
 * param: string
 * return: boolean
 * check in the storage whether or not a value is stored
 * with the given path
 * (will not create default value if not available)
 */
export function check(path) {
  try {
    get(fetchAllData(), path.split("."))
    return true
  } catch(error) {
    return false
  }
}
