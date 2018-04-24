import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Button } from "@progress/kendo-react-buttons"
import { GridCell } from "@progress/kendo-react-grid"
import DescriptionWindowComponent from "./DescriptionWindowComponent"

import { dialogOpen } from "../../Dialog"
import ActionList from "../../../reducer/actionList"
import {windowOpen} from "../../Window";

class DescriptionDisplayToolColumn extends GridCell {

  renderEditDescriptionPrompt() {
    return <div>
      <DescriptionWindowComponent descId={this.props.dataItem.id} name={this.props.dataItem.name}/>
    </div>
  }

  onChangeNameBtnClickedListener() {
    this.props.setWindow({
      title: "New Description",
      content: this.renderEditDescriptionPrompt(),
      width: "50%",
      height: "15%"
    })
    windowOpen()
  }

  onAddBtnClickedListener() { // -_-" 3 dispatch ccd
    this.props.assignDescription(this.props.dataItem.id)
    this.props.newDescription()
    this.props.goToDescContentForm()
  }

  onDeleteBtnClickedListener() {
    this.props.setDialogMessage("Delete this Description and all its children?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.props.deleteDescription(this.props.dataItem.id, this.props.userId, this.props.token)
    })
    dialogOpen()
  }

  render() {
    return <td>
      <div className="d-none d-sm-none d-md-block">
        <button className="k-button k-primary config-button" onClick={() => this.onAddBtnClickedListener()}>
            Add Version
        </button>
        &nbsp;
        <button className="k-button k-primary config-button" onClick={() => this.onChangeNameBtnClickedListener()}>
            Change Name
        </button>
        &nbsp;
        <button className="k-button k-primary config-button" onClick={() => this.onDeleteBtnClickedListener()}>
            Delete
        </button>
      </div>
      <div className="d-sm-block d-md-none">
        <Button primary={true} icon={"plus"} onClick={() => this.onAddBtnClickedListener()}/>&nbsp;
        <Button primary={true} icon={"egoToDescContentFormdit"} onClick={() => this.onChangeNameBtnClickedListener()}/>&nbsp;
        <Button primary={true} icon={"delete"} onClick={() => this.onDeleteBtnClickedListener()}/>
      </div>
    </td>
  }
}

const mapStateToProps = function(storage) {
  return {
    userId: storage.user.id,
    token: storage.user.token
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    assignDescription: (id) => dispatch({
      type: ActionList.ASSIGN_DESCRIPTION,
      payload: id
    }),
    newDescription: () => dispatch({
      type: ActionList.ADD_NEW_DESC_CONTENT
    }),
    goToDescContentForm: () => dispatch({
      type: ActionList.GO_TO_NEW_DESC_CONTENT
    }),
    deleteDescription: (descriptionId, userId, token) => dispatch({
      type: ActionList.DELETE_DESCRIPTION,
      payload: {
        "description_id": descriptionId,
        "id": userId,
        "token": token
      }
    }),
    setWindow: (bundle) => dispatch({
      type: ActionList.SET_WINDOW,
      payload: bundle
    }),
    setDialogMessage: (message) => dispatch({
      type: ActionList.SET_DIALOG_MESSAGE,
      payload: message
    }),
    setDialogFinishFunction: (methods) => dispatch({
      type: ActionList.SET_ADDITIONAL_METHOD,
      payload: methods
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DescriptionDisplayToolColumn)
