import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Grid, GridColumn as Column, GridDetailRow } from "@progress/kendo-react-grid"
import DescVersionDisplayToolColumn from "./DescVesionTableOptionColumn"
import TemplateDisplay from "./TemplateTable"

class DescVersionDisplay extends GridDetailRow {

  onGridExpanded(evt) {
    evt.dataItem.isExpanded = !evt.dataItem.isExpanded
    this.forceUpdate()
  }

  render() {
    if(this.props.dataItem.descriptionContents.length === 0) {
      return <div className="alert alert-info"><center>No version available</center></div>
    }
    return <Grid
      data={this.props.dataItem.descriptionContents}
      detail={TemplateDisplay}
      expandField="isExpanded"
      expandChange={evt => this.onGridExpanded(evt)} >
        <Column field="version" width="35%" title="Description Version" />
        <Column field="id" width="65%" title="Option" cell={DescVersionDisplayToolColumn} />
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
)(DescVersionDisplay)
