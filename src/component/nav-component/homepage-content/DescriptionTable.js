import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid"
import DescriptionDisplayToolColumn from "./DescriptionTableOptionColumn"
import DescVersionDisplay from "./DescVersionTable"

class DescriptionDisplay extends React.Component {

  onGridExpanded(evt) {
    evt.dataItem.isExpanded = !evt.dataItem.isExpanded
    this.forceUpdate()
  }

  render() {
    return <Grid
      data={this.props.descriptions}
      detail={DescVersionDisplay}
      expandField="isExpanded"
      expandChange={evt => this.onGridExpanded(evt)}>
      <Column field="name" width="35%" title="Description Name" />
      <Column field="id" width="65%" title="Option" cell={DescriptionDisplayToolColumn} />
    </Grid>
  }
}

const mapStateToProps = function(storage) {
  return {
    userId: storage.user.id,
    token: storage.user.token,
    descriptions: storage.description.descriptions
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
)(DescriptionDisplay)
