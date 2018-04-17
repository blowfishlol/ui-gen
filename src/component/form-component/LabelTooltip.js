import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Tooltip } from "@progress/kendo-popups-react-wrapper"
import Label from "./Label"

import { labelCheck } from "../../util/infoChecker"

class LabelTooltip extends React.Component{

  render() {
    if(this.props.desc.label === "") {
      return <div />
    }
	  let label = <Label label={labelCheck(this.props.desc.label)} />
		if(this.props.desc.info && this.props.desc.info !== "") {
		  return <Tooltip content={this.props.desc.info} position={""}>
        {label}
		  </Tooltip>
		} else {
      return <div>{label}</div>
		}
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(LabelTooltip)
