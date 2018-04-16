function generatePath(carry, current) {
  return carry ? carry + "." + current : current
}

export function isLeafNode(node) {
  return node.hasOwnProperty("element")
}

export function isHaveAChildLeafNode(node) {
  for(let key in node) {
    if(isLeafNode(node[key])) {
      return true
    }
  }
  return false
}

export function isAllChildLeafNode(node) {
  for(let key in node) {
    if(!isLeafNode(node[key])) {
      return false
    }
  }
  return true
}

export function transform(node, carryPath) {
  return Object.keys(node).map(key => {
    if(isLeafNode(node[key])) {
      return 0
    }
    if(isAllChildLeafNode(node[key].child)) {
      return {
        id: generatePath(carryPath, key),
        title: node[key].label
      }
    }
    return {
      id: generatePath(carryPath, key),
      title: node[key].label,
      children: transform(node[key].child, generatePath(carryPath, key))
    }
  }).filter(node => node !== 0)
}

export function getNode(node, path) {
  if(path.length === 1) {
    return node[path[0]]
  }
  return getNode(node[path[0]].child, path.slice(1, path.length))
}