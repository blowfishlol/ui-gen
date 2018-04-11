import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DatePicker } from "@progress/kendo-dateinputs-react-wrapper"
import LabelTooltip from "./LabelTooltip"

import get from "../../util/formDataGet"
import { nullInfo } from "../../util/infoChecker"
import ActionList  from "../../reducer/actionList"

class DateBox extends React.Component {

  onDateChangedListener(event) {
    const date = event.sender.value()
    if(!date){
      alert("Not a proper date format. (DD MONTH YYYY)")
    }
    this.props.updateState(this.props.form.path, date, nullInfo(this.props.form))
  }

  render() {
    return <div className="k-form-field ">
      <LabelTooltip form={this.props.form} />
      <DatePicker
        format={"dd MMMM yyyy"}
        value={get(this.props.form.path, this.props.form.type)}
        change={() => this.onDateChangedListener}
        id={this.props.form.path} />
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
)(DateBox)
