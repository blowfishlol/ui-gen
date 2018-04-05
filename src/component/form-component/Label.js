import React from "react"

export default class Label extends React.Component{

  constructor(props) {
    super(props)
    this.variableboongan = "lol"
  }

  render() {
	  return <span>{this.props.label}</span>
  }
}
