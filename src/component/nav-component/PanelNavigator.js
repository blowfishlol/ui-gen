import React from 'react';
import ReactDOM from 'react-dom';

import { PanelBar, PanelBarItem, PanelBarUtils } from '@progress/kendo-react-layout';
import { getPanelBarChildObject } from '../../util/descriptionToPanelBarConverter';

export class PanelNavigator extends React.Component {

	constructor(props){
		super(props);
		var jsonFile = require("../../util/descriptionOriginal");
		var arr = [];

		this.state = {
			panelInfo: getPanelBarChildObject(jsonFile),
			currentPath: "root"
		}

	}


	handleChange(event) {
		this.setState({
			currentPath: event.target.props.id
    	})
	}


	render(){
		let insides = PanelBarUtils.mapItemsToComponents(this.state.panelInfo);
		console.log(insides);
		return(
			<div>
				<div>{this.state.currentPath}</div>
				<PanelBar 
					children={insides} 
					expandMode={"single"} 
					onSelect={(e) => this.handleChange(e)}
				/>
			</div>
		);
	}

	

}