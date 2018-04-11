import React, { Component } from 'react'
import { connect } from "react-redux"
import { compose } from "recompose"

import TextBox from "./TextBox"
import DateBox from "./DateBox"
import TimeBox from "./TimeBox"
import DropDownBox from "./DropDownBox"
import ToggleBox from "./ToggleBox"
import NumberBox from "./NumberBox"
import UploadBox from "./UploadBox"
import CheckBox from "./CheckBox"
import MapInput from "./MapInput"
import ArrayInput from "./ArrayInput"
import ErrorBox from "../ErrorBox"
import ColorPicker from "./ColorPicker"

import evaluator from "../../util/evaluator"
import getLayoutString from "../../util/LayoutProcessor"
import { check } from "../../util/formDataGet"
import ComponentType from "../ComponentType"
import ActionList from "../../reducer/actionList"

class Form extends Component {
  render() {
    let groups = []
    let elements = this.props.form.map(element => {
      if(!element.hasOwnProperty("type")) {
        return <ErrorBox key={element.path} message={'Invalid form file format "' + JSON.stringify(element) + '". Type is missing'} />
      } else if(!element.hasOwnProperty("path")) {
        return <ErrorBox key={element.path} message={'Invalid form file format "' + JSON.stringify(element) + '". Path is missing'} />
      }
      if(element.hasOwnProperty("rendered")) {
        if(!evaluator(element.rendered)) {
          if(check(element.path)) {
            this.props.removeData(element.path)
          }
          return 0
        }
      }
      if(element.hasOwnProperty("group")) {
        groups = groups.concat(element.group)
        groups = groups.filter((name, index) => groups.indexOf(name) === index) // -> NO DUPLICATE KEY
      }
      const isEvenChild = this.props.hasOwnProperty("evenChild") ? this.props.evenChild : false
      let elementRendered
      switch(element.type) {
        case ComponentType.TEXT:     elementRendered = <TextBox form={element} />;                         break
        case ComponentType.NUMBER:   elementRendered = <NumberBox form={element} />;                       break
        case ComponentType.IMAGE:    elementRendered = <UploadBox form={element} />;                       break
        case ComponentType.DROPDOWN: elementRendered = <DropDownBox form={element} />;                     break
        case ComponentType.CHECKBOX: elementRendered = <CheckBox form={element} />;                        break
        case ComponentType.TOGGLE:   elementRendered = <ToggleBox form={element} />;                       break
        case ComponentType.DATE:     elementRendered = <DateBox form={element} />;                         break
        case ComponentType.TIME:     elementRendered = <TimeBox form={element} />;                         break
        case ComponentType.COLOR:    elementRendered = <ColorPicker form={element} />;                     break
        case ComponentType.ARRAY:    elementRendered = <ArrayInput form={element} />;                      break
        case ComponentType.MAP:      elementRendered = <MapInput form={element} evenChild={isEvenChild}/>; break
        default:                     elementRendered = <ErrorBox message={'Unrecognized element type "' + element.type + '"'} />
      }
      if(element.type === ComponentType.MAP) {
        return <div key={element.path} className="col-sm-12 com-md-12 col-lg-12">
          {elementRendered}
        </div>
      } else if(element.type === ComponentType.COLOR) {
        return <div key={element.path} className="col-sm-12 com-md-6 col-lg-6">
          {elementRendered}
        </div>
      } else {
        return <div key={element.path} className={getLayoutString(element.layout)}>
          {elementRendered}
        </div>
      }
    }).filter(element => element !== 0)

    if(elements.length === 0) {
      elements = "Form is empty"
    }

    const groupedElements = groups.map(name => {
      return <div key={"group/" + name} className="col-sm-12">
        <div className="row">
          <div className="col-sm-12">
            <div className="k-panel k-header k-state-selected">{name}</div>
            <div className="k-panel k-shadow">
              <div className="row">
                {elements.filter(element => element.props.children.props.form.group === name)}
              </div>
            </div>
          </div>
        </div>
      </div>
    })

    elements = elements.filter(element => !element.props.children.props.form.hasOwnProperty("group"))

    return <div className="k-form row">
      {elements}
      {groupedElements}
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.form.notifier
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeData: (path) => dispatch({
      type: ActionList.POP_DATA,
      payload: {
        "path": path
      }
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(Form)
