import React from "react"

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
		            textAlign: 'center'
		        }
				arr[newLength-1].content = (<div style={customStyle}><button className="k-button " >{"Add " + getLabelFromPath(path+"."+key)}</button></div>);
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