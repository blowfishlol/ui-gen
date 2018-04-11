export function isObject(obj) {
  return obj && typeof obj === "object" && !Array.isArray(obj)
}

export function lastElementOf(arr) {
  return arr[arr.length-1]
}

export function mergeDeep(obj1, obj2) {
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

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}