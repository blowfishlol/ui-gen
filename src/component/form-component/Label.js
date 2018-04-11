import React from "react"

/**
 * Intended to be a smart component
 * used to properly return the component reference in props at LabelTooltip
 */
export default class Label extends React.Component{
  render() {
	  return <span>{this.props.label}</span>
  }
}
