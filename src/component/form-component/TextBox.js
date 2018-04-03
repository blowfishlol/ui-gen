import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { labelCheck, placeholderCheck } from "../../util/InfoChecker"
import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"

class TextBox extends React.Component {

  render() {
    return <label className="k-form-field">
      <span>{labelCheck(this.props.form.label)}</span>
      <input
        className={"k-textbox"}
        placeholder={placeholderCheck(this.props.form.value)}
        value={get(this.props.form.path, this.props.form.type)}
        onChange={evt => this.props.updateState(this.props.form.path, evt.target.value)} />
    </label>
  }

  handleChange(path, val){
      this.setState({
          ...this.state,
          default_value: val,
      })
      this.props.updateState(path,val)
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.form.notifier
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
)(TextBox)
