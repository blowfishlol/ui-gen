import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck, defaultCheck, placeholderCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"


class TextBox extends React.Component {

  constructor(props) {
    super(props);
    //this.props.updateState();
    console.log(this.props.info);
    this.state = {
      label: labelCheck(this.props.config.label),
      default_value: defaultCheck(this.props.config.value),
      placeholder: placeholderCheck(this.props.config.value)
    };
  }

  render() {
    return <label className="k-form-field">
      <span>{this.state.label}</span>
      <input
        className="k-textbox"
        placeholder={this.state.placeholder}
        default_value={this.state.default_value}
        onChange={evt => this.props.updateState(this.props.config.path, evt.target.value)} />
    </label>
  }
}

const mapStateToProps = function(storage) {
  console.log("masuk mapstatetoprops nih", storage);
  return {
      info: storage.data
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log("masuk DISPATCH TO PROPS  nih");
  return {
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
)(TextBox)
