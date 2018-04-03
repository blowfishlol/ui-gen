import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { TimePicker } from "@progress/kendo-dateinputs-react-wrapper"

import { labelCheck } from "../../util/InfoChecker"
import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"

class TimeBox extends React.Component {

  render() {
    return <div className="k-form-field">
      <span>{labelCheck(this.props.form.label)}</span>
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
    notifier: storage.form.notifier
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
