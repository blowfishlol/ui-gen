import React, { Component } from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import './App.css'
import TextBox from './ui-component/textbox';

import ComponentType from "./ComponentType"

class App extends Component {
  render() {
    var elements = this.props.config.map(element => {
      if(element.type == ComponentType.TEXT) {
        return <div className="k-form">
          <TextBox config={element}></TextBox>
        </div>
      } else if(element.type === ComponentType.NUMBER) {
        return <div>
          number
        </div>
      } else if(element.type === ComponentType.IMAGE) {
        return <div>
          image
        </div>
      } else if(element.type === ComponentType.DROPDOWN) {
        return <div>
          dropdown
        </div>
      } else if(element.type === ComponentType.CHECKBOX) {
        return <div>
          checkbox
        </div>
      } else if(element.type === ComponentType.TOGGLE) {
        return <div>
          toggle
        </div>
      } else if(element.type === ComponentType.DATE) {
        return <div>
          date
        </div>
      } else if(element.type == ComponentType.TIME) {
        return <div>
          time
        </div>
      } else if(element.type === ComponentType.ARRAY) {
        return <div>
          array
        </div>
      } else if(element.type === ComponentType.MAP) {
        console.log(element);
        return <div>
          <App config={element.child_content} />
        </div>
      } else {
        return <div>
          error
        </div>
      }
    })

    return (
      <div>
        {elements}
      </div>
    );
  }
}

export default App;
