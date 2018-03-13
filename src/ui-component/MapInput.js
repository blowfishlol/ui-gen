import React from "react";
import '@progress/kendo-theme-material/dist/all.css';

import App from './App';
import ErrorBox from './ErrorBox';

export default class MapInput extends React.Component {

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
    }
    var elements = this.state.childData.map(element => {
      return <div class="mapChild">
        <App config={this.props.config.child_content} />
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
