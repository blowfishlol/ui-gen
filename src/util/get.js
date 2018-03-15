import storage from "./../storage"
import ActionList from "./../reducer/actionList"

export default function f(path, type) {
  try {
    return get(storage.getState().data, path.split("."), type)
  } catch(error) {
  }
  return set(path, type)
}

function set(path, type) {
  console.log("set new")
  storage.dispatch({
    type: ActionList.SET,
    payload: {
      "path": path,
      "value": defaultValue(type)
    }
  })
  return f(path, type)
}

function get(ptr, path, type) {
  if(ptr[path[0]] === undefined) {
    throw new Error()
  }
  if(path.length === 1) {
    return ptr[path[0]]
  }
  return get(ptr[path[0]], path.slice(1), type)
}

function defaultValue(type) {
  switch(type) {
    case "text":     return "moti"
    case "date":     return "2000-01-01"
    case "image":    return ""
    case "checkbox": return {
      "checkup":true,
    }
    case "time":     return "12:00"
    case "toggle":   return true
    case "dropdown": return ""
    case "number":   return 777
    case "array":    return []
    case "map":      return {}
    default:         return ""
  }
}
