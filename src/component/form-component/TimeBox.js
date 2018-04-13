import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { TimePicker } from "@progress/kendo-dateinputs-react-wrapper"
import LabelTooltip from "./LabelTooltip"

import get from "../../util/formDataGet"
import { nullInfo } from "../../util/infoChecker"
import ActionList  from "../../reducer/actionList"

class TimeBox extends React.Component {

  timeFormat(evt) {
    if(evt.sender.value === null) {
      return null
    }
    return evt.sender.value().getHours() + ":" + evt.sender.value().getMinutes()
  }

  render() {
    return <div className="k-form-field">
      <LabelTooltip desc={this.props.desc} />
      <TimePicker
        value={get(this.props.path, this.props.desc.element.type)}
        dateInput={true}
        format={"HH:mm"}
        change={evt => this.props.updateState(this.props.path, this.timeFormat(evt), nullInfo(this.props.desc.element))}/>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.form.notifier
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateState: (path, value, nullable) => dispatch({
      type: ActionList.SET_DATA,
      payload: {
        "path": path,
        "value": value,
        "nullable": nullable
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
