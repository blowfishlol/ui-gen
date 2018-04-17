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

function formatPath(path) {
  return path.split(".").slice(0, path.split(".").length - 1).join(".")
}

function filterPanelBarItems(ptr, storage, filter) {
  ptr.forEach(item => {
    if(item.props.title.toLowerCase().includes(filter.toLowerCase())) {
      storage[storage.length] = {
        id: item.props.id,
        title: formatPath(item.props.id) + ": " + item.props.title
      }
    }
    if(item.props.children) {
      filterPanelBarItems(item.props.children, storage, filter)
    }
  })
}

export function descToPanelBarItemFiltered(items, filter) {
  let output = []
  filterPanelBarItems(items, output, filter)
  return output
}