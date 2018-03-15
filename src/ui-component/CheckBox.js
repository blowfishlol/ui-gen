import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"

import get from '../util/get';

class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: requiredCheck(this.props.config.required),
      contents: this.props.config.value.contents,
    }
  }

  /**
  * Each checkbox have different path because they are differed by the value.
  * In render, the program automatically updates the state of the path into false, in case the user dont want to check because the actual value is false.
  * In previous case, if it is not checked then the state will not be stored. Now it stores false by default because update state is called initially.
  */
  render() {

      const checkboxes = this.state.contents.map(content => {
          const childPath = this.props.config.path + "." + content.value
          content.checked = get(childPath, "toggle")
          return <div key={childPath}>
            <input
              type="checkbox"
              className="k-checkbox"
              id={content.value}
              value={content.value}
              checked={content.checked}
              onClick={(event) => this.props.updateState(childPath, event.target.checked)}/>
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
