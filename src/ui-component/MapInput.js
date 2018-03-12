import React from "react";
import '@progress/kendo-theme-material/dist/all.css';

import App from './App';

export default class MapInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemCount: 1
    };
  }

  add() {
    this.setState({
      itemCount: (this.state.itemCount + 1)
    });
  }

  render() {
    var childKagebunshin = [];
    for(var i = 0; i < this.state.itemCount; i++) {
      childKagebunshin[i] = this.props.config.child_content;
    }
    var elements = childKagebunshin.map(element => {
      return <App config={this.props.config.child_content} />
    });
    return(
      <div>
        <div>
          {elements}
        </div>
        <button onClick={() => this.add()}>ADD</button>
      </div>
    )
  }
}
