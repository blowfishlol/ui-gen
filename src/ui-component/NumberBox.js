import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import '@progress/kendo-theme-material/dist/all.css';

import { NumericTextBox } from '@progress/kendo-react-inputs';

import { labelCheck, defaultCheck, placeholderCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"

class NumberBox extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: requiredCheck(this.props.config.required),
      default_value: isNaN(defaultCheck(this.props.config.value)) ? 0 : this.props.config.value,
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
