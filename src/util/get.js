import storage from "./../storage"
import ActionList from "./../reducer/actionList"
import ComponentType from "./ComponentType"
/**
 * param: string, ComponentType
 * return: var (according to ComponentType param)
 * check in the storage whether or not a value is stored
 * with the given path, create default value if not available
 * then return the obtained value to the caller
 */
export default function f(path, type) {
  try {
    const data = storage.getState().data
    return get(data[data.length-1], path.split("."))
  } catch(error) {
  }
  return set(path, type)
}

function set(path, type) {
  storage.dispatch({
    type: ActionList.SET,
    payload: {
      "path": path,
      "value": defaultValue(type)
    }
  })
  return f(path, type)
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
    default:         return ""
  }
}

export function fetchAllData() {
  const data = storage.getState().data
  return data[data.length-1]
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
    const data = storage.getState().data
    get(data[data.length-1], path.split("."))
    return true
  } catch(error) {
    return false
  }
}
