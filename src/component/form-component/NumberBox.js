import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { NumericTextBox } from "@progress/kendo-react-inputs"

import { labelCheck, placeholderCheck } from "../../util/InfoChecker"
import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"

class NumberBox extends React.Component{

  render() {
    return <div className="k-form-field">
      <label>
        <span>{labelCheck(this.props.form.label)}</span>
        <NumericTextBox
          placeholder={placeholderCheck(this.props.form.value)}
          value={get(this.props.form.path, this.props.form.type)}
          onChange={evt => this.props.updateState(this.props.form.path, evt.target.value)}/>
      </label>
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
    updateState: (path, value) => dispatch({
      type: ActionList.SET_DATA,
      payload: {
        "path": path,
        "value": value
      }
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(NumberBox)
