import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { PanelBar, PanelBarItem, PanelBarUtils } from "@progress/kendo-react-layout"
import PanelNavigatorComponent from "./PanelNavigatorComponent"

import { transform, isAllChildLeafNode, isLeafNode } from "../../util/panelBarInfo"
import { getSelectedDescription } from "../../util/activeDataGet"
import ActionList from "../../reducer/actionList"
import { windowOpen } from "../Window"

class PanelNavigator extends React.Component {

	renderPanelNavigatorComponent() {
    return <div>
      <PanelNavigatorComponent items={PanelBarUtils.mapItemsToComponents(transform(getSelectedDescription()))}/>
    </div>
  }

  onAddBtnClickedListener() {
    this.props.setWindowTitle("Choose Module")
    this.props.setWindowContent(this.renderPanelNavigatorComponent())
    this.props.setWindowSize("100%", "100%")
    windowOpen()
  }

	render() {
    return <div>
      <button className="k-button k-primary" onClick={() => this.onAddBtnClickedListener()}>ADD</button>
    </div>
	}
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWindowTitle: (title) => dispatch({
      type: ActionList.SET_WINDOW_TITLE,
      payload: title
    }),
    setWindowContent: (content) => dispatch({
      type: ActionList.SET_WINDOW_CONTENT,
      payload: content
    }),
    setWindowSize: (width, height) => dispatch({
      type: ActionList.SET_WINDOW_SIZE,
      payload: {
        "width": width,
        "height": height
      }
    }),
    setWindowOpen: (isOpen) => dispatch({
      type: ActionList.OPEN_WINDOW,
      payload: isOpen
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(PanelNavigator)
