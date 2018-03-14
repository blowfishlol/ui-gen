import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"

class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: requiredCheck(this.props.config.required),
      contents: this.props.config.value.contents,
    }
  }

  render() {
    const checkboxes = this.state.contents.map(content => {
      const childPath = this.props.config.path + "." + content.value
      this.props.updateState(childPath, false)

      return <div key={childPath}>
        <input
          type="checkbox"
          className="k-checkbox"
          id={content.value}
          value={content.value}
          onClick={(evt) => this.props.updateState(childPath, evt.target.checked)}/>
        <label className="k-checkbox-label" htmlFor={content.value}>{content.text}</label>
      </div>
    });

    return <label className="k-form-field">
      <span>{this.state.label}</span>
      {checkboxes}
    </label>
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
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
)(CheckBox)
