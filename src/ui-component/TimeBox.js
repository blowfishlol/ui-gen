import React from "react";

import { connect } from "react-redux";
import { compose } from "recompose";
import  ActionList  from "./../reducer/actionList"

import { labelCheck, defaultCheck } from '../util/InfoChecker';
import { TimePicker } from '@progress/kendo-dateinputs-react-wrapper';

class TimeBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      required: this.props.config.required ? "required" : "",
      path: this.props.config.path,
      value: defaultCheck(this.props.config.value),
    }
  }

  render() {
    return <div className="k-form-field">
    <p>{this.state.label}</p>
    <TimePicker value={this.state.value}  dateInput={true} format={"HH:mm"}  change={(e) => this.handleChange(this.state.path, e)}/>
    </div>
  }

  handleChange(path,event) {
    console.log(path, event.sender.value());
    const date = event.sender.value();
    const time = date.getHours() + ":" + date.getMinutes();

    this.props.updateState(path,time);
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
)(TimeBox)
