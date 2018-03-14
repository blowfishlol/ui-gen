import React from "react";

import { connect } from "react-redux";
import { compose } from "recompose";

import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import { labelCheck, defaultCheck } from '../util/InfoChecker';

import  ActionList  from "./../reducer/actionList"

class DateBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: this.props.config.required ? "required" : "",
      path: this.props.config.path,
      value: defaultCheck(this.props.config.value),
    }
  }

  render() {
    return <div className="k-form-field">
      <p>{this.state.label}</p>
      <DatePicker value={this.state.value} change={this.changeDate} />
    </div>
  }

  changeDate = (event) => {
    console.log(event.sender.value());
    const date = event.sender.value();
    if(!date){
      console.log("NOT A DATE",event);
      alert("Not a proper date format. (DD/MM/YYYY)");
      return;
    }
    //flipped the format so YYYY-MM-DD so programs could accept.
    const dateFixed = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    this.setState({
      ...this.state,
      value: date
    })
    this.props.updateState(this.state.path, dateFixed);
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateState: (path,value) => dispatch({
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
)(DateBox)
