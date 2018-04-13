import React from "react"

function generatePath(carry, current) {
  return carry ? carry + "." + current : current
}

function isLeafNode(node) {
  return node.hasOwnProperty("element")
}

function isAllChildLeafNode(node) {
  for(let key in node) {
    if(!isLeafNode(node[key])) {
      return false
    }
  }
  return true
}

export function esrevart(node, carryPath) {
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
      children: esrevart(node[key].child, generatePath(carryPath, key))
    }
  }).filter(node => node !== 0)
}

export function getPanelBarChildObject(json) {

	var arr = [];
	var newArr = traverse(json,arr,"root");
	return newArr;
}

function traverse(json,arr,path) {
	
	var isGroup = false;
	for(var key in json) {
		
		if(isObject(json)){
			
			var newLength = arr.push({
				id: path+"."+key,
				title: key,
				children: []
			})
			
			traverse(json[key].child, arr[newLength-1].children, path+"."+key);
			

			if(arr[newLength-1].children.length === 0){
				delete arr[newLength-1].children;

				const customStyle = {
		            textAlign: 'center',
		            width: "100%",
		            height: "100%"
		        }
				
				if(!isGroup) {
					isGroup = true;
					arr[newLength-1].title = (<div style={customStyle}><button className="k-button " >{"Add " + getLabelFromPath(path)}</button></div>);
					arr[newLength-1].id = path;
				} else {
					//pop karena kalo udh dibuatin tombolnya gak usah dibuat lagi.
					delete arr.pop();
				}


			}

		}
		
	}

	return arr;
}



function isObject(obj) {
	if (obj === null) {
		return false;
	}
	
    return ( (typeof obj === 'function') || (typeof obj === 'object') );
}


function camelCaseToSpaceSeperated(str) {
	return str
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, function(str){ 
			return str.toUpperCase(); 
		});
}

function getLabelFromPath(pathStr) {
	const splitted = pathStr.split(".");
	if(splitted.length > 1) {
		const lastIdx = camelCaseToSpaceSeperated(splitted[splitted.length-1]);
		splitted.pop();
		const route = splitted.join("/");
		return route + ": " + lastIdx;
	} else {
		return camelCaseToSpaceSeperated(pathStr);
	}
}