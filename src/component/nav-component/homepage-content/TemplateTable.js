import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Grid, GridColumn as Column, GridDetailRow } from "@progress/kendo-react-grid"

import TemplateToolColumn from "./TemplateTableOptionColumn"

class TemplateDisplay extends GridDetailRow {

  render() {
    if(this.props.dataItem.templates.length === 0) {
      return <div className="alert alert-info"><center>No template available</center></div>
    }
    return <Grid data={this.props.dataItem.templates} >
      <Column field="name" width="35%" title="Template Name" />
      <Column field="id" width="65%" title="Option" cell={TemplateToolColumn} />
    </Grid>
  }
}

const mapStateToProps = function(storage) {
  return {
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
)(TemplateDisplay)
