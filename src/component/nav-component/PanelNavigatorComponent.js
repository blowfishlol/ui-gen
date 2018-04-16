import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { PanelBar, PanelBarItem, PanelBarUtils } from "@progress/kendo-react-layout"
import { isHaveAChildLeafNode, getNode } from "../../util/panelBarInfo"
import { getSelectedDescription } from "../../util/activeDataGet"
import { windowClose } from "../Window"
import ActionList from "../../reducer/actionList"

class PanelNavigatorComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPath: "",
      isSelectable: false
    }
  }

  handleChange(event) {
    let path = event.target.props.id.split(".")
    let node = getNode(getSelectedDescription().data, path)
    this.setState({
      ...this.state,
      selectedPath: event.target.props.id,
      isSelectable: isHaveAChildLeafNode(node.child)
    })
  }

  onAddBtnClickedListener() {
    this.props.addPath(this.state.selectedPath)
    windowClose()
  }

  render() {
    let node = getNode(getSelectedDescription().data, this.state.selectedPath.split("."))
    return <div>
      <PanelBar
        children={this.props.items}
        expandMode={"single"}
        onSelect={(evt) => this.handleChange(evt)} />
      <button className="k-button k-primary" disabled={!this.state.isSelectable} onClick={() => this.onAddBtnClickedListener()}>
        {"Add " + (node ? node.label : "")}
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
    addPath: (path) => dispatch({
      type: ActionList.ADD_PATH,
      payload: path
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(PanelNavigatorComponent)
