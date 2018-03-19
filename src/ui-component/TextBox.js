import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck, placeholderCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"
import get from '../util/get';
import getLayoutString from '../util/LayoutProcessor'

class TextBox extends React.Component {

  constructor(props) {
    super(props);

    /**
     * get the value inside the "result object" so when backtrack can get the value again.
     **/
     //console.log("CALLING GET FUNTCION FOR TEXTBOX",get(this.props.config.path, this.props.config.type));
    this.state = {
      label: labelCheck(this.props.config.label),
      default_value: get(this.props.config.path, this.props.config.type),
      placeholder: placeholderCheck(this.props.config.value),
      layout: getLayoutString(this.props.config.layout),
    };
  }

  render() {
    console.log(this.state.layout);
    return <label className={"k-form-field" + this.state.layout}>
      <span>{this.state.label}</span>
      <input
        className={"k-textbox"}
        placeholder={this.state.placeholder}
        defaultValue={this.state.default_value}
        onChange={evt => this.props.updateState(this.props.config.path, evt.target.value)} />
    </label>
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
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
