import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import Header from "./Header"
import LoginPage from "./LoginPage"
import ConfigurationDisplay from "./ConfigurationDisplay"
import FormSelector from "./FormSelector"
import ImportConfigForm from "./ImportConfigForm"
import BlankSpace from "../BlankSpace"
import ErrorBox from "../ErrorBox"

import { NavKey } from "../../reducer/actionList"

class Navigator extends React.Component {

  render() {
    if(this.props.location === NavKey.LOGIN_PAGE) {
      return <LoginPage />
    } else if(this.props.location === NavKey.CONFIGURATION_MENU) {
      return <div>
        <Header />
        <BlankSpace space="75px" />
        <ConfigurationDisplay />
      </div>
    } else if(this.props.location === NavKey.FORM_PAGE) {
      return <div>
        <Header />
        <BlankSpace space="75px" />
        <FormSelector />
      </div>
    } else if(this.props.location === NavKey.IMPORT_CONFIG_PAGE) {
      return <div>
        <Header />
        <BlankSpace space="75px" />
        <ImportConfigForm />
      </div>
    } else {
      return <ErrorBox message="Invalid Page" />
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
)(Navigator)
