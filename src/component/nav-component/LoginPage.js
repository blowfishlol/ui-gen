import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import ErrorBox from "../ErrorBox"
import BlankSpace from "../BlankSpace"

import ActionList from "../../reducer/actionList"

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "demoadmin",
      password: "demo"
    }
  }

  onUsernameChangedListener(evt) {
    this.setState({
      username: evt.target.value
    })
  }

  onPasswordChangedListener(evt) {
    this.setState({
      password: evt.target.value
    })
  }

  render() {
    if(this.props.errorMessage !== "") {
      var error = <ErrorBox message={this.props.errorMessage} />
    }
    return <div className="row page-root">
      <div className="col-md-3 col-sm-3 col-xs-12" />
      <div className="k-form col-md-6 col-sm-6 col-xs-12">
        <BlankSpace space="35px"/>
        <div className="row side-margin">
          <div className="col-sm-12">
            <center><h1><b> LOGIN </b></h1></center>
          </div>

          <label className="k-form-field col-sm-12">
            <span>Username</span>
            <input
              className={"k-textbox"}
              placeholder={"Username"}
              value={this.state.username}
              onChange={evt => this.onUsernameChangedListener(evt)} />
          </label>
          <label className="k-form-field col-sm-12">
            <span>Password</span>
            <input
              type="password"
              className={"k-textbox"}
              placeholder={"Password"}
              value={this.state.password}
              onChange={evt => this.onPasswordChangedListener(evt)} />
          </label>

          <div className="col-sm-12">
            <BlankSpace space="15px"/>
            {error}
          </div>
          <div className="col-sm-12">
            <button className="k-button k-primary float-right" onClick={() => this.props.login(this.state)}> LOGIN </button>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-3 col-xs-12" />
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    errorMessage: storage.nav.error_message
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    login: (user) => {
      if(user.username === "sponge" && user.password === "bob") {
        easterEgg()
        return
      }
      dispatch({
        type: ActionList.ON_LOGIN,
        payload: user
      })
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage)


function easterEgg() {
  alert("THINGS THAT ATTRACT A SEA BEAR ATTACK!")
  alert("Playing the clarinet badly (They might hate the sound or it upsets them.)")
  alert("Waving a flashlight around (It's their natural prey.)")
  alert("eating or holding cubed cheese or possibly cheese in general (Perhaps they hate it or the smell might set it off.)")
  alert("Stomping around (They take it as a challenge.)")
  alert("Wearing a hoop skirt (It might disgust them.)")
  alert("Wearing clown shoes (Ridiculous.)")
  alert("Wearing a sombrero in a goofy fashion (Offensive, perhaps.)")
  alert("Screeching like a chimpanzee (It may mimic the sound of a dying animal to them.)")
  alert("Running from a Sea Bear (It might show cowardness.)")
  alert("Limping from a Sea Bear (It might also show cowardness.)")
  alert("Crawling away from a Sea Bear (This ALSO might show cowardness)")
  alert("Drawing ovals in the Dirt (Dirt ovals can't protect against sea bears.)")
}