import React from "react";

import { connect } from "react-redux";
import { compose } from "recompose";
import { DateInput, Calendar } from '@progress/kendo-react-dateinputs';
import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper'
import { labelCheck, defaultCheck, placeholderCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"

class DateBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      required: this.props.config.required ? "required" : "",
      path: this.props.config.path,
      value: defaultCheck(this.props.config.value),
    }
  }


  render() {
    return <div className="k-form-field">
      <p>{this.state.label}</p>
      <DatePicker value={this.state.value} onChange={this.changeDate} />
    </div>
  }


  changeDate = ({ value }) => {
    this.setState({ value });
  }
}

const mapStateToProps = function(storage) {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  console.log("whew",dispatch);
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
)(DateBox)
