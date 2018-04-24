import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid"
import ConfigurationDisplayCustomColumn from "./ConfigurationTableOptionColumn"

class ConfigurationTable extends React.Component {

  render() {
    return <Grid data={this.props.configs} >
        <Column field="name" width="45%" title="Configuration Name" />
        <Column field="configContent.version" width="10%" title="Version" />
        <Column field="id" width="45%" title="Option" cell={ConfigurationDisplayCustomColumn} />
      </Grid>
  }
}

const mapStateToProps = function(storage) {
  return {
    configs: storage.config.configs,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfigurationTable)
