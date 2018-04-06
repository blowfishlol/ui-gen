import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Switch } from "@progress/kendo-inputs-react-wrapper"
import LabelTooltip from "./LabelTooltip"

import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"

class ToggleBox extends React.Component {

  render() {
    return <label className="k-form-field ">
      <LabelTooltip form={this.props.form} />
      <Switch
        checked={get(this.props.form.path, this.props.form.type)}
        offLabel="No"
        onLabel="Yes"
        change={evt => this.props.updateState(this.props.form.path, evt.checked)}/>
    </label>
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.form.notifier
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
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
)(ToggleBox)
