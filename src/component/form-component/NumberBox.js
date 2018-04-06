import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

// import { NumericTextBox } from "@progress/kendo-react-inputs"
import LabelTooltip from "./LabelTooltip"

import { placeholderCheck } from "../../util/InfoChecker"
import nullInfo from  "../../util/nullableInfo"
import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"

class NumberBox extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      value: get(this.props.form.path, this.props.form.type)
    }
  }

  render() {
    return <div className="k-form-field">
      <label>
        <LabelTooltip form={this.props.form} />
        <input
          type="number"
          className="k-textbox k-widget k-numberictextbox"
          placeholder={placeholderCheck(this.props.form.value)}
          value={this.state.value}
          onChange={evt => this.setState({value: evt.target.value})}
          onBlur={evt => this.props.updateState(this.props.form.path, evt.target.value, nullInfo(this.props.form))} />
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
)(NumberBox)
