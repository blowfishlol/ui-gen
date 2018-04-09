import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import $ from "jquery"

import { windowClose } from "../Window"

import "../../style/Header.css"

import ActionList, { NavKey } from "../../reducer/actionList"

class Header extends React.Component {

  render() {
    return <div>
      <div className="wide">
        <div className="row menuBar">
          <div className="col-sm-6">
            {
              this.props.location === NavKey.FORM_PAGE || this.props.location === NavKey.IMPORT_CONFIG_PAGE ?
              <button className="k-button k-primary col-sm-2" onClick={() => this.props.back()}>Back</button> :
              ""
            }
          </div>
          <div className="col-sm-6 userDisplay">
            <button className="k-button col-sm-2" onClick={() => this.props.logout()}>LOGOUT</button>
            <label>{this.props.username}</label>
          </div>
        </div>
      </div>

      <div className="narrow">
        <div className="row menuBar">
          <table>
            <tbody>
              <tr>
                <td>
                  {
                    this.props.location === NavKey.FORM_PAGE || this.props.location === NavKey.IMPORT_CONFIG_PAGE ?
                    <button className="k-button k-primary" onClick={() => this.props.back()}>Back</button> :
                    ""
                  }
                </td>
                <td align="right" className="userDisplay">
                  <label>{this.props.username}</label>
                </td>
                <td className="shrinkToFit" align="right">
                  <button className="k-button" onClick={() => this.props.logout()}>LOGOUT</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    username: storage.user.username,
    location: storage.nav.location
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    back: () => {
      windowClose();
      dispatch({type: ActionList.ON_BACK_PRESSED_CONFIG})
    },
    logout: () => dispatch({
      type: ActionList.ON_LOGOUT
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header);
