import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

// import { Input } from "@progress/kendo-react-inputs"
import ErrorBox from "../ErrorBox"

import ActionList from "../../reducer/actionList"

class LoginPage extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      username: "blowfish",
      password: "yeah"
    }
  }

  render() {
    if(this.props.errorMessage !== "") {
      var error = <ErrorBox message={this.props.errorMessage} />
    }
    return <div className="row pageRoot">
      <div className="col-md-3 col-sm-3 col-xs-12" />
      <div className="k-form col-md-6 col-sm-6 col-xs-12">
        <div className="row loginFormStyle">
          <div className="col-sm-12">
            <center><h1><b> LOGIN </b></h1></center>
          </div>

          <label className="k-form-field col-sm-12">
            <span>Username</span>
            <input
              className={"k-textbox"}
              placeholder={"Username"}
              value={this.state.username}
              onChange={evt => this.updateUsername(evt)} />
          </label>
          <label className="k-form-field col-sm-12">
            <span>Password</span>
            <input
              type="password"
              className={"k-textbox"}
              placeholder={"Password"}
              value={this.state.password}
              onChange={evt => this.updatePassword(evt)} />
          </label>

          <div className="col-sm-12">
            {error}
          </div>

          <div className="col-sm-12">
            <button className="k-button k-primary" onClick={() => this.props.login(this.state)}> LOGIN </button>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-3 col-xs-12" />
    </div>
  }

  updateUsername(evt) {
    this.setState({
      username: evt.target.value
    })
  }

  updatePassword(evt) {
    this.setState({
      password: evt.target.value
    })
  }
}

const mapStateToProps = function(storage) {
  return {
    errorMessage: storage.nav.error_message
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    login: (user) => dispatch({
      type: ActionList.ON_LOGIN,
      payload: user
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage)
