import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid'
import ConfigurationDisplayCustomColumn from "./ConfigurationDisplayCustomColumn"
import BlankSpace from "../form-component/BlankSpace"
import ErrorBox from "../form-component/ErrorBox"

import ActionList from "../../reducer/actionList"

class ConfigurationDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchConfigs(this.props.userId, this.props.token)
    this.props.fetchDescriptions(this.props.userId, this.props.token)
  }

  render() {
    const configTableHeader = <h1 className="col-sm-10 configDisplayHeader">Configurations</h1>
    if(this.props.errorMessage !== "") {
      return <div>
        {configTableHeader}
        <ErrorBox message={this.props.errorMessage} />
      </div>
    }

    var configTable
    if(this.props.configs.length === 0) {
      configTable = <div className="col-sm-12 alert alert-warning">
        No saved configuration exist.
      </div>
    } else {
      configTable = <Grid data={this.props.configs} >
        <Column field="name" width="50%" title="Cofiguration Name" />
        <Column field="configContent.version" width="15%" title="Version" />
        <Column field="id" width="35%" title="Option" cell={ConfigurationDisplayCustomColumn} />
      </Grid>
    }
    return <div>
      {configTableHeader}
        {configTable}
      <BlankSpace space="75px" />
      <div className="k-form-field navFooter">
        <button className="k-button k-primary" onClick={() => this.props.setSelectedConfig(this.props.default_config)}>NEW CONFIG</button>
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
    default_config: storage.config.default_config,
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
    fetchDescriptions: (id, token) => dispatch({
      type: ActionList.FETCH_DESCRIPTIONS,
      payload: {
        "id": id,
        "token": token
      }
    }),
    setSelectedConfig: (config) => dispatch({
      type: ActionList.ASSIGN_CONFIG,
      payload: config
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfigurationDisplay);
