import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import "../../style/Header.css"
import logo from "../../file-empty-icon.png"

import { Button } from "@progress/kendo-react-buttons"
import { ToolBar } from "@progress/kendo-buttons-react-wrapper"

import { windowClose } from "../Window"
import ActionList from "../../reducer/actionList"
import {NavKey, Role} from "../../util/constants"

const CONFIG      = 1
const DESCRIPTION = 2
const LOGOUT      = 3

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.toolbarItems = [{ template: "<label>&nbsp;</label>" }]
    if(this.props.isUser) {
      this.toolbarItems = this.toolbarItems.concat({
        type: "button",
        text: "Config",
        id: CONFIG,
        overflow: "always"
      })
    }
    if(this.props.isAdmin) {
      this.toolbarItems = this.toolbarItems.concat({
        type: "button",
        text: "Description",
        id: DESCRIPTION,
        overflow: "always"
      })
    }
    this.toolbarItems = this.toolbarItems.concat({
      type: "button",
      text: "Log Out",
      id: LOGOUT,
      overflow: "always"
    })
  }

  onToolBarItemClicked(evt) {
    switch(evt.id) {
      case CONFIG:      this.props.toConfig(); break
      case DESCRIPTION: this.props.toDesc();   break
      case LOGOUT:      this.props.logout();   break
      default:          break
    }
  }

  render() {
    if(this.props.location === NavKey.LOGIN_PAGE) {
      return <div />
    }
    return <div>
      {/*Header for small screen and up*/}
      <div className="d-none d-sm-block">
        <div className="row menu-bar">
          <div className="col-auto">
            <div className="row">
              <div className="col-auto"><img src={logo} onClick={() => this.props.home()} alt="logo" width="40" height="40"/></div>
              <div className="col wide-bar-padding"><h4><b>UI-GENERATOR</b></h4></div>
            </div>
          </div>
          <div className="col">
            {/*Button sets for medium screen and up*/}
            <div className="d-none d-md-block">
              <span className="float-right wide-bar-padding">
                {
                  this.props.isUser ?
                  <Button primary={true} icon="gear" look="bare" onClick={() => this.props.toConfig()}>
                    &nbsp;Config
                  </Button> : ""
                }
                {
                  this.props.isAdmin ?
                  <Button primary={true} icon="page-properties" look="bare" onClick={() => this.props.toDesc()}>
                    &nbsp;Description
                  </Button> : ""
                }
                <Button primary={true} icon="user" look="bare" disabled={true}>&nbsp;{this.props.username}</Button>
                <Button primary={true} icon="logout" look="bare" onClick={() => this.props.logout()}>&nbsp;Log Out</Button>
              </span>
            </div>

            {/*Button sets for small screen*/}
            <div className="d-none d-sm-block d-md-none">
              <span className="float-right wide-bar-padding">
              {
                this.props.isUser ?
                  <Button primary={true} icon="gear" look="bare" onClick={() => this.props.toConfig()} /> : ""
              }
              {
                this.props.isAdmin ?
                  <Button primary={true} icon="page-properties" look="bare" onClick={() => this.props.toDesc()} /> : ""
              }
              <Button primary={true} icon="user" look="bare" disabled={true}>&nbsp;{this.props.username}</Button>
              <Button primary={true} icon="logout" look="bare" onClick={() => this.props.logout()}/>
            </span>
            </div>
          </div>
        </div>
      </div>

      {/*Header for extra small screen*/}
      <div className="d-block d-sm-none">
        <div className="row menu-bar">
          <div className="col-3"><img src={logo} onClick={() => this.props.home()} alt="logo" width="40" height="40"/></div>
          <div className="col-9">
            <div className="row no-gutters">
              <div className="col user-bar">
                <span className="float-right">&nbsp;{this.props.username}</span>
                <span className="k-icon k-i-user float-right"/>
              </div>
              <div className="col-3"><ToolBar items={this.toolbarItems} click={evt => this.onToolBarItemClicked(evt)}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    location: storage.nav.location,
    username: storage.user.username,
    isAdmin: !!storage.user.roles.find(role => role === Role.ADMIN),
    isUser: !!storage.user.roles.find(role => role === Role.USER)
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    home: () => {
      windowClose()
      dispatch({
        type: ActionList.GO_TO_HOMEPAGE
      })
    },
    toConfig: () => dispatch({
      type: ActionList.GO_TO_CONFIG_LIST
    }),
    toDesc: () => dispatch({
      type: ActionList.GO_TO_DESC_LIST
    }),
    logout: () => {
      windowClose()
      dispatch({
        type: ActionList.ON_LOGOUT
      })
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header)
