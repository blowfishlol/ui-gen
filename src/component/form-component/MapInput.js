import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import Form from "./Form"
import LabelTooltip from "./LabelTooltip"
import BlankSpace from "../BlankSpace"
import ErrorBox from "../ErrorBox"

import get from "../../util/formDataGet"
import { clone } from "../../util/toolbox"
import { nullInfo } from "../../util/infoChecker"
import ActionList from "../../reducer/actionList"

class MapInput extends React.Component {

  nextPath() {
    return this.props.form.path + "." + get(this.props.form.path, this.props.form.type).length
  }

  onAddBtnClickedListener() {
    this.props.updateState(this.nextPath(), {})
  }

  onDeleteBtnClickedListener(index) {
    const currentData = get(this.props.form.path, this.props.form.type)
    this.props.updateState(this.props.form.path,
                           currentData.slice(0, index).concat(currentData.slice(index + 1, currentData.length)),
                           nullInfo(this.props.form))
  }

  render() {
    if(!this.props.hasOwnProperty("form")) {
      return <ErrorBox message="Config is missing" />
    } else if(!this.props.form.hasOwnProperty("child_content")) {
      return <ErrorBox message={"Content is missing."} />
    }

    var elements = get(this.props.form.path, this.props.form.type).map((element, index) => {
      const childElement = clone(this.props.form.child_content)
      for(var i = 0; i < childElement.length; i++) {
        childElement[i].path = this.props.form.path + "." + index + "." + childElement[i].path
      }
      const isEvenChild = this.props.hasOwnProperty("evenChild") ? (this.props.evenChild ? false : true) : true
      const style = isEvenChild ? "k-form alert formHighlightLight" : "k-form alert formHighlightDark"

      return <div key={this.props.form.path + "." + index} className={style + " mapChild multipleElementComponent"}>
        <Form form={childElement} evenChild={isEvenChild} />
        <BlankSpace space="35px" />
        <button className="k-button deleteElementButton" onClick={() => this.onDeleteBtnClickedListener(index)}>X</button>
      </div>
    })

    return <div className="k-form-field">
      <LabelTooltip form={this.props.form} />
      <div>
        {elements}
      </div>
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
)(MapInput)
