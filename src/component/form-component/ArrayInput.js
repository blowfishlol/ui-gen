import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import Form from "./Form"
import LabelTooltip from "./LabelTooltip"
import BlankSpace from "../BlankSpace"
import ErrorBox from "../ErrorBox"

import get, {check, defaultValue} from "../../util/formDataGet"
import { nullInfo } from "../../util/infoChecker"
import ActionList from "../../reducer/actionList"

class ArrayInput extends React.Component {

  constructor(props) {
    super(props)
    this.onDeleteBtnClickedListener = this.onDeleteBtnClickedListener.bind(this)

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

  nextPath() {
    return this.props.path + "." + get(this.props.path, this.props.desc.element.type).length
  }

  onAddBtnClickedListener() {
    this.props.updateState(this.nextPath(), defaultValue(this.props.desc.element.child.type))
  }

  onDeleteBtnClickedListener(index) {
    const currentData = get(this.props.path, this.props.desc.element.type)
    this.props.updateState(this.props.path,
                           currentData.slice(0, index).concat(currentData.slice(index + 1, currentData.length)),
                           nullInfo(this.props.desc.element))
  }

  generateComponentObject() {
    let data = get(this.props.path, this.props.desc.element.type)
    let childDesc = {}
    for(let i = 0; i < data.length; i++) {
      childDesc[i+""] = {
        label: "",
        info: "",
        element: {
          type: this.props.desc.element.child,
          nullable: false,
          value: {},
          layout: {
            mobile: 11,
            tablet: 11,
            desktop: 11
          }
        }
      }
    }
    return {
      label: "",
      info: "",
      child: childDesc
    }
  }

  render() {
    if(!this.props.desc.element.hasOwnProperty("child")) {
      return <ErrorBox message="Content is missing" />
    } else if(typeof this.props.desc.element.child !== "string") {
      return <ErrorBox message={"Invalid content " + this.props.desc.child.toString()} />
    }

    return <div className="k-form-field">
      <LabelTooltip desc={this.props.desc} />
      <Form
        path={this.props.path}
        component={this.generateComponentObject()}
        array={true}
        onDelete={this.onDeleteBtnClickedListener} />
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
