import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import '@progress/kendo-theme-material/dist/all.css';
import { labelCheck, requiredCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"

class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      required: requiredCheck(this.props.config.required),
      path: this.props.config.path,
      contents: this.props.config.value.contents,
    }
  }

  render() {
    //Path for each checkbox is: path of object + value of each checkbox
      const checkboxes = this.state.contents.map(content => {
        this.props.updateState(this.state.path+"."+content.value, false);
        return (
          <div>
            <input type="checkbox" className="k-checkbox" name={this.state.path} id={content.value} value={content.value} onClick={(e) => this.handleChange(this.state.path+"."+content.value,e)}/>
            <label className="k-checkbox-label" htmlFor={content.value}>&nbsp;&nbsp;&nbsp;{content.text}</label>
          </div>
        )
    });
    return <label className="k-form-field">
      <span>{this.state.label}</span>
      {checkboxes}
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
)(CheckBox)
