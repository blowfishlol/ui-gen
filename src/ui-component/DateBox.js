import React from "react";

import { connect } from "react-redux";
import { compose } from "recompose";

import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import { labelCheck, defaultCheck } from '../util/InfoChecker';

import  ActionList  from "./../reducer/actionList"
import get from '../util/get';

class DateBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: this.props.config.required ? "required" : "",
    }
  }

  render() {
    return <div className="k-form-field">
      <p>{this.state.label}</p>
      <DatePicker
        format={"dd MMMM yyyy"}
        value={defaultCheck(this.props.config.value)}
        change={this.changeDate} />
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
