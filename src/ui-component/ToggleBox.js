import React from "react";
import '@progress/kendo-theme-material/dist/all.css';
import { labelCheck, requiredCheck } from '../util/InfoChecker';

export default class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      required: requiredCheck(this.props.config.required),
      path: this.props.config.path,
    }
  }

  render() {
    return <label className="k-form-field">
      <span>{this.state.label}</span>
      <div>
        <input type="checkbox" className="k-checkbox" name={this.state.path} id={this.state.path}/>
        <label className="k-checkbox-label" for={this.state.path}>&nbsp;&nbsp;&nbsp;Yes</label>
      </div>
    </label>
  }
}
