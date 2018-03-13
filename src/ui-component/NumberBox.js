import React from "react";

import  ActionList  from "./../reducer/actionList"
import { connect } from "react-redux";
import { compose } from "recompose";

import '@progress/kendo-theme-material/dist/all.css';
import { labelCheck, defaultCheck, placeholderCheck, requiredCheck } from '../util/InfoChecker';
import { NumericTextBox } from '@progress/kendo-react-inputs';

class NumberBox extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      required: requiredCheck(this.props.config.required),
      path: this.props.config.path,
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
          value={this.state.default_value}
          name={this.state.path}
          onChange={(event) => this.changeNumber(event)}/>
      </label>
    </div>
  }

  changeNumber = (event) => {
    //console.log(event);
    this.props.updateState(this.state.path, event.value);
  }
}

const mapStateToProps = function(storage) {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateState: (path,value) =>
      dispatch({
        type: ActionList.SET,
        payload: {
          "path": path,
          "value": value,
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
