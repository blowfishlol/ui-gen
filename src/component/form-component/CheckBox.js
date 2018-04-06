import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import LabelTooltip from "./LabelTooltip"

import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"

class CheckBox extends React.Component {

  /**
  * Each checkbox have different path because they are differed by the value.
  * In render, the program automatically updates the state of the path into false,
  * in case the user dont want to check because the actual value is false.
  *
  * In previous case, if it is not checked then the state will not be stored.
  * Now it stores false by default because update state is called initially.
  *
  * The path for each checkbox is:
  *  checkboxpath.value: where checkbox is the path stated in the config
  *  value: is the value in the config for ecah checkbox
  */
  render() {
    const checkboxes = this.props.form.value.contents.map(content => {
      const childPath = this.props.form.path + "." + content.value
      content.checked = get(childPath, "toggle")

      return <div key={childPath}>
        <input
          type="checkbox"
          className="k-checkbox"
          id={childPath}
          defaultChecked={content.checked}
          onClick={(event) => this.props.updateState(childPath, event.target.checked)} />
        <label className="k-checkbox-label" htmlFor={childPath}>{content.text}</label>
      </div>
    })

    return <div className="k-form-field">
      <LabelTooltip form={this.props.form} />
      {checkboxes}
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
)(CheckBox)
