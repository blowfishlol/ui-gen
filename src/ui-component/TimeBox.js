import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck, defaultCheck } from '../util/InfoChecker';
import { TimePicker } from '@progress/kendo-dateinputs-react-wrapper';

import  ActionList  from "./../reducer/actionList"

class TimeBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: this.props.config.required ? "required" : "",
    }
  }

  render() {
    return <div className="k-form-field">
    <p>{this.state.label}</p>
    <TimePicker
      value={defaultCheck(this.props.config.value)}
      dateInput={true}
      format={"HH:mm"}
      change={evt => this.props.updateState(this.props.config.path, this.timeFormat(evt))}/>
    </div>
  }

  timeFormat(evt) {
    return evt.sender.value().getHours() + ":" + evt.sender.value().getMinutes()
  }
}

const mapStateToProps = function(storage) {
  return {
    data: storage.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateState: (path, value) => dispatch({
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
)(TimeBox)
