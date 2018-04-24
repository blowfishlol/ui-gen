import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import ConfigurationDisplay from "./homepage-content/ConfigurationDisplay"
import DescriptionDisplay from "./homepage-content/DescriptionDisplay"

import { HomeKey } from "../../util/constants"

class Homepage extends React.Component {

  render() {
    if(this.props.homeState === HomeKey.CONFIGURATION_MENU) {
      return <ConfigurationDisplay />
    } else {
      return <DescriptionDisplay />
    }
  }
}

const mapStateToProps = function(storage) {
  return {
    homeState: storage.nav.homepage_state
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
)(Homepage)
