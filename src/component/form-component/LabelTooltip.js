import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Tooltip } from "@progress/kendo-popups-react-wrapper"
import Label from "./Label"

import { getElementRefs } from "../../util/formDataGet"
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
		let index = getElementRefs().findIndex(element => element.props.path === this.props.form.path + "/label")
    if(index === -1) {
			this.props.addElement(element)
    }
  }

	componentWillUnmount() {
		let index = getElementRefs().findIndex(element => element.props.path === this.props.form.path + "/label")
    if(index !== -1) {
			this.props.removeElement(index)
    }
	}

  render() {
		if(this.props.form.tooltip) {
		  return <Tooltip content={this.props.form.tooltip} position={"asd ngasal"}>
		    <Label ref={this.refCallback} label={labelCheck(this.props.form.label)} path={this.props.form.path + "/label"}/>
		  </Tooltip>
		} else {
		  return <Label ref={this.refCallback} label={labelCheck(this.props.form.label)} path={this.props.form.path + "/label"}/>
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
    }),
		removeElement: (index) => dispatch({
      type: ActionList.REMOVE_ELEMENT_REF,
      payload: index
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(LabelTooltip)
