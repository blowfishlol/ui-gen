import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DatePicker } from "@progress/kendo-dateinputs-react-wrapper"

import { generateLabel } from "./LabelTooltipGenerator"
import { labelCheck } from "../../util/InfoChecker"
import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"

class DateBox extends React.Component {

  render() {
    return <div className="k-form-field ">
    {generateLabel(this.props.form)}
      <DatePicker
        format={"dd MMMM yyyy"}
        value={get(this.props.form.path, this.props.form.type)}
        change={this.changeDate}
        id={this.props.form.path} />
    </div>
  }

  changeDate = event => {
    const date = event.sender.value()
    if(!date){
      alert("Not a proper date format. (MM/DD/YYYY)")
      return
    }
    this.props.updateState(this.props.form.path, date)
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
)(DateBox)
