import React from "react";
import '@progress/kendo-theme-material/dist/all.css';

import App from './App';

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
    var elements = this.state.childData.map(element => {
      return <App config={this.props.config.child_content} />
    });
    return(
      <div>
        <label className="k-form-field">
          <span>{this.props.config.label}</span>
          {elements}
        </label>
        <button onClick={() => this.add()}>ADD</button>
      </div>
    )
  }
}
