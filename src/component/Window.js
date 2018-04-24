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
		$(this).data("kendoWindow").center()
    // $(this).data("kendoWindow").wrapper.css({
    //   width: "100%",
    //   height: "50%"
    // })
	})
}

export function windowClose() {
	$("[data-role='window']").each(function (index) {
		$(this).data("kendoWindow").close()
		$(this).data("kendoWindow").center()
    // $(this).data("kendoWindow").wrapper.css({
    //   width: "100%",
    //   height: "50%"
    // })
	})
}

class WindowComponent extends React.Component {

	/**
	 * Temporary method to set default window to invisible
	 * As adding props visible={false} to it make it unable to open
	 */
	componentDidMount() {
		$("[data-role='window']").each(function (index) {
			$(this).data("kendoWindow").close()
			$(this).data("kendoWindow").center()
		})
  }

	render() {
		return <div>
      <Window close={() => this.props.done()} title={this.props.title} draggable={false} width={this.props.width} height={this.props.height}>
        {this.props.content}
      </Window>
		</div>
	}
}


const mapStateToProps = function(storage) {
  return {
    title: storage.win.title,
    content: storage.win.content,
    width: storage.win.width,
    height: storage.win.height
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
