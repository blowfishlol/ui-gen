import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import ActionList from "../../reducer/actionList"

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    return <div className="k-form">
      <div className="col-sm-12">
        <span><h1><b> LOGIN </b></h1></span>
      </div>

      <label className="k-form-field">
        <span>Username</span>
        <input
          className={"k-textbox"}
          placeholder={"Username"}
          value={this.state.username}
          onChange={evt => this.updateUsername(evt)} />
      </label>
      <label className="k-form-field">
        <span>Password</span>
        <input
          className={"k-textbox"}
          placeholder={"Password"}
          value={this.state.password}
          onChange={evt => this.updatePassword(evt)} />
      </label>

      <div className="col-sm-12">
        <button className="k-button k-primary" onClick={() => this.props.login(this.state)}> LOGIN </button>
      </div>
    </div>
  }

  updateUsername(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  updatePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    login: (user) => dispatch({
      type: ActionList.ON_LOGIN,
      payload: user
    }),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage);
