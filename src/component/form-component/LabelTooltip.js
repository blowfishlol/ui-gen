import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Tooltip } from "@progress/kendo-popups-react-wrapper"
import Label from "./Label"

import { labelCheck } from "../../util/InfoChecker"
import ActionList from "../../reducer/actionList"

class LabelTooltip extends React.Component{

	constructor(props) {
		super(props)
		this.refCallback = this.refCallback.bind(this)
	}

	refCallback(element) {
		if(element === null) {
			return
		}
		if(element.props.label === "") {
			return
		}
		this.props.addElement(element)
  }

  render() {
		if(this.props.form.tooltip) {
		  return <Tooltip content={this.props.form.tooltip} position={"asd ngasal"}>
		    <Label ref={this.refCallback} label={labelCheck(this.props.form.label)} />
		  </Tooltip>
		} else {
		  return <Label ref={this.refCallback} label={labelCheck(this.props.form.label)} />
		}
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		addElement: (element) => dispatch({
      type: ActionList.ADD_ELELEMENT_REF,
      payload: element
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(LabelTooltip)
