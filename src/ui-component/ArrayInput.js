import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import App from './App';
import ErrorBox from './ErrorBox';

import get from '../util/get';

class ArrayInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childData: Array(get(this.props.config.path, this.props.config.type).length).fill("this data is just a filler")
    };
  }

  add() {
    /**
     * [MOTI]
     * the data inside array does not matter
     * class only see the array length
     * used to repliate same component in render
     */
    this.setState({
      ...this.state,
      childData: this.state.childData.concat(["just to replicate child"])
    });
  }

  render() {
    if(!this.props.hasOwnProperty("config")) {
      return <ErrorBox message="Config is missing" />
    } else if(!this.props.config.hasOwnProperty("child_content")) {
      return <ErrorBox message="Content is missing" />
    } else if(!this.props.config.child_content.hasOwnProperty("type")) {
      return <ErrorBox message="Content type is missing" />
    }

    var elements = this.state.childData.map((element, index) => {
      return <div key={this.props.config.path + "." + index}>
        <App
          config={[{
              label: "",
              type: this.props.config.child_content.type,
              path: this.props.config.path + "." + index
            }]} />
      </div>
    });

    return <label>
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
  return {
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(ArrayInput)
