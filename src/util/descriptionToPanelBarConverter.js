import React from "react"

export function getPanelBarChildObject(json) {

	var arr = [];
	traverse(json,arr,"root");
	return arr;
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
			
			//dia gak punya anak. artinya dia leaf.
			//TODO: orang tua nya harus tau kalo anak dia itu ada yang leaf.
			if(arr[newLength-1].children.length === 0){
				delete arr[newLength-1].children;

				const customStyle = {
		            textAlign: 'center',
		            width: "100%",
		            height: "100%"
		        }
				
				if(!isGroup) {
					isGroup = true;
					arr[newLength-1].title ="!leaf";
					arr[newLength-1].id = path;
				} else {
					//pop karena kalo udh dibuatin tombolnya gak usah dibuat lagi.
					arr.pop();
				}


			}

			if(arr[newLength-1] && arr[newLength-1].children) {
				var childArr = arr[newLength-1].children;
				for(let i = 0 ; i < childArr.length ; i++) {
					if(childArr[i].title === "!leaf") {
						arr[newLength-1].title = <div onClick={alert}> {arr[newLength-1].title}</div>;
						childArr.splice(i);
					}
				}
			}



		}
		
	}

	//return arr;
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