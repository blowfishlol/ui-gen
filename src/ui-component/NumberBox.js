import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { NumericTextBox } from '@progress/kendo-react-inputs';

import { labelCheck, placeholderCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"

import get from '../util/get';

class NumberBox extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: requiredCheck(this.props.config.required),
      default_value: get(this.props.config.path, this.props.config.type),
      placeholder: placeholderCheck(this.props.config.value),
    }
  }

  render() {
    return <div className="k-form-field">
      <label>
        <p>{this.props.config.label}</p>
        <NumericTextBox
          placeholder={this.state.placeholder}
          default_value={this.state.default_value}
          onChange={(evt) => {console.log("s"); return this.props.updateState(this.props.config.path, evt.target.value)}}/>
      </label>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
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
)(NumberBox)
