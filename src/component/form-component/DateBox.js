import React from "react";

import { connect } from "react-redux";
import { compose } from "recompose";

import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import { labelCheck } from '../../util/InfoChecker';

import  ActionList  from "../../reducer/actionList"
import get from '../../util/formDataGet';

class DateBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.form.label),
      value: get(this.props.form.path, this.props.form.type),
      // required: this.props.form.required ? "required" : "",
    }
  }

  render() {
    return <div className="k-form-field ">
      <p>{this.state.label}</p>
      <DatePicker
        format={"dd MMMM yyyy"}
        value={get(this.props.form.path, this.props.form.type)}
        change={this.changeDate}
        id={this.props.form.path} />
    </div>
  }

  changeDate = event => {
    const date = event.sender.value();
    if(!date){
      alert("Not a proper date format. (MM/DD/YYYY)");
      return;
    }
    this.props.updateState(this.props.form.path, date);
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateState: (path, value) => dispatch({
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
)(DateBox)
