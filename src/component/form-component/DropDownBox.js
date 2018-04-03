import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DropDownList } from "@progress/kendo-react-dropdowns"

import { labelCheck } from "../../util/InfoChecker"
import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"

class DropDownBox extends React.Component {

  render() {
    return <div className="k-form-field ">
      <div>{labelCheck(this.props.form.label)}</div>
      <DropDownList
        data={this.props.form.value.contents}
        textField={"text"}
        valueField={"value"}
        value={get(this.props.form.path, this.props.form.type)}
        onChange={(evt) => this.props.updateState(this.props.form.path, evt.target.value)} />
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
    updateState: (path,value) => dispatch({
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
)(DropDownBox)
