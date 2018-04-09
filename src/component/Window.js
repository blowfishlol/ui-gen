import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import $ from "jquery"
import "@progress/kendo-ui"
import { Window } from "@progress/kendo-window-react-wrapper"

import ActionList from "../reducer/actionList"

export function windowOpen() {
	$("[data-role='window']").each(function (index) {
		$(this).data("kendoWindow").open();
		$(this).data("kendoWindow").center();
	})
}

class WindowComponent extends React.Component {

	render() {
		return <div>
			<Window title={this.props.title} height={"50%"} width={"300px"}>
				{this.props.content}
			</Window>
		</div>
	}

	componentDidMount() {
		$("[data-role='window']").each(function (index) {
			$(this).data("kendoWindow").close();
			$(this).data("kendoWindow").center();
		})
	}
}


const mapStateToProps = function(storage) {
  return {
		title: storage.win.title,
    content: storage.win.content
	}
}

const mapDispatchToProps = function(dispatch) {
  return {
    done: () => dispatch({
      type: ActionList.SET_WINDOW_DEFAULT
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WindowComponent)
