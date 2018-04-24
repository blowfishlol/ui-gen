import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import ConfigurationTable from "./ConfigurationTable"
import BlankSpace from "../../BlankSpace"
import ErrorBox from "../../ErrorBox"

import ActionList from "../../../reducer/actionList"

class ConfigurationDisplay extends React.Component {

  render() {
    let body
    if(this.props.errorMessage !== "") {
      body = <ErrorBox message={this.props.errorMessage} />
    } else if(!this.props.isConfigFetched || !this.props.isDescriptionFetched) {
      body = <div className="col-sm-12 alert alert-info">Loading data</div>
    } else {
      body = <ConfigurationTable/>
    }

    return <div className="page-root">
      <h1>Configurations</h1>
      {body}
      <BlankSpace space="50px"/>
      <div className="k-form-field page-footer footer-bg-style">
        <button className="k-button k-primary float-right" onClick={() => this.props.newConfig()}>NEW CONFIG</button>
        <button className="k-button float-right" onClick={() => this.props.gotoImportConfigForm()}>IMPORT CONFIG</button>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    isConfigFetched: storage.config.fetched,
    isDescriptionFetched: storage.description.fetched,
    errorMessage: storage.nav.error_message
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    newConfig: () => dispatch({
      type: ActionList.ADD_NEW_CONFIG
    }),
    gotoImportConfigForm: () => dispatch({
      type: ActionList.GO_TO_IMPORT_CONFIG
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfigurationDisplay)
