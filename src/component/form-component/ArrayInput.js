import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import Form from "./Form"
import LabelTooltip from "./LabelTooltip"
import BlankSpace from "../BlankSpace"
import ErrorBox from "../ErrorBox"

import get, { defaultValue } from "../../util/formDataGet"
import ActionList from "../../reducer/actionList"

class ArrayInput extends React.Component {

  nextPath() {
    return this.props.form.path + "." + get(this.props.form.path, this.props.form.type).length
  }

  render() {
    if(!this.props.hasOwnProperty("form")) {
      return <ErrorBox message="Config is missing" />
    } else if(!this.props.form.hasOwnProperty("child_content")) {
      return <ErrorBox message="Content is missing" />
    } else if(!this.props.form.child_content.hasOwnProperty("type")) {
      return <ErrorBox message="Content type is missing" />
    }

    var elements = get(this.props.form.path, this.props.form.type).map((element, index) => {
      return <div key={this.props.form.path + "." + index} className="multipleElementComponent">
        <Form
          form={[{
            label: "",
            type: this.props.form.child_content.type,
            path: this.props.form.path + "." + index,
            layout: {
              mobile: 12,
              tablet: 12,
              desktop: 12
            }
          }]} />
        <BlankSpace space="35px" />
        <button className="k-button deleteElementButton" onClick={() => this.deleteElement(index)}>X</button>
      </div>
    })

    return <div className="k-form-field">
      <LabelTooltip form={this.props.form} />
      <div>
        {elements}
      </div>
      <button className="k-button k-primary" onClick={() => this.add()}>ADD</button>
    </div>
  }

  add() {
    this.props.updateState(this.nextPath(), defaultValue(this.props.form.child_content.type))
  }

  deleteElement(index) {
    const currentData = get(this.props.form.path, this.props.form.type)
    this.props.updateState(this.props.form.path, currentData.slice(0, index).concat(currentData.slice(index + 1, currentData.length)))
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.form.notifier
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateState: (path,value) => dispatch({
      type: ActionList.SET_DATA,
      payload: {
        "path": path,
        "value": value,
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
