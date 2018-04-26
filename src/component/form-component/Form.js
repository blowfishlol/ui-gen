import React, { Component } from 'react'
import { connect } from "react-redux"
import { compose } from "recompose"

import { Button } from "@progress/kendo-react-buttons"
import TextBox from "./TextBox"
import DateBox from "./DateBox"
import TimeBox from "./TimeBox"
import DropDownBox from "./DropDownBox"
import ToggleBox from "./ToggleBox"
import NumberBox from "./NumberBox"
import UploadBox from "./UploadBox"
import CheckBox from "./CheckBox"
import ColorPicker from "./ColorPicker"
import ObjectInput from "./ObjectInput"
import MapInput from "./MapInput"
import ArrayInput from "./ArrayInput"
import ErrorBox from "../ErrorBox"

import { clone } from "../../util/toolbox";
import evaluator from "../../util/evaluator"
import getLayoutString from "../../util/layoutProcessor"
import ComponentType from "../ComponentType"
import ActionList from "../../reducer/actionList"
import {check} from "../../util/formDataGet";

class Form extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.component.label,
      isEditTitleMode: false
    }
  }

  findElementNodes(node) {
    Object.keys(node).forEach(key => {
      if(!node[key].hasOwnProperty("element")) {
        delete node[key]
      }
    })
    return node
  }

  findParentNodes(node) {
    Object.keys(node).forEach(key => {
      if(node[key].hasOwnProperty("element")) {
        delete node[key]
      }
    })
    return node
  }

  onDeleteBtnClickedListener() {
    if(this.props.onDelete) {
      this.props.onDelete(this.props.index)
    } else {
      this.props.removeData(this.props.path)
    }
  }

  manageInputComponents(components) {
    let output = Object.keys(components).map((key, index) => {
      const path = this.props.path + "." + key

      if(!components[key].element.hasOwnProperty("type")) {
        return <ErrorBox key={path} message={'Invalid form file format "' + JSON.stringify(components[key].element) + '". Type is missing'} />
      } else if(components[key].element.hasOwnProperty("render")) {
        if(!evaluator(components[key].element.render)) {
          return 0
        }
      }

      let renderedComponent
      let childProps = {
        path: path,
        desc: components[key]
      }
      switch(components[key].element.type) {
        case ComponentType.TEXT:     renderedComponent = <TextBox     {...childProps} />; break
        case ComponentType.NUMBER:   renderedComponent = <NumberBox   {...childProps} />; break
        case ComponentType.IMAGE:    renderedComponent = <UploadBox   {...childProps} />; break
        case ComponentType.DROPDOWN: renderedComponent = <DropDownBox {...childProps} />; break
        case ComponentType.CHECKBOX: renderedComponent = <CheckBox    {...childProps} />; break
        case ComponentType.TOGGLE:   renderedComponent = <ToggleBox   {...childProps} />; break
        case ComponentType.DATE:     renderedComponent = <DateBox     {...childProps} />; break
        case ComponentType.TIME:     renderedComponent = <TimeBox     {...childProps} />; break
        case ComponentType.COLOR:    renderedComponent = <ColorPicker {...childProps} />; break
        case ComponentType.ARRAY:    renderedComponent = <ArrayInput  {...childProps} />; break
        case ComponentType.OBJECTS:  renderedComponent = <ObjectInput {...childProps} />; break
        case ComponentType.MAP:      renderedComponent = <MapInput    {...childProps} />; break
        default: renderedComponent = <ErrorBox key={path} message={'Unrecognized element type "' + components[key].element.type + '"'} />
      }

      let style = components[key].element.type === ComponentType.OBJECTS || components[key].element.type === ComponentType.MAP ?
        "col-12" : getLayoutString(components[key].element.layout)

      return <div key={path} className={style}>
        {renderedComponent}
      </div>
    }).filter(element => element !== 0)

    return output
  }

  manageParentComponents(components) {
    let output = Object.keys(components).map((key, index) => {
      const path = this.props.path + "." + key
      return <div key={path} className="col-12">
        <Form
          path={path}
          component={components[key]}
          isUnclosable={true}
          isChild={true} />
      </div>
    })

    return output
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    if(!nextState.isEditTitleMode) {
      let path = this.props.path
      let newPath = path.substring(0, path.lastIndexOf(".") + 1) + nextState.title
      console.log(newPath)
      if(check(newPath)) {
        return true
      } else {
        return true
      }
    }
  }

  render() {
    const elementNodes = this.findElementNodes(clone(this.props.component.child))
    let elements = this.manageInputComponents(elementNodes)

    if(this.props.isMapInput) {
      const parentNodes = this.findParentNodes(clone(this.props.component.child))
      var parents = this.manageParentComponents(parentNodes)
      var editLabelButton = <Button
        look="bare" primary={true} className={"minimal-button"}
        icon={this.state.isEditTitleMode ? "check" : "edit"}
        onClick={() => this.setState({...this.state, isEditTitleMode: !this.state.isEditTitleMode})}/>
    }

    let titleBox = this.state.isEditTitleMode ?
      <input
        className={"k-textbox"}
        value={this.state.title}
        onChange={evt => this.setState({...this.state, title: evt.target.value})} /> :
      this.props.component.label
    let closeButton = this.props.isUnclosable ? "" :
      <button className="k-button transparent-button delete-element-button color-white float-right" onClick={() => this.onDeleteBtnClickedListener()}>X</button>

    return <div className="k-form">
      <div className="k-panel k-header k-state-selected">
        <div className="row">
          <div className="col-auto">{titleBox}</div>
          <div className="col">{editLabelButton}</div>
          <div className="col-1">{closeButton}</div>
        </div>
      </div>
      <div className={"k-panel k-shadow " + (this.props.isChild ? "map-child" : "")}>
        <div className="row">
          {elements}
          {parents}
        </div>
      </div>
    </div>
  }

  render_depc() {
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
        case ComponentType.TEXT:     renderedComponent = <TextBox     path={path} desc={components[key]} />; break
        case ComponentType.NUMBER:   renderedComponent = <NumberBox   path={path} desc={components[key]} />; break
        case ComponentType.IMAGE:    renderedComponent = <UploadBox   path={path} desc={components[key]} />; break
        case ComponentType.DROPDOWN: renderedComponent = <DropDownBox path={path} desc={components[key]} />; break
        case ComponentType.CHECKBOX: renderedComponent = <CheckBox    path={path} desc={components[key]} />; break
        case ComponentType.TOGGLE:   renderedComponent = <ToggleBox   path={path} desc={components[key]} />; break
        case ComponentType.DATE:     renderedComponent = <DateBox     path={path} desc={components[key]} />; break
        case ComponentType.TIME:     renderedComponent = <TimeBox     path={path} desc={components[key]} />; break
        case ComponentType.COLOR:    renderedComponent = <ColorPicker path={path} desc={components[key]} />; break
        case ComponentType.ARRAY:    renderedComponent = <ArrayInput  path={path} desc={components[key]} />; break
        case ComponentType.MAP:      renderedComponent = <MapInput    path={path} desc={components[key]} />; break
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
