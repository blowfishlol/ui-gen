import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { TimePicker } from '@progress/kendo-dateinputs-react-wrapper';

import { labelCheck } from '../../util/InfoChecker';
import  ActionList  from "../../reducer/actionList"
import get from '../../util/formDataGet';

class TimeBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.form.label),
      // required: this.props.form.required ? "required" : "",
    }
  }

  render() {
    return <div className="k-form-field">
      <p>{this.state.label}</p>
      <TimePicker
        value={get(this.props.form.path, this.props.form.type)}
        dateInput={true}
        format={"HH:mm"}
        change={evt => this.props.updateState(this.props.form.path, this.timeFormat(evt))}/>
    </div>
  }

  timeFormat(evt) {
    return evt.sender.value().getHours() + ":" + evt.sender.value().getMinutes()
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateState: (path, value) => dispatch({
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
)(TimeBox)
