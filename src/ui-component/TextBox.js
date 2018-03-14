import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import  ActionList  from "./../reducer/actionList"
import '@progress/kendo-theme-material/dist/all.css';
import { labelCheck, defaultCheck, placeholderCheck } from '../util/InfoChecker';

class TextBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      path: this.props.config.path,
      default_value: defaultCheck(this.props.config.value),
      placeholder: placeholderCheck(this.props.config.value)
    };
  }

  render() {
    console.log(this.props.config.path)
    return <label className="k-form-field">
      <span>{this.state.label}</span>
      <input
        className="k-textbox"
        placeholder={this.state.placeholder}
        value={this.state.default_value}
        name={this.statepath}
        onChange={(evt) => this.handleChange(this.state.path, evt)} />
    </label>
  }

  handleChange(path, event) {
    this.props.updateState(path, event.target.value);
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateState: (path,value) => dispatch({
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
)(TextBox)
