import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { GridCell } from '@progress/kendo-react-grid';

import ActionList, { NavKey } from "../../reducer/actionList"

class ConfigurationDisplayCustomColumn extends GridCell {
  render() {
    console.log(this.props)
    return <td>
      <button className="k-button k-primary">EDIT</button>&nbsp;
      <button className="k-button k-primary">DELETE</button>
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
    gotoForm: () => dispatch({
      type: ActionList.CHANGE_LOCATION,
      payload: {
        location: NavKey.FORM_PAGE
      }
    }),
    setConfig: (config) => dispatch({
      type: ActionList.SET_CONFIGS,
      payload: config
    }),
    setSelectedConfig: (config) => dispatch({
      type: ActionList.ASSIGN_CONFIG,
      payload: config
    }),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfigurationDisplayCustomColumn);
