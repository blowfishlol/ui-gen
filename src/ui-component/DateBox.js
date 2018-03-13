import React from "react";
import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import { labelCheck, defaultCheck } from '../util/InfoChecker';

export default class DateBox extends React.Component {

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
      <DatePicker value={this.state.value} onChange={this.changeDate} />
    </div>
  }

  changeDate = ({ value }) => {
    this.setState({ value });
  }
}
