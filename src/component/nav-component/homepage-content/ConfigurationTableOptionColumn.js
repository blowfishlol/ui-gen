import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Button } from "@progress/kendo-react-buttons"
import { GridCell } from "@progress/kendo-react-grid"

import fileDownload from "js-file-download"
import { dialogOpen } from "../../Dialog"
import ActionList from "../../../reducer/actionList"

class ConfigurationDisplayCustomColumn extends GridCell {

  findConfig() {
    return this.props.configs.find(element => {
      return element.id === this.props.dataItem.id
    })
  }

  onDeleteBtnClickedListener() {
    this.props.setDialogMessage("Delete configuration \"" + this.props.dataItem.name + "\"?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.props.deleteConfig(this.props.dataItem.id, this.props.userId, this.props.token)
    })
    dialogOpen()
  }

  onEditBtnClickedListener() {
    this.props.setSelectedConfig(this.findConfig().id)
  }

  onExportBtnClickedListener() {
    fileDownload(JSON.stringify(this.findConfig().configContent.data), this.findConfig().name + ".json")
  }

  render() {
    return <td>
      <div className="d-none d-md-block">
        <button className="k-button k-primary config-button" onClick={() => this.onEditBtnClickedListener()}>
            EDIT
        </button>
        &nbsp;
        <button className="k-button k-primary config-button" onClick={() => this.onDeleteBtnClickedListener()}>
            DELETE
        </button>
        &nbsp;
        <button className="k-button k-primary config-button" onClick={() => this.onExportBtnClickedListener()}>
            EXPORT
        </button>
      </div>
      <div className="d-block d-md-none">
        <Button primary={true} icon={"edit"} onClick={() => this.onEditBtnClickedListener()}/>&nbsp;
        <Button primary={true} icon={"delete"} onClick={() => this.onDeleteBtnClickedListener()}/>&nbsp;
        <Button primary={true} icon={"download"} onClick={() => this.onExportBtnClickedListener()}/>
      </div>
    </td>
  }
}

const mapStateToProps = function(storage) {
  return {
    configs: storage.config.configs,
    userId: storage.user.id,
    token: storage.user.token
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    setSelectedConfig: (id) => dispatch({
      type: ActionList.ASSIGN_CONFIG,
      payload: id
    }),
    deleteConfig: (configId, userId, token) => dispatch({
      type: ActionList.DELETE_CONFIG,
      payload: {
        "config_id": configId,
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
)(ConfigurationDisplayCustomColumn)
