import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";

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
import getLayoutString from '../util/LayoutProcessor'

class App extends Component {
  render() {
    var elements = this.props.config.map(element => {
      if(element.hasOwnProperty("rendered")) {
        if(!evaluator(element.rendered)) {
          /**
           * return an empty component
           */
          return <div key={element.path}/>
        }
      }
      if(!element.hasOwnProperty("type")) {
        return <ErrorBox key={element.path} message={'Invalid config file format "' + JSON.stringify(element) + '". Type is missing'} />
      }

      var isEvenChild = this.props.hasOwnProperty("evenChild") ? this.props.evenChild : false
      var elementRendered
      switch(element.type) {
        case ComponentType.TEXT:      elementRendered = <TextBox config={element} />;                         break
        case ComponentType.NUMBER:    elementRendered = <NumberBox config={element} />;                       break
        case ComponentType.IMAGE:     elementRendered = <UploadBox config={element} />;                       break
        case ComponentType.DROPDOWN:  elementRendered = <DropDownBox config={element} />;                     break
        case ComponentType.CHECKBOX:  elementRendered = <CheckBox config={element} />;                        break
        case ComponentType.TOGGLE:    elementRendered = <ToggleBox config={element} />;                       break
        case ComponentType.DATE:      elementRendered = <DateBox config={element} />;                         break
        case ComponentType.TIME:      elementRendered = <TimeBox config={element} />;                         break
        case ComponentType.ARRAY:     elementRendered = <ArrayInput config={element} />;                      break
        case ComponentType.MAP:       elementRendered = <MapInput config={element} evenChild={isEvenChild}/>; break
        default:                      elementRendered = <ErrorBox message={'Unrecognized element type "' + element.type + '"'} />
      }
      if(element.type === ComponentType.MAP) {
        return <div key={element.path} className="col-sm-12 com-md-12 col-lg-12">
          {elementRendered}
        </div>
      } else {
        return <div key={element.path} className={getLayoutString(element.layout)}>
          {elementRendered}
        </div>
      }
    })

    if(elements.length === 0) {
      elements = "Form is empty";
    }

    return <div className="k-form row">
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
