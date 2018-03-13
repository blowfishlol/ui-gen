import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";
import '@progress/kendo-theme-material/dist/all.css';
<<<<<<< HEAD
// import './App.css'
import ActionList from "./../reducer/actionList"
=======
import './style.css'

>>>>>>> 24275b38b4a366f97f17b8e6c52204a540a59190
import TextBox from './TextBox';
import DateBox from './DateBox';
import TimeBox from './TimeBox';
import DropDownBox from './DropDownBox';
import ToggleBox from './ToggleBox';
import NumberBox from './NumberBox';
import UploadBox from './UploadBox';
import CheckBox from './CheckBox';
import MapInput from './MapInput';
import ArrayInput from './ArrayInput';
import ErrorBox from './ErrorBox';

import ComponentType from "../util/ComponentType"

export default class App extends Component {
  render() {
    var elements = this.props.config.map(element => {
      if(!element.hasOwnProperty("type")) {
        var msg = "Invalid config file format \"" +
         JSON.stringify(element) +
         "\". Type is missing";
        return <ErrorBox message={msg} />
      }

      switch(element.type) {
        case ComponentType.TEXT:     return <div><TextBox config={element} /></div>
        case ComponentType.NUMBER:   return <NumberBox config={element} />
        case ComponentType.IMAGE:    return <UploadBox config={element} />
        case ComponentType.DROPDOWN: return <DropDownBox config={element} />
        case ComponentType.CHECKBOX: return <CheckBox config={element} />
        case ComponentType.TOGGLE:   return <ToggleBox config={element} />
        case ComponentType.DATE:     return <DateBox config={element} />
        case ComponentType.TIME:     return <TimeBox config={element} />
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
