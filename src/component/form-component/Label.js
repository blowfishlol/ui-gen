import React from "react"

/**
 * Intended to be a smart component
 * used to properly return the component reference in props at LabelTooltip
 */
export default class Label extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      variable_ampas: 101
    }
  }

  render() {
	  return <span>{this.props.label}</span>
  }
}
