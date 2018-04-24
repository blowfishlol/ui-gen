import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { PanelBarUtils } from "@progress/kendo-react-layout"
import PanelNavigatorComponent from "./PanelNavigatorComponent"

import { descToPanelBarItem } from "../../util/panelBarInfo"
import {getSelectedDescriptionContent} from "../../util/descriptionDataGet"
import ActionList from "../../reducer/actionList"
import { windowOpen } from "../Window"

class PanelNavigator extends React.Component {

	renderPanelNavigatorComponent() {
    return <div>
      <PanelNavigatorComponent
        items={PanelBarUtils.mapItemsToComponents(descToPanelBarItem(getSelectedDescriptionContent().data))}/>
    </div>
  }

  onAddBtnClickedListener() {
    this.props.setWindow({
      title: "Choose Module",
      content: this.renderPanelNavigatorComponent(),
      width: "100%",
      height: "100%"
    })
    windowOpen()
  }

	render() {
    return <div>
      <button
        className="k-button k-primary"
        disabled={this.props.disabled}
        onClick={() => this.onAddBtnClickedListener()}>
          ADD
      </button>
    </div>
	}
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWindow: (bundle) => dispatch({
      type: ActionList.SET_WINDOW,
      payload: bundle
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
