import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { NumericTextBox } from '@progress/kendo-react-inputs';

import { labelCheck, placeholderCheck } from '../../util/InfoChecker';
import  ActionList  from "../../reducer/actionList"

import get from '../../util/formDataGet';

class NumberBox extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.form.label),
      // required: requiredCheck(this.props.form.required),
      placeholder: placeholderCheck(this.props.form.value),
    }
  }

  render() {
    return <div className="k-form-field">
      <label>
        <p>{this.props.form.label}</p>
        <NumericTextBox
          placeholder={this.state.placeholder}
          value={get(this.props.form.path, this.props.form.type)}
          onChange={evt => this.props.updateState(this.props.form.path, evt.target.value)}/>
      </label>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.form.notifier
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateState: (path, value) => dispatch({
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
)(NumberBox)
