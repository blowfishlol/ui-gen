import storage from "./../storage"
import ActionList from "./../reducer/actionList"

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
    case "text":     return ""
    case "date":     return "2000-01-01"
    case "image":    return ""
    case "checkbox": return {}
    case "time":     return "12:00"
    case "toggle":   return false
    case "dropdown": return ""
    case "number":   return 0
    case "array":    return []
    case "map":      return {}
    default:         return ""
  }
}

export function fetchAllData() {
  const data = storage.getState().data
  return data[data.length-1]
}

export function check(path) {
  try {
    const data = storage.getState().data
    get(data[data.length-1], path.split("."))
    return true
  } catch(error) {
    return false
  }
}
