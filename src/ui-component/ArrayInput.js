import React from "react";

import '@progress/kendo-theme-material/dist/all.css';

import App from './App';
import ErrorBox from './ErrorBox';

export default class ArrayInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childData: ["uneeded data for now"]
    };
  }

  add() {
    this.setState({
      ...this.state,
      childData: this.state.childData.concat(["uneeded data for now"])
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
      return <App
        key={this.props.config.path + "." + index}
        config={[
          {
            label: "",
            type: this.props.config.child_content.type,
            path: this.props.config.path + "." + index
          }
        ]} />
    });

    return <label>
      <span>{this.props.config.label}</span>
      {elements}
      <button onClick={() => this.add()}>ADD</button>
    </label>
  }
}
