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

export function descToPanelBarItem(node, carryPath) {
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
      children: descToPanelBarItem(node[key].child, generatePath(carryPath, key))
    }
  }).filter(node => node !== 0)
}

export function getNode(node, path) {
  if(path.length === 1) {
    return node[path[0]]
  }
  return getNode(node[path[0]].child, path.slice(1, path.length))
}

function mapPanelBarItems(ptr, carryKey, storage) {
  ptr.forEach((item, index) => {
    storage.labels = storage.labels.concat(item.props.title)
    storage.keys = storage.keys.concat(carryKey + "." + index)
    storage.paths = storage.paths.concat(item.props.id)

    if(item.props.children) {
      mapPanelBarItems(item.props.children, carryKey + "." + index, storage)
    }
  })
}

export function panelBarItemToDataSource(items) {
  let output = {
    labels: [],
    keys: [],
    paths: []
  }
  mapPanelBarItems(items, "", output)
  return output
}