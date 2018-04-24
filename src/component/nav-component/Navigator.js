import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import Header from "./Header"
import LoginPage from "./LoginPage"
import Homepage from "./Homepage"
import FormSelector from "./FormSelector"
import ImportConfigForm from "./ImportConfigForm"
import NewDescriptionContentForm from "./NewDescriptionContentForm"
import NewTemplateForm from "./NewTemplateForm"
import BlankSpace from "../BlankSpace"
import ErrorBox from "../ErrorBox"

import { NavKey } from "../../util/constants"

class Navigator extends React.Component {

  render() {
    let body
    switch(this.props.location) {
      case NavKey.LOGIN_PAGE:            body = <LoginPage />;                 break
      case NavKey.HOME_PAGE:             body = <Homepage />;                  break
      case NavKey.FORM_PAGE:             body = <FormSelector />;              break
      case NavKey.IMPORT_CONFIG_PAGE:    body = <ImportConfigForm />;          break
      case NavKey.NEW_DESC_CONTENT_PAGE: body = <NewDescriptionContentForm />; break
      case NavKey.NEW_TEMPLATE_PAGE:     body = <NewTemplateForm />;           break
      default: body = <ErrorBox message="Invalid Page" />
    }
    return <div>
      <Header />
      <BlankSpace space="75px" />
      {body}
    </div>
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
