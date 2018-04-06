import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import $ from "jquery"
import "@progress/kendo-ui"
import { Window } from '@progress/kendo-window-react-wrapper';

import ActionList from "../reducer/actionList"

export function windowOpen() {
	console.log("Windos SHOULD BE Openet");
     $("[data-role='window']").each(function (index) {
     	console.log("UDAH MASK NEH WOI WOI JING TAI BANGSANTAKDLAKDJAKDSJSA");
     	$(this).data('kendoWindow').open()
     });
}

class WindowComponent extends React.Component {

	render() {
		return (
		<div>
			<Window title={"Color Picker"} close={this.props.done}>
				{this.props.content}
			</Window>
		</div>
		)	
	}

}


const mapStateToProps = function(storage) {
  return {
    content: storage.windowReducer.content //TODO
	}
}

const mapDispatchToProps = function(dispatch) {
  return {
    done: () => dispatch({
      type: ActionList.SET_WINDOW_DEFAULT //TODO
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WindowComponent)