import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { PanelBar, PanelBarUtils } from "@progress/kendo-react-layout"

import { isHaveAChildLeafNode, getNode, descToPanelBarItemFiltered } from "../../util/panelBarInfo"
import {getSelectedDescriptionContent} from "../../util/descriptionDataGet"
import { windowClose } from "../Window"
import ActionList from "../../reducer/actionList"
import BlankSpace from "../BlankSpace";

class PanelNavigatorComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: this.props.items,
      selectedPath: "",
      isSelectable: false,
      searchBoxValue: ""
    }
  }

  handleChange(event) {
    let path = event.target.props.id.split(".")
    let node = getNode(getSelectedDescriptionContent().data, path)
    this.setState({
      ...this.state,
      selectedPath: event.target.props.id,
      isSelectable: isHaveAChildLeafNode(node.child),
    })
  }

  onAddBtnClickedListener() {
    this.props.addPath(this.state.selectedPath)
    windowClose()
  }

  onSearchBoxChangedListener(evt) {
    if(evt.target.value === "") {
      this.setState({
        ...this.state,
        searchBoxValue: evt.target.value,
        items: this.props.items
      })
    } else {
      this.setState({
        ...this.state,
        searchBoxValue: evt.target.value,
        items: PanelBarUtils.mapItemsToComponents(descToPanelBarItemFiltered(this.props.items, evt.target.value))
      })
    }
  }

  render() {
    let node = getNode(getSelectedDescriptionContent().data, this.state.selectedPath.split("."))
    return <div>
      <PanelBar
        expandMode="single"
        children={this.state.items}
        onSelect={(evt) => this.handleChange(evt)} />
      <BlankSpace space="75px"/>
      <div className="page-footer footer-bg-white">
        <input
          className="k-textbox"
          placeholder="search..."
          value={this.state.searchBoxValue}
          onChange={evt => this.onSearchBoxChangedListener(evt)} />
        <button className="k-button k-primary float-right" disabled={!this.state.isSelectable} onClick={() => this.onAddBtnClickedListener()}>
          {"Add " + (node ? node.label : "")}
        </button>
      </div>
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
