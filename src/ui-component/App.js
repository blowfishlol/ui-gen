import React, { Component } from 'react';
import '@progress/kendo-theme-material/dist/all.css';
// import './App.css'

import TextBox from './TextBox';
import DateBox from './DateBox';
import DropDownBox from './DropDownBox';
import ToggleBox from './ToggleBox';
import NumberBox from './NumberBox';
import UploadBox from './UploadBox';
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
      }

      switch(element.type) {
        case ComponentType.TEXT:     return <TextBox config={element} />
        case ComponentType.NUMBER:   return <NumberBox config={element} />
        case ComponentType.IMAGE:    return <UploadBox config={element} />
        case ComponentType.DROPDOWN: return <DropDownBox config={element} />
        case ComponentType.CHECKBOX: return <CheckBox config={element} />
        case ComponentType.TOGGLE:   return <ToggleBox config={element} />
        case ComponentType.DATE:     return <DateBox config={element} />
        case ComponentType.TIME:     return <div>time</div>
        case ComponentType.ARRAY:    return <ArrayInput config={element} />
        case ComponentType.MAP:      return <MapInput config={element} />
        default:                     return <div>Unrecognized config type &quot;{element.type}&quot;</div>
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
