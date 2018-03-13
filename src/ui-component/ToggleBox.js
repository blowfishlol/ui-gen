import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import '@progress/kendo-theme-material/dist/all.css';
import { labelCheck, requiredCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"

class ToggleBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      required: requiredCheck(this.props.config.required),
      path: this.props.config.path,
    }
  }

  render() {
    this.props.updateState(this.state.path, false);
    return <label className="k-form-field">
      <span>{this.state.label}</span>
      <div>
        <input type="checkbox" className="k-checkbox" name={this.state.path} id={this.state.path} onClick={(e) => this.handleChange(this.state.path,e)}/>
        <label className="k-checkbox-label" for={this.state.path}>&nbsp;&nbsp;&nbsp;Yes</label>
      </div>
    </label>
  }

  handleChange(path,event) {
    this.props.updateState(path,event.target.checked);
  }
}

const mapStateToProps = function(storage) {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateState: (path,value) =>
      dispatch({
        type: ActionList.SET,
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
)(ToggleBox)
