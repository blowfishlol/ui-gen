import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";

import App from './ui-component/App';

import evaluator from "./util/evaluator"
import { fetchAllData } from "./util/get"
import ActionList from "./reducer/actionList"

class PageNavigator extends Component {

  getLastAppState() {
    return this.props.appState[this.props.appState.length - 1]
  }

  getCurrentPage() {
    return this.props.page[this.getLastAppState().index]
  }

  render() {
    const current = this.getCurrentPage()
    const prevBtn = this.props.appState.length > 1 ? <button className="k-button" onClick={() => this.prevButtonListener()}>PREV</button> : ""
    const navBar = this.props.appState.map((state, index) => {
      if(index === this.props.appState.length - 1) {
        return <button key={index} className="k-button k-primary" disabled={true}>{this.props.page[state.index].pagename}</button>
      } else {
        return <button key={index} className="k-button" onClick={() => this.jumpButtonListener(index)}>{this.props.page[state.index].pagename}</button>
      }
    })
    return <div>
      {navBar}
      <h1>{current.pagename}</h1>
      <App config={current.config} />
      <div className="k-form-field">
        {prevBtn}
        <button className="k-button k-primary" onClick={() => this.nextButtonListener()}>NEXT</button>
      </div>
    </div>
  }

  jumpButtonListener(index) {
    this.props.popState(index)
  }

  prevButtonListener() {
    this.props.popState(this.props.appState.length - 2)
  }

  /**
   * [MOTI]
   * temporary method to show the final output data generated by the app
   * flush all data stored in app state into a pop up dialog
   */
  generateJSON() {
    alert(JSON.stringify(fetchAllData()));
  }

  nextButtonListener() {
    for(var i = this.getLastAppState().index + 1; i < this.props.page.length; i++) {
      if(evaluator(this.props.page[i].rendered)) {
        this.props.pushState(i)
        return
      }
    }
    this.generateJSON()
  }
}

const mapStateToProps = function(storage) {
  return {
    appState: storage.app_state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushState: (index) => dispatch({
      type: ActionList.PUSH_STACK,
      payload: {
        "index": index
      }
    }),
    popState: (index) => dispatch({
      type: ActionList.POP_STACK,
      payload: {
        "index": index
      }
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(PageNavigator)
