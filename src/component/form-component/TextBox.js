import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import LabelTooltip from "./LabelTooltip"

import { placeholderCheck } from "../../util/infoChecker"
import { nullInfo } from "../../util/infoChecker"
import get from "../../util/formDataGet"
import ActionList  from "../../reducer/actionList"

class TextBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: get(this.props.form.path, this.props.form.type)
    }
  }

  render() {
    return <label className="k-form-field">
     <LabelTooltip form={this.props.form} />
      <input
        className={"k-textbox"}
        placeholder={placeholderCheck(this.props.form.value)}
        value={this.state.value}
        onChange={evt => this.setState({value: evt.target.value})}
        onBlur={evt => this.props.updateState(this.props.form.path, evt.target.value, nullInfo(this.props.form))} />
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
)(TextBox)
