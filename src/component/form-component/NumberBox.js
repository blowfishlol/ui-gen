import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { NumericTextBox } from '@progress/kendo-react-inputs';

import { labelCheck, placeholderCheck } from '../../util/InfoChecker';
import  ActionList  from "../../reducer/actionList"

import get from '../../data-accessor/formDataGet';

class NumberBox extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.form.label),
      // required: requiredCheck(this.props.form.required),
      default_value: get(this.props.form.path, this.props.form.type),
      placeholder: placeholderCheck(this.props.form.value),
    }
  }

  render() {
    return <div className="k-form-field">
      <label>
        <p>{this.props.form.label}</p>
        <NumericTextBox
          placeholder={this.state.placeholder}
          defaultValue={this.state.default_value}
          onChange={(evt) => {return this.props.updateState(this.props.form.path, evt.target.value)}}/>
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
      type: ActionList.SET_DATA,
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
