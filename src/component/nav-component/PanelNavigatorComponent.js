import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { PanelBar } from "@progress/kendo-react-layout"
import { AutoComplete } from "@progress/kendo-dropdowns-react-wrapper"

import { isHaveAChildLeafNode, getNode, panelBarItemToDataSource } from "../../util/panelBarInfo"
import { getSelectedDescription } from "../../util/activeDataGet"
import { windowClose } from "../Window"
import ActionList from "../../reducer/actionList"
import BlankSpace from "../BlankSpace";

class PanelNavigatorComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPath: "",
      isSelectable: false,
      selectedKey: "",
    }
    this.dataSource = panelBarItemToDataSource(this.props.items)
    console.log("BOIII ", this.dataSource)
  }

  findKey(label, path) {
    let index = label ? this.dataSource.labels.findIndex(l => l === label) : this.dataSource.paths.findIndex(p => p === path)

    return this.dataSource.keys[index]
  }


  getExpandedKeys(key) {
    var keyArray = key.split(".");
    keyArray.splice(0,1);
    var preparedKeys = [];
    for(let i = 0 ; i < keyArray.length ; i++) {
      if(i === 0){
        preparedKeys.push("." + keyArray[i]);
      }else{
        preparedKeys.push(preparedKeys[i-1] + "." + keyArray[i]);
      }
    }
    preparedKeys.pop();
    console.log("PREPARED",preparedKeys)
    return preparedKeys;


  }



  handleChange(event) {
    let path = event.target.props.id.split(".")
    let node = getNode(getSelectedDescription().data, path)
    this.setState({
      ...this.state,
      selectedPath: event.target.props.id,
      isSelectable: isHaveAChildLeafNode(node.child),
      selectedKey: this.findKey(undefined, event.target.props.id),
    })
  }

  onAddBtnClickedListener() {
    this.props.addPath(this.state.selectedPath)
    windowClose()
  }

  onSearchBoxSelectedListener(evt) {
    this.setState({
      ...this.state,
      selectedKey: this.findKey(evt.dataItem)
    })
  }

  render() {
    let node = getNode(getSelectedDescription().data, this.state.selectedPath.split("."))
    return <div>
      <PanelBar
        children={this.props.items}
        expandMode={"single"}
        selected={this.state.selectedKey}
        expanded={this.getExpandedKeys(this.state.selectedKey)}
        onSelect={(evt) => this.handleChange(evt)} />
      <BlankSpace space="75px"/>
      <div className="page-footer footer-bg-white">
        <AutoComplete
          dataSource={this.dataSource.labels}
          placeholder="search..."
          select={(evt) => this.onSearchBoxSelectedListener(evt)}/>
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
