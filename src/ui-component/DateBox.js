import React from "react";

import { connect } from "react-redux";
import { compose } from "recompose";

import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import { labelCheck } from '../util/InfoChecker';

import  ActionList  from "./../reducer/actionList"
import get from '../util/get';
import getLayoutString from '../util/LayoutProcessor';

class DateBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      value: get(this.props.config.path, this.props.config.type),
      layout: getLayoutString(this.props.config.layout),
      // required: this.props.config.required ? "required" : "",
    }
  }

  render() {
    return <div className={"k-form-field " + this.state.layout}>
      <p>{this.state.label}</p>
      <DatePicker
        format={"dd MMMM yyyy"}
        value={this.state.value}
        change={this.changeDate}
        id={this.props.config.path} />
    </div>
  }

  changeDate = event => {
    const date = event.sender.value();
    if(!date){
      alert("Not a proper date format. (MM/DD/YYYY)");
      return;
    }
    this.props.updateState(this.props.config.path, date);
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateState: (path, value) => dispatch({
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
