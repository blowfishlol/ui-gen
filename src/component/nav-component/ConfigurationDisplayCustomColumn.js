import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { GridCell } from "@progress/kendo-react-grid"

import fileDownload from "js-file-download"
import { dialogOpen } from "../Dialog"
import ActionList from "../../reducer/actionList"

class ConfigurationDisplayCustomColumn extends GridCell {

  findConfig() {
    return this.props.configs.find(element => {
      return element.id === this.props.dataItem.id
    })
  }

  onDeleteBtnClickedListener() {
    /**
     * Open a confirmation dialog
     * before proceeding to delete existing configuration
     **/
    this.props.setDialogMessage("Delete configuration \"" + this.props.dataItem.name + "\"?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.props.deleteConfig(this.props.dataItem.id, this.props.userId, this.props.token)
    })
    dialogOpen()
  }

  onEditBtnClickedListener() {
    this.props.allowJump()
    this.props.setSelectedConfig(this.findConfig())
  }

  render() {
    return <td>
      <button
        className="k-button k-primary"
        onClick={() => this.onEditBtnClickedListener()}>
          EDIT
      </button>
      &nbsp;
      <button
        className="k-button k-primary"
        onClick={() => this.onDeleteBtnClickedListener()}>
          DELETE
      </button>
      &nbsp;
      <button
        className="k-button k-primary"
        onClick={() => fileDownload(JSON.stringify(this.findConfig().configContent.data), this.findConfig().name + ".json")}>
          EXPORT
      </button>
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
    allowJump: () => dispatch({
      type: ActionList.ALLOW_JUMP
    }),
    setSelectedConfig: (config) => dispatch({
      type: ActionList.ASSIGN_CONFIG,
      payload: config
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
