import React from "react";
import '@progress/kendo-theme-material/dist/all.css';
import { labelCheck, defaultCheck, placeholderCheck } from '../util/InfoChecker';

export default class TextBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //label: this.props.config.label ? this.props.config.label : "Err: Label is empty.",
      label: labelCheck(this.props.config.label),
      required: this.props.config.required ? "required" : "",
      path: this.props.config.path,
      default_value: defaultCheck(this.props.config.value),
      placeholder: placeholderCheck(this.props.config.value),
      //default_value: this.props.config.value ? (this.props.config.value.hasOwnProperty("default") ? this.props.config.value.default : "") : "",
      //placeholder: this.props.config.value ? (this.props.config.value.hasOwnProperty("placeholder") ? this.props.config.value.placeholder : "" ) : "",
    };
  }

  render() {
    return <label className="k-form-field">
      <span>{this.state.label}</span>
      <input className="k-textbox" placeholder={this.state.placeholder} value={this.state.default_value} name={this.statepath}/>
    </label>
  }
}
