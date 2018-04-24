import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Button } from "@progress/kendo-react-buttons"
import { GridCell } from "@progress/kendo-react-grid"

import { dialogOpen } from "../../Dialog"
import { clone } from "../../../util/toolbox";
import ActionList from "../../../reducer/actionList"
import {findDescIdByDescContentId, getSelectedDescription} from "../../../util/descriptionDataGet";

class DescVersionDisplayToolColumn extends GridCell {

  onTemplateBtnClickedListener() {
    this.props.assignDescription(findDescIdByDescContentId(this.props.dataItem.id))
    this.props.assignDescriptionContent(this.props.dataItem.id)
    this.props.newTemplate()
    this.props.goToTemplateForm()
  }

  onEditBtnClickedListener() {
    this.props.assignDescription(findDescIdByDescContentId(this.props.dataItem.id))
    this.props.assignDescriptionContent(this.props.dataItem.id)
    this.props.goToDescContentForm()
  }

  onEditNewBtnClickedListener() {
    this.props.assignDescription(findDescIdByDescContentId(this.props.dataItem.id))

    let content = clone(getSelectedDescription().descriptionContents.find(descContent => {
      return descContent.id === this.props.dataItem.id
    }))
    content.id = -1
    this.props.newDescriptionWithContent(content)
    this.props.goToDescContentForm()
  }

  onDeleteBtnClickedListener() {
    this.props.setDialogMessage("Delete this Description Version and all its children?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.props.deleteDescContent(this.props.dataItem.id, this.props.userId, this.props.token)
    })
    dialogOpen()
  }

  render() {
    return <td>
      <div className="d-none d-sm-none d-md-block">
        <button className="k-button k-primary config-button" onClick={() => this.onTemplateBtnClickedListener()}>
          Add Template
        </button>
        &nbsp;
        <button className="k-button k-primary config-button" onClick={() => this.onEditBtnClickedListener()}>
          Edit
        </button>
        &nbsp;
        <button className="k-button k-primary config-button" onClick={() => this.onEditNewBtnClickedListener()}>
          Edit as New
        </button>
        &nbsp;
        <button className="k-button k-primary config-button" onClick={() => this.onDeleteBtnClickedListener()}>
          Delete
        </button>
      </div>
      <div className="d-sm-block d-md-none">
        <Button primary={true} icon={"plus"} onClick={() => this.onTemplateBtnClickedListener()}/>&nbsp;
        <Button primary={true} icon={"edit"} onClick={() => this.onEditBtnClickedListener()}/>&nbsp;
        <Button primary={true} icon={"file-add"} onClick={() => this.onEditNewBtnClickedListener()}/>&nbsp;
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
    assignDescriptionContent: (id) => dispatch({
      type: ActionList.ASSIGN_DESC_CONTENT,
      payload: id
    }),
    newDescriptionWithContent: (content) => dispatch({
      type: ActionList.ADD_NEW_DESC_CONTENT,
      payload: content
    }),
    goToDescContentForm: () => dispatch({
      type: ActionList.GO_TO_NEW_DESC_CONTENT
    }),
    newTemplate: () => dispatch({
      type: ActionList.ADD_NEW_TEMPLATE
    }),
    goToTemplateForm: () => dispatch({
      type: ActionList.GO_TO_NEW_TEMPLATE
    }),
    deleteDescContent: (descriptionContentId, userId, token) => dispatch({
      type: ActionList.DELETE_DESCRIPTION_CONTENT,
      payload: {
        "description_content_id": descriptionContentId,
        "id": userId,
        "token": token
      }
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
)(DescVersionDisplayToolColumn)
