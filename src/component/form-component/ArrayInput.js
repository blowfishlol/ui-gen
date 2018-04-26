import React from "react"
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
import ColorPicker from "./ColorPicker"
import LabelTooltip from "./LabelTooltip"
import BlankSpace from "../BlankSpace"
import ErrorBox from "../ErrorBox"

import get, {check, defaultValue} from "../../util/formDataGet"
import { nullInfo } from "../../util/infoChecker"
import ActionList from "../../reducer/actionList"
import ComponentType from "../ComponentType";

class ArrayInput extends React.Component {

  constructor(props) {
    super(props)
    this.onDeleteBtnClickedListener = this.onDeleteBtnClickedListener.bind(this)
    this.data = get(this.props.path, this.props.desc.element.type)

    /**
     * TEMPORARY WORKAROUND
     * Need to find a better way to ensure the app don't get confused between data from
     * template and data from form reducer when array of data is involved
     * (due to the array from template don't get stored inside form reducer)
     */
    if(!check(this.props.path)) {
      let data = get(this.props.path, this.props.desc.element.type)
      if(data.length !== 0) {
        for(let i = 0; i < data.length; i++) {
          this.props.updateState(this.props.path + "." + i, undefined)
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.data = get(this.props.path, this.props.desc.element.type)
  }

  nextPath() {
    return this.props.path + "." + get(this.props.path, this.props.desc.element.type).length
  }

  onAddBtnClickedListener() {
    this.props.updateState(this.nextPath(), defaultValue(this.props.desc.element.child), nullInfo(this.props.desc.element))
  }

  onDeleteBtnClickedListener(index) {
    const currentData = get(this.props.path, this.props.desc.element.type)
    this.props.updateState(this.props.path,
                           currentData.slice(0, index).concat(currentData.slice(index + 1, currentData.length)),
                           nullInfo(this.props.desc.element))
  }

  generateArrayChildDesc(desc) {
    return {
      label: "",
      info: "",
      element: {
        type: desc.element.child,
        nullable: desc.element.nullable,
        layout: {
        desktop: 12,
          tablet: 12,
          phone: 12
        }
      }
    }
  }

  render() {
    if(!this.props.desc.element.hasOwnProperty("child")) {
      return <ErrorBox message="Content is missing" />
    } else if(typeof this.props.desc.element.child !== "string") {
      return <ErrorBox message={"Invalid content " + this.props.desc.child.toString()} />
    }

    let inputFields = this.data.map((datum, index) => {
      let path = this.props.path + "." + index

      let inputField
      let childProps = {
        path: path,
        desc: this.generateArrayChildDesc(this.props.desc)
      }
      switch(this.props.desc.element.child) {
        case ComponentType.TEXT:     inputField = <TextBox     {...childProps} />; break
        case ComponentType.NUMBER:   inputField = <NumberBox   {...childProps} />; break
        case ComponentType.IMAGE:    inputField = <UploadBox   {...childProps} />; break
        case ComponentType.DROPDOWN: inputField = <DropDownBox {...childProps} />; break
        case ComponentType.CHECKBOX: inputField = <CheckBox    {...childProps} />; break
        case ComponentType.TOGGLE:   inputField = <ToggleBox   {...childProps} />; break
        case ComponentType.DATE:     inputField = <DateBox     {...childProps} />; break
        case ComponentType.TIME:     inputField = <TimeBox     {...childProps} />; break
        case ComponentType.COLOR:    inputField = <ColorPicker {...childProps} />; break
        default: inputField = <ErrorBox key={path} message={'Unrecognized element type "' + this.props.desc.element.child + '"'} />
      }

      return <div key={path} className="row">
        <div className="col-11">{inputField}</div>
        <div className="col-1">
          <button className="k-button transparent-button delete-array-button" onClick={() => this.onDelete(index)}>X</button>
        </div>
      </div>
    })

    return <div className="k-form-field">
      <LabelTooltip desc={this.props.desc} />
      {inputFields}
      <BlankSpace space="10px" />
      <button className="k-button k-primary" onClick={() => this.onAddBtnClickedListener()}>ADD</button>
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
    updateState: (path, value, nullable) => dispatch({
      type: ActionList.SET_DATA,
      payload: {
        "path": path,
        "value": value,
        "nullable": nullable
      }
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(ArrayInput)
