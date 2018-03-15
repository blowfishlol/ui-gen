import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"

import get from '../util/get';

class ToggleBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: requiredCheck(this.props.config.required),
    }

    this.props.updateState(this.props.config.path, false);
  }

  render() {
    return <label className="k-form-field">
      <span>{this.state.label}</span>
      <div>
        <input
          type="checkbox"
          className="k-checkbox"
          name={this.props.config.path}
          id={this.props.config.path}
          onClick={evt => this.props.updateState(this.props.config.path, evt.target.checked)} />
        <label className="k-checkbox-label" htmlFor={this.props.config.path}>Yes</label>
      </div>
    </label>
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateState: (path,value) => dispatch({
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
)(ToggleBox)
