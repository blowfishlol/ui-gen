import React from 'react';

import { PanelBar, PanelBarUtils } from '@progress/kendo-react-layout';

export class PanelNavigator extends React.Component {

	constructor(props){
		super(props);
		var jsonFile = require("../../util/descriptionOriginal");
		var arr = [];
		this.traverse(jsonFile,arr,"root");
		this.state = {
			panelInfo: arr,
			currentPath: "root",
			selectedPath: "",
			jsonFile: jsonFile,
			showButton: false,
		}

	}

	doPathHaveLeafNode(obj,pathArr){
		
		pathArr.splice(0,1);
		if(pathArr.length > 0) {
			console.log("BOI" , pathArr[0]);
			return this.doPathHaveLeafNode(obj[pathArr[0]].child, pathArr);
		} else{
			//checck if a child if leaf;
			for(var key in obj) {
				if(obj[key].element){
					return true;
				} else {
					return false;
				}
			}
		}

	}

	handleChange(event) {

		this.setState({
			currentPath: event.target.props.id,
    	})
		var pathArr = event.target.props.id.split(".");
		if(this.doPathHaveLeafNode(this.state.jsonFile, pathArr)) {
			this.setState({
				showButton: true,
			})
		} else {
			this.setState({
				showButton: false,
			})
		}

	}

	handleLeafClick(path) {
		this.setState({
			selectedPath: path
    	})
	}


	render(){
		let insides = PanelBarUtils.mapItemsToComponents(this.state.panelInfo);
		var button =this.state.showButton ? (<button className={"k-button"}>{"Add "}{this.state.selectedPath}</button>) : "";
		return(
			<div>
				<div>{this.state.currentPath}</div>
				<div>{"selected leaf:" + this.state.selectedPath}</div>
				<PanelBar 
					children={insides} 
					expandMode={"single"} 
					onSelect={(e) => this.handleChange(e)}
				/>
				{button}
			</div>

		);
	}

	traverse(json,arr,path) {
		
		var isGroup = false;
		for(var key in json) {
			
			if(this.isObject(json)){
				
				var newLength = arr.push({
					id: path+"."+key,
					title: key,
					children: []
				})
				
				//by reference!
				this.traverse(json[key].child, arr[newLength-1].children, path+"."+key);
				
				//dia gak punya anak. artinya dia leaf.
				//TODO: orang tua nya harus tau kalo anak dia itu ada yang leaf.
				if(arr[newLength-1].children.length === 0){
					delete arr[newLength-1].children;

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
							arr[newLength-1].title = <div onClick={this.handleLeafClick(arr[newLength-1].id)}> {arr[newLength-1].title} </div>;
							childArr.splice(i,1);
						}
					}
				}
			}
			
		}
		//return arr;
	}



	isObject(obj) {
		if (obj === null) {
			return false;
		}
		
	    return ( (typeof obj === 'function') || (typeof obj === 'object') );
	}


	camelCaseToSpaceSeperated(str) {
		return str
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, function(str){ 
				return str.toUpperCase(); 
			});
	}

	getLabelFromPath(pathStr) {
		const splitted = pathStr.split(".");
		if(splitted.length > 1) {
			const lastIdx = this.camelCaseToSpaceSeperated(splitted[splitted.length-1]);
			splitted.pop();
			const route = splitted.join("/");
			return route + ": " + lastIdx;
		} else {
			return this.camelCaseToSpaceSeperated(pathStr);
		}
	}

	

}