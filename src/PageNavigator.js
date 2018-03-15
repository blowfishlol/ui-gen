import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";

import App from './ui-component/App';

import ActionList from "./reducer/actionList"

class PageNavigator extends Component {
  render() {
    return <p>hello</p>
    // return <App config={this.props.config} />
  }
}

const mapStateToProps = function(storage) {
  return {
    app_state: storage.app_state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateState: (path, value) => dispatch({
      type: ActionList.SET,
      payload: {
        "path": path,
        "value": value
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
