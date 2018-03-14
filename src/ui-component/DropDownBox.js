import React from "react";
// import { DateInput, Calendar } from '@progress/kendo-react-dateinputs';

import  ActionList  from "./../reducer/actionList"
import { connect } from "react-redux";
import { compose } from "recompose";

import { labelCheck, requiredCheck } from '../util/InfoChecker';
import { DropDownList } from '@progress/kendo-react-dropdowns';

class DropDownBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      required: requiredCheck(this.props.config.required),
      path: this.props.config.path,
      values: this.props.config.value.contents,
      selected: this.props.config.value.default,//TODO: JANGAN LUPA GANTI YAA!!!!!!!!
    }
  }

  render() {
    return <div className="k-form-field">
      <div>{this.props.config.label}</div>
      <DropDownList data={this.state.values} textField={'text'} valueField={'value'} onChange={(event) => this.changeValue(event)}/>
    </div>
  }

  changeValue = (event) => {
    //console.log(event.target.value);
    this.props.updateState(this.state.path, event.target.value);
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
)(DropDownBox)
