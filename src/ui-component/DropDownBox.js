import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { DropDownList } from '@progress/kendo-react-dropdowns';

import { labelCheck } from '../util/InfoChecker';
import  ActionList  from "./../reducer/actionList"
import get from '../util/get';

class DropDownBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: labelCheck(this.props.config.label),
      // required: requiredCheck(this.props.config.required),
      values: this.props.config.value.contents,
      selected: get(this.props.config.path, this.props.config.type),//TODO: JANGAN LUPA GANTI YAA!!!!!!!!
    }
  }

  render() {
    console.log("SELECTED",this.state.selected);
    return <div className="k-form-field">
      <div>{this.state.label}</div>
      <DropDownList
        data={this.state.values}
        textField={'text'}
        valueField={'value'}
        value={this.state.selected}
        onChange={(evt) => {
          this.setState({
            ...this.state,
            selected: evt.target.value,
          })
          this.props.updateState(this.props.config.path, evt.target.value)
          }
        }/>
    </div>
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
)(DropDownBox)
