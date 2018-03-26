import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import ConfigurationDisplayCustomColumn from "./ConfigurationDisplayCustomColumn"

import ActionList, { NavKey } from "../../reducer/actionList"

class ConfigurationDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.props.setConfig(this.getConfig())
  }

  getConfig() {
    return [
      {
        id: 1,
        name: "Old Configuration",
        version: 1,
        data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
      },
      {
        id: 2,
        name: "Older Configuration",
        version: 1,
        data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
      }
    ]
  }

  defaultConfig() {
    return {
      name: "New Configuration",
      version: 1,
      data: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
    }
  }

  render() {
    return <div>
      <h1>Configurations</h1>
      <Grid style={{ maxHeight: '400px' }} data={this.props.configs} >
        <Column field="name" title="Cofiguration Name" />
        <Column field="version" title="Version" />
        <Column field="id" title="Option" cell={ConfigurationDisplayCustomColumn} />
      </Grid>
      <button className="k-button k-primary" onClick={() => this.onNewConfigBtnClicked()}>NEW CONFIG</button>
    </div>
  }

  onNewConfigBtnClicked() {
    this.props.setSelectedConfig(this.defaultConfig())
    this.props.gotoForm()
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
)(ConfigurationDisplay);
