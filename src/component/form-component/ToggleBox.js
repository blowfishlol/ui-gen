import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck } from '../../util/InfoChecker';
import get from '../../util/formDataGet';
import  ActionList  from "../../reducer/actionList"

class ToggleBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.form.label),
      // required: requiredCheck(this.props.form.required),
    }
  }

  render() {
    return <label className="k-form-field ">
      <span>{this.state.label}</span>
      <div>
        <input
          type="checkbox"
          className="k-checkbox"
          name={this.props.form.path}
          defaultChecked={get(this.props.form.path, this.props.form.type)}
          id={this.props.form.path}
          onClick={evt => this.props.updateState(this.props.form.path, evt.target.checked)} />
        <label className="k-checkbox-label" htmlFor={this.props.form.path}>Yes</label>
      </div>
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
      type: ActionList.SET_DATA,
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
)(ToggleBox)
