import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck } from '../../util/InfoChecker';
import  ActionList  from "../../reducer/actionList"

import get from '../../data-accessor/formDataGet';
import getLayoutString from '../../util/LayoutProcessor';

class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.form.label),
      values: get(this.props.form.path, this.props.form.type),
      contents: this.props.form.value.contents,
      layout: getLayoutString(this.props.form.layout),
    }
  }

  /**
  * Each checkbox have different path because they are differed by the value.
  * In render, the program automatically updates the state of the path into false, in case the user dont want to check because the actual value is false.
  * In previous case, if it is not checked then the state will not be stored. Now it stores false by default because update state is called initially.
  * The path for each checkbox is: checkboxpath.value where checkbox is the path stated in the config and value is the value in the config for ecah checkbox
  */
  render() {
    const checkboxes = this.state.contents.map(content => {
      const childPath = this.props.form.path + "." + content.value
      content.checked = get(childPath, "toggle")

      return <div key={childPath}>
        <input
          type="checkbox"
          className={"k-checkbox " + this.state.layout}
          id={childPath}
          defaultChecked={this.props.form.value.default === content.value}
          onClick={(event) => {
              this.props.updateState(childPath, event.target.checked)
            }
          }/>
        <label className="k-checkbox-label" htmlFor={childPath}>{content.text}</label>
      </div>
    });

    return <div className="k-form-field">
      <span>{this.state.label}</span>
      {checkboxes}
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateState: (path,value) => dispatch({
      type: ActionList.SET_DATA,
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
