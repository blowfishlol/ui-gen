import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

/**
 * [TEMPLATE]
 * Usage: ctrl-a, ctrl-c, ctrl-v
 */

export default class ComponentTemplate extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  render() {
	  return <p>Hello World!</p>
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
)(ComponentTemplate)
