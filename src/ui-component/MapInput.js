import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import App from './App';
import ErrorBox from './ErrorBox';
import get from '../util/get'
import getLayoutString from '../util/LayoutProcessor';

class MapInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childData: Array(Object.keys(get(this.props.config.path, this.props.config.type)).length).fill("this data is just a filler"),
      layout: getLayoutString(this.props.config.layout)
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
      var isEvenChild = this.props.hasOwnProperty("evenChild") ? (this.props.evenChild ? false : true) : true
      return <div key={this.props.config.path + "." + index} className="mapChild">
        <App config={childElement} evenChild={isEvenChild}/>
      </div>
    });

    var style = this.props.hasOwnProperty("evenChild") ? (this.props.evenChild ? "k-form formHighlight2" : "k-form formHighlight1") : "k-form formHighlight1"
    return <div className="k-form-field">
      <span>{this.props.config.label}</span>
      <div className={style}>
        {elements}
      </div>
      <button className="k-button k-primary" onClick={() => this.add()}>ADD</button>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(MapInput)
