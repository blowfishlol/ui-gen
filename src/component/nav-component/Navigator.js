import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import LoginPage from "./LoginPage"
import ConfigurationDisplay from "./ConfigurationDisplay"
import FormSelector from "./FormSelector"

import { NavKey } from "../../reducer/actionList"

class Navigator extends React.Component {

  render() {
    switch(this.props.location) {
      case NavKey.LOGIN_PAGE:         return <LoginPage />
      case NavKey.CONFIGURATION_MENU: return <ConfigurationDisplay />
      case NavKey.FORM_PAGE:          return <FormSelector />
      default:                        return <p>default</p>
    }
  }
}

const mapStateToProps = function(storage) {
  return {
    location: storage.nav.location
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
)(Navigator);
