import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import Header from "./Header"
import LoginPage from "./LoginPage"
import ConfigurationDisplay from "./ConfigurationDisplay"
import FormSelector from "./FormSelector"
import BlankSpace from "../form-component/BlankSpace"
import ErrorBox from "../form-component/ErrorBox"

import { NavKey } from "../../reducer/actionList"

class Navigator extends React.Component {

  render() {
    switch(this.props.location) {
      case NavKey.LOGIN_PAGE:         return <LoginPage />
      case NavKey.CONFIGURATION_MENU: return <div>
                                        <Header />
                                        <BlankSpace space="75px" />
                                        <ConfigurationDisplay />
                                      </div>
      case NavKey.FORM_PAGE:          return <div>
                                        <Header />
                                        <BlankSpace space="75px" />
                                        <FormSelector />
                                      </div>
      default:                        return <ErrorBox message="Invalid Page" />
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
