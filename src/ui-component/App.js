import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";

import './style.css'

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
import evaluator from "../util/evaluator2"

class App extends Component {
  render() {
    var elements = this.props.config.map(element => {
      if(element.hasOwnProperty("rendered")) {
        if(!evaluator(element.rendered)) {
          return <div key={element.path}/>
        }
      }
      if(!element.hasOwnProperty("type")) {
        return <ErrorBox key={element.path} message={'Invalid config file format "' + JSON.stringify(element) + '". Type is missing'} />
      }
      var isEvenChild = this.props.hasOwnProperty("evenChild") ? this.props.evenChild : false

      switch(element.type) {
        case ComponentType.TEXT:     return <TextBox key={element.path} config={element} />
        case ComponentType.NUMBER:   return <NumberBox key={element.path} config={element} />
        case ComponentType.IMAGE:    return <UploadBox key={element.path} config={element} />
        case ComponentType.DROPDOWN: return <DropDownBox key={element.path} config={element} />
        case ComponentType.CHECKBOX: return <CheckBox key={element.path} config={element} />
        case ComponentType.TOGGLE:   return <ToggleBox key={element.path} config={element} />
        case ComponentType.DATE:     return <DateBox key={element.path} config={element} />
        case ComponentType.TIME:     return <TimeBox key={element.path} config={element} />
        case ComponentType.ARRAY:    return <ArrayInput key={element.path} config={element} />
        case ComponentType.MAP:      return <MapInput key={element.path} config={element} evenChild={isEvenChild}/>
        default:                     return <ErrorBox key={element.path} message={'Unrecognized element type "' + element.type + '"'} />
      }
    })

    if(elements.length === 0) {
      elements = "Form is empty";
    }

    return <div>
      {elements}
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.notifier
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(App)
