import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DropDownList } from "@progress/kendo-react-dropdowns"
import LabelTooltip from "./LabelTooltip"

import get from "../../util/formDataGet"
import { nullInfo } from "../../util/infoChecker"
import ActionList  from "../../reducer/actionList"

class DropDownBox extends React.Component {

  render() {
    return <div className="k-form-field ">
      <LabelTooltip desc={this.props.desc} />
      <DropDownList
        data={this.props.desc.element.value.contents}
        textField={"text"}
        valueField={"value"}
        value={get(this.props.path, this.props.desc.element.type)}
        onChange={(evt) => this.props.updateState(this.props.path, evt.target.value, nullInfo(this.props.desc.element))} />
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
)(DropDownBox)
