import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { GridCell } from "@progress/kendo-react-grid"

import { dialogOpen } from "../Dialog"
import ActionList from "../../reducer/actionList"

class ConfigurationDisplayCustomColumn extends GridCell {

  findConfig() {
    return this.props.configs.find(element => {
      return element.id === this.props.dataItem.id
    })
  }

  showConfirmationDialog() {
    this.props.setDialogMessage("Delete configuration \"" + this.props.dataItem.name + "\"?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.props.deleteConfig(this.props.dataItem.id, this.props.userId, this.props.token)
    })
    dialogOpen()
  }

  render() {
    return <td>
      <button
        className="k-button k-primary"
        onClick={() => this.props.setSelectedConfig(this.findConfig())}>
          EDIT
      </button>
      &nbsp;
      <button
        className="k-button k-primary"
        onClick={() => this.showConfirmationDialog()}>
          DELETE
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
