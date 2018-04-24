import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Button } from "@progress/kendo-react-buttons"
import { GridCell } from "@progress/kendo-react-grid"

import { dialogOpen } from "../../Dialog"
import { clone } from "../../../util/toolbox";
import {
  findDescContentIdByTemplateId, findDescIdByTemplateId,
  getSelectedDescriptionContent
} from "../../../util/descriptionDataGet";
import ActionList from "../../../reducer/actionList"

class TemplateToolColumn extends GridCell {

  onEditBtnClickedListener() {
    this.props.assignDescription(findDescIdByTemplateId(this.props.dataItem.id))
    this.props.assignDescriptionContent(findDescContentIdByTemplateId(this.props.dataItem.id))
    this.props.assignTemplate(this.props.dataItem.id)
    this.props.goToTemplateForm()
  }

  onEditNewBtnClickedListener() {
    this.props.assignDescription(findDescIdByTemplateId(this.props.dataItem.id))
    this.props.assignDescriptionContent(findDescContentIdByTemplateId(this.props.dataItem.id))

    let content = clone(getSelectedDescriptionContent().templates.find(template => {
      return template.id === this.props.dataItem.id
    }))
    content.id = -1
    this.props.newTemplateWithContent(content)
    this.props.goToTemplateForm()
  }

  onDeleteBtnClickedListener() {
    this.props.setDialogMessage("Delete this Template?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.props.deleteTemplate(this.props.dataItem.id, this.props.userId, this.props.token)
    })
    dialogOpen()
  }

  render() {
    return <td>
      <div className="d-none d-md-block">
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
      <div className="d-block d-md-none">
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
    assignTemplate: (id) => dispatch({
      type: ActionList.ASSIGN_TEMPLATE,
      payload: id
    }),
    newTemplateWithContent: (content) => dispatch({
      type: ActionList.ADD_NEW_TEMPLATE,
      payload: content
    }),
    goToTemplateForm: () => dispatch({
      type: ActionList.GO_TO_NEW_TEMPLATE
    }),
    deleteTemplate: (templateId, userId, token) => dispatch({
      type: ActionList.DELETE_TEMPLATE,
      payload: {
        "template_id": templateId,
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
)(TemplateToolColumn)
