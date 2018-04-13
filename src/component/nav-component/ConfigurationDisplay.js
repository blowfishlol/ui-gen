import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid"
import ConfigurationDisplayCustomColumn from "./ConfigurationDisplayCustomColumn"
import BlankSpace from "../BlankSpace"
import ErrorBox from "../ErrorBox"

import ActionList from "../../reducer/actionList"

class ConfigurationDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchConfigs(this.props.userId, this.props.token)
    this.props.fetchDescriptions(this.props.userId, this.props.token)
  }

  render() {
    const configTableHeader = <h1>Configurations</h1>
    if(this.props.errorMessage !== "") {
      return <div>
        {configTableHeader}
        <ErrorBox message={this.props.errorMessage} />
      </div>
    } else if(!this.props.isConfigFetched || !this.props.isDescriptionFetched || !this.props.isTemplateFetched) {
      return <div>
        {configTableHeader}
        <div className="col-sm-12 alert alert-info">
          Loading data
        </div>
      </div>
    }

    let configTable
    if(this.props.configs.length === 0) {
      configTable = <div className="col-sm-12 alert alert-warning">
        No saved configuration exist.
      </div>
    } else {
      configTable = <Grid data={this.props.configs} >
        <Column field="name" width="45%" title="Configuration Name" />
        <Column field="configContent.version" width="10%" title="Version" />
        <Column field="id" width="45%" title="Option" cell={ConfigurationDisplayCustomColumn} />
      </Grid>
    }
    return <div className="pageRoot">
      {configTableHeader}
      {configTable}
      <BlankSpace space="75px" />
      <div className="k-form-field navFooter">
        <button className="k-button k-primary" onClick={() => this.props.newConfig()}>NEW CONFIG</button>
        <button className="k-button" onClick={() => this.props.gotoImportConfigForm()}>IMPORT CONFIG</button>
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
    isConfigFetched: storage.config.fetched,
    isTemplateFetched: storage.template.fetched,
    isDescriptionFetched: storage.description.fetched,
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
    newConfig: () => dispatch({
      type: ActionList.ADD_NEW_CONFIG
    }),
    gotoImportConfigForm: () => dispatch({
      type: ActionList.ON_GOTO_IMPORT_CONFIG
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfigurationDisplay);
