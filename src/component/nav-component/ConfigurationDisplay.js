import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import ConfigurationDisplayCustomColumn from "./ConfigurationDisplayCustomColumn"
import BlankSpace from "../form-component/BlankSpace"
import ErrorBox from "../form-component/ErrorBox"

import ActionList from "../../reducer/actionList"

class ConfigurationDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchConfigs(this.props.userId, this.props.token)
    this.props.fetchDescriptions()
  }

  defaultConfig() {
    return {
      name: "New Configuration",
      version: 1,
      configContents: {"installation":{"user":{"name":"timothy","accept":true},"mode":"express","statisfied":true},"root":[]}
    }
  }

  render() {
    var configTable = <Grid data={this.props.configs} >
      <Column field="name" width="50%" title="Cofiguration Name" />
      <Column field="configContents.version" width="15%" title="Version" />
      <Column field="id" width="35%" title="Option" cell={ConfigurationDisplayCustomColumn} />
    </Grid>
    if(this.props.configs.length === 0) {
      configTable = <div className="col-sm-12 alert alert-warning">
        No saved configuration exist.
      </div>
    } else if(this.props.errorMessage !== "") {
      return <div>
        <h1>Configurations</h1>
        <ErrorBox message={this.props.errorMessage} />
      </div>
    }
    return <div>
      <div className="row configDisplayHeader">
        <h1 className="col-sm-10">Configurations</h1>
        <button className="k-button col-sm-2" onClick={() => this.props.logout()}>LOGOUT</button>
      </div>
      {configTable}
      <BlankSpace space="75px" />
      <div className="k-form-field navFooter">
        <button className="k-button k-primary" onClick={() => this.props.setSelectedConfig(this.defaultConfig())}>NEW CONFIG</button>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    userId: storage.user.id,
    username: storage.user.username,
    token: storage.user.token,
    configs: storage.config.configs,
    descriptions: storage.description.descriptions,
    errorMessage: storage.nav.error_message
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    fetchConfigs: (id, token) => dispatch({
      type: ActionList.FETCH_CONFIGS,
      payload: {
        "id": id,
        "token": token
      }
    }),
    fetchDescriptions: () => dispatch({
      type: ActionList.FETCH_DESCRIPTIONS
    }),
    setSelectedConfig: (config) => dispatch({
      type: ActionList.ASSIGN_CONFIG,
      payload: config
    }),
    logout: () => dispatch({
      type: ActionList.ON_LOGOUT
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfigurationDisplay);
