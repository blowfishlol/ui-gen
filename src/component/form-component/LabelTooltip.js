import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Tooltip } from "@progress/kendo-popups-react-wrapper"
import Label from "./Label"

import { getElementRefs } from "../../util/formDataGet"
import { labelCheck } from "../../util/infoChecker"
import ActionList from "../../reducer/actionList"

class LabelTooltip extends React.Component{

	// constructor(props) {
	// 	super(props)
	// 	this.refCallback = this.refCallback.bind(this)
	// }

  // refCallback(element) {
		// if(element === null) {
		// 	return
		// }
		// if(element.props.label === "") {
		// 	return
		// }
		// let index = getElementRefs().findIndex(element => element.props.path === this.props.form.path + "/label")
  //   if(index === -1) {
		// 	console.debug(element)
		// 	this.props.addElement(element)
  //   }
  // }

	// componentWillUnmount() {
	// 	let index = getElementRefs().findIndex(element => element.props.path === this.props.form.path + "/label")
   //  if(index !== -1) {
	// 		this.props.removeElement(index)
   //  }
	// }

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
		addElement: (element) => dispatch({
      type: ActionList.ADD_ELEMENT_REF,
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
