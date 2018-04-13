import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { PanelBar, PanelBarItem, PanelBarUtils } from "@progress/kendo-react-layout"
import { esrevart } from "../../util/descriptionToPanelBarConverter"

class PanelNavigator extends React.Component {

	constructor(props){
		super(props)
		var jsonFile = require("../../util/descriptionOriginal")
		var arr = []

		this.state = {
			panelInfo: esrevart(jsonFile),
			currentPath: "root"
		}
	}

	handleChange(event) {
	  console.debug(event.target.props.id)
		this.setState({
			currentPath: event.target.props.id
    	})
	}

	render() {
	  console.debug(this.state.panelInfo)
		let insides = PanelBarUtils.mapItemsToComponents(this.state.panelInfo)
		console.log(insides)
		return <div>
			<div>{this.state.currentPath}</div>
			<PanelBar
				children={insides}
				expandMode={"single"}
				onSelect={(e) => this.handleChange(e)}
			/>
		</div>
	}
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(PanelNavigator)
