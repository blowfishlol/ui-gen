import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { GridCell } from '@progress/kendo-react-grid';

import ActionList from "../../reducer/actionList"

class ConfigurationDisplayCustomColumn extends GridCell {

  findConfig() {
    return this.props.configs.find(element => {
      return element.id === this.props.dataItem.id
    })
  }

  render() {
    return <td>
      <button className="k-button k-primary" onClick={() => this.props.setSelectedConfig(this.findConfig())}>EDIT</button>&nbsp;
      <button className="k-button k-primary" onClick={() => this.props.deleteConfig(this.props.dataItem.id)}>DELETE</button>
    </td>
  }
}

const mapStateToProps = function(storage) {
  return {
    configs: storage.config.configs
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    setSelectedConfig: (config) => dispatch({
      type: ActionList.ASSIGN_CONFIG,
      payload: config
    }),
    deleteConfig: (id) => dispatch({
      type: ActionList.DELETE_CONFIG,
      payload: {
        "id": id
      }
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfigurationDisplayCustomColumn);
