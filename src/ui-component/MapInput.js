import React from "react";
import '@progress/kendo-theme-material/dist/all.css';

import App from './App';
import ErrorBox from './ErrorBox';

export default class MapInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childData: ["this data is just a filler"]
    };
  }

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
      <button onClick={() => this.add()}>ADD</button>
    </label>
  }
}
