import React from "react";

import App from './App';
import ErrorBox from './ErrorBox';

import { connect } from "react-redux";
import { compose } from "recompose";
import  ActionList  from "./../reducer/actionList"

class MapInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childData: ["this data is just a filler"]
    };
  }

  /**
   * [MOTI]
   * the data inside array does not matter
   * class only see the array length
   * used to repliate same component in render
   */
  add() {
    this.setState({
      ...this.state,
      childData: this.state.childData.concat(["just to replicate child"])
    });
  }

  /**
   * [MOTI]
   * TODO
   * modify this clone function with a better way to clone an object
   */
  clone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  render() {
    if(!this.props.hasOwnProperty("config")) {
      return <ErrorBox message="Config is missing" />
    } else if(!this.props.config.hasOwnProperty("child_content")) {
      return <ErrorBox message="Content is missing" />
    }

    var elements = this.state.childData.map((element, index) => {
      const childElement = this.clone(this.props.config.child_content)
      for(var i = 0; i < childElement.length; i++) {
        childElement[i].path = this.props.config.path + "." + index + "." + childElement[i].path
      }
      return <div key={this.props.config.path + "." + index} className="mapChild">
        <App config={childElement} />
      </div>
    });

    return <label className="k-form-field">
      <span>{this.props.config.label}</span>
      <div className="k-form">
        {elements}
      </div>
      <button className="k-button k-primary" onClick={() => this.add()}>ADD</button>
    </label>
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
)(MapInput)
