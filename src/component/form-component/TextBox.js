import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck, placeholderCheck } from '../../util/InfoChecker';
import  ActionList  from "../../reducer/actionList"
import get from '../../data-accessor/formDataGet';

class TextBox extends React.Component {

  constructor(props) {
    super(props);

    /**
     * get the value inside the "result object" so when backtrack can get the value again.
     **/
    this.state = {
      label: labelCheck(this.props.form.label),
      placeholder: placeholderCheck(this.props.form.value)
    }
  }

  render() {
    console.log("re render!", get(this.props.form.path, this.props.form.type))
    return <label className="k-form-field">
      <span>{this.state.label}</span>
      <input
        className={"k-textbox"}
        placeholder={this.state.placeholder}
        value={get(this.props.form.path, this.props.form.type)}
        onChange={evt => this.props.updateState(this.props.form.path, evt.target.value)} />
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
