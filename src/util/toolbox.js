export function isObject(obj) {
  return obj && typeof obj === "object" && !Array.isArray(obj)
}

export function isArray(arr) {
  if(arr) {
    return arr.constructor === Array
  }
  return false
}

export function lastElementOf(arr) {
  return arr[arr.length-1]
}

export function mergeDeep(obj1, obj2) {
  let output = {...obj1}
  Object.keys(obj2).forEach(key => {
    if(isObject(obj2[key])) {
      if(!(Object.keys(obj1).find(k => k === key))) {
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

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function concatArrayById(elements, newElement) {
  if(elements.find(element => element.id === newElement.id)) {
    return elements.map(element => {
      return element.id === newElement.id ? newElement : element
    })
  } else {
    return elements.concat(newElement)
  }
}

