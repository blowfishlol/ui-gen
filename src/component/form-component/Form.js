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

import { clone } from "../../util/toolbox";
import evaluator from "../../util/evaluator"
import getLayoutString from "../../util/layoutProcessor"
import ComponentType from "../ComponentType"
import ActionList from "../../reducer/actionList"

class Form extends Component {

  filterEnumerableChild(node) {
    Object.keys(node).forEach(key => {
      if(!node[key].hasOwnProperty("element")) {
        delete node[key]
      }
    })
    return node
  }

  onDeleteBtnClickedListener() {
    if(this.props.mapIndex !== undefined) {
      this.props.onDelete(this.props.mapIndex)
    } else {
      this.props.removeData(this.props.path)
    }
  }

  render() {
    const components = this.filterEnumerableChild(clone(this.props.component.child))
    let elements = Object.keys(components).map(key => {
      const path = this.props.path + "." + key
      if(!components[key].element.hasOwnProperty("type")) {
        return <ErrorBox key={path} message={'Invalid form file format "' + JSON.stringify(components[key].element) + '". Type is missing'} />
      } else if(components[key].element.hasOwnProperty("render")) {
        if(!evaluator(components[key].element.render)) {
          return 0
        }
      }

      let renderedComponent
      switch(components[key].element.type) {
        case ComponentType.TEXT:     renderedComponent = <TextBox path={path} desc={components[key]} />;     break
        case ComponentType.NUMBER:   renderedComponent = <NumberBox path={path} desc={components[key]} />;   break
        case ComponentType.IMAGE:    renderedComponent = <UploadBox path={path} desc={components[key]} />;   break
        case ComponentType.DROPDOWN: renderedComponent = <DropDownBox path={path} desc={components[key]} />; break
        case ComponentType.CHECKBOX: renderedComponent = <CheckBox path={path} desc={components[key]} />;    break
        case ComponentType.TOGGLE:   renderedComponent = <ToggleBox path={path} desc={components[key]} />;   break
        case ComponentType.DATE:     renderedComponent = <DateBox path={path} desc={components[key]} />;     break
        case ComponentType.TIME:     renderedComponent = <TimeBox path={path} desc={components[key]} />;     break
        case ComponentType.COLOR:    renderedComponent = <ColorPicker path={path} desc={components[key]} />; break
        case ComponentType.ARRAY:    renderedComponent = <ArrayInput path={path} desc={components[key]} />;  break
        case ComponentType.MAP:      renderedComponent = <MapInput path={path} desc={components[key]} />;    break
        default: renderedComponent = <ErrorBox key={path} message={'Unrecognized element type "' + components[key].element.type + '"'} />
      }

      if(components[key].element.type === ComponentType.MAP) {
        return <div key={path} className="col-sm-12 com-md-12 col-lg-12">
          {renderedComponent}
        </div>
      } else {
        return <div key={path} className={getLayoutString(components[key].element.layout)}>
          {renderedComponent}
        </div>
      }
    }).filter(element => element !== 0)

    if(this.props.array) {
      return <div>
        {elements.map((element, index) => {
          return <div className="row">
            {element}
            <div className="col-sm-1 col-md-1 col-lg-1">
              <button className="k-button transparent-button delete-array-button" onClick={() => this.props.onDelete(index)}>X</button>
            </div>
          </div>
        })}
      </div>
    }
    if(elements.length === 0) {
      elements = <div className="col-12 alert alert-warning">No rendered component exist</div>
    }
    let childStyle = this.props.mapIndex !== undefined ? "map-child" : ""
    return <div className="k-form">
      <div className="k-panel k-header k-state-selected">
        <button className="k-button transparent-button delete-element-button color-white float-right" onClick={() => this.onDeleteBtnClickedListener()}>X</button>
        {this.props.component.label}
      </div>
      <div className={"k-panel k-shadow " + childStyle}>
        <div className="row">
          {elements}
        </div>
      </div>
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
      payload: path
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(Form)
