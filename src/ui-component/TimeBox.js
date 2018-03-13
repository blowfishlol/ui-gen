import React from "react";
import { labelCheck, defaultCheck } from '../util/InfoChecker';
import { TimePicker } from '@progress/kendo-dateinputs-react-wrapper';

export default class TimeBox extends React.Component {

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
      <TimePicker value={this.state.value}  dateInput={true} format={"HH:mm"}/>
    </div>
  }
}
