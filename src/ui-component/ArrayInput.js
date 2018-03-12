import React from "react";
import '@progress/kendo-theme-material/dist/all.css';

import App from './App';

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
      return <div>
        Error: Config is missing
      </div>
    } else if(!this.props.config.hasOwnProperty("child_content")) {
      return <div>
        Error: Content is missing
      </div>
    } else if(!this.props.config.child_content.hasOwnProperty("type")) {
      return <div>
        Error: Content type is missing
      </div>
    }
    var elements = this.state.childData.map(element => {
      return <App config={[{...this.props.config, label: "", type:this.props.config.child_content.type}]} />
    });
    return(
      <div className="k-form">
        <label className="k-form-field">
          <span>{this.props.config.label}</span>
          {elements}
        </label>
        <button onClick={() => this.add()}>ADD</button>
      </div>
    )
  }
}
