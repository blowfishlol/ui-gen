import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Switch } from "@progress/kendo-inputs-react-wrapper"
import LabelTooltip from "./LabelTooltip"

import get from "../../util/formDataGet"
import ActionList  from "../../reducer/actionList"

class ToggleBox extends React.Component {

  render() {
    return <label className="k-form-field ">
      <LabelTooltip desc={this.props.desc} />
      <Switch
        checked={get(this.props.path, this.props.desc.element.type)}
        offLabel="No"
        onLabel="Yes"
        change={evt => this.props.updateState(this.props.path, evt.checked)}/>
    </label>
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
)(ToggleBox)
