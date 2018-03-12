import React, { Component } from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import './App.css'

import TextBox from './TextBox';
import DateBox from './DateBox';
import DropDownBox from './DropDownBox';
import ToggleBox from './ToggleBox';
import NumberBox from './NumberBox';
import CheckBox from './CheckBox';
import MapInput from './MapInput';
import ArrayInput from './ArrayInput';

import ComponentType from "../util/ComponentType"

class App extends Component {
  render() {
    var elements = this.props.config.map(element => {
      if(!element.hasOwnProperty("type")) {
        return <div>
          Invalid config file format &quot;{element}&quot;<br />
          type is missing
        </div>
      } else if(element.type === ComponentType.TEXT) {
        return <div className="k-form">
          <TextBox config={element}></TextBox>
        </div>
      } else if(element.type === ComponentType.NUMBER) {
        console.log(element);
        return <div>
          <NumberBox config={element}></NumberBox>
        </div>
      } else if(element.type === ComponentType.IMAGE) {
        return <div>
          image
        </div>
      } else if(element.type === ComponentType.DROPDOWN) {
        return <div>
          <DropDownBox config={element}></DropDownBox>
        </div>
      } else if(element.type === ComponentType.CHECKBOX) {
        return <div>
          <CheckBox config={element}></CheckBox>
        </div>
      } else if(element.type === ComponentType.TOGGLE) {
        return <div className="k-form">
          <ToggleBox config={element}></ToggleBox>
        </div>
      } else if(element.type === ComponentType.DATE) {
        return <div>
          <DateBox config={element}></DateBox>
        </div>
      } else if(element.type === ComponentType.TIME) {
        return <div>
          time
        </div>
      } else if(element.type === ComponentType.ARRAY) {
        var newConfig = [{...element, type: element.child_content.type}];
        return <div>
          <ArrayInput config={element}>
            <App config={newConfig} />
          </ArrayInput>
        </div>
      } else if(element.type === ComponentType.MAP) {
        console.log(element);
        return <div>
          <MapInput config={element} />
        </div>
      } else {
        return <div>
          Unrecognized config type &quot;{element.type}&quot;
        </div>
      }
    })

    if(elements.length === 0) {
      elements = "Form is empty";
    }

    return (
      <div>
        {elements}
      </div>
    );
  }
}

export default App;
