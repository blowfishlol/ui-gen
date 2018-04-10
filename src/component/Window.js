import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import $ from "jquery"
import "@progress/kendo-ui"
import { Window } from "@progress/kendo-window-react-wrapper"

import ActionList from "../reducer/actionList"

export function windowOpen() {
	$("[data-role='window']").each(function (index) {
		$(this).data("kendoWindow").open()
		// $(this).data("kendoWindow").center()
	})
}

export function windowClose() {
	$("[data-role='window']").each(function (index) {
		$(this).data("kendoWindow").close()
		// $(this).data("kendoWindow").center()
	})
}

class WindowComponent extends React.Component {

	componentDidMount() {
		$("[data-role='window']").each(function (index) {
			$(this).data("kendoWindow").close()
			$(this).data("kendoWindow").center()
		})
  }

	render() {
		return <div>
			<Window close={() => this.props.done()} title={this.props.title} width={"100%"} height={"50%"}>
				{this.props.content}
			</Window>
		</div>
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
