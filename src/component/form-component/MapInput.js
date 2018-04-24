import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import Form from "./Form"
import LabelTooltip from "./LabelTooltip"
import BlankSpace from "../BlankSpace"
import ErrorBox from "../ErrorBox"

import get, {check} from "../../util/formDataGet"
import { clone, isObject } from "../../util/toolbox"
import { nullInfo } from "../../util/infoChecker"
import ActionList from "../../reducer/actionList"

class MapInput extends React.Component {

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
          this.props.updateState(this.props.path + "." + i, {})
        }
      }
    }
  }

  nextPath() {
    return this.props.path + "." + get(this.props.path, this.props.desc.element.type).length
  }

  onAddBtnClickedListener() {
    this.props.updateState(this.nextPath(), {})
  }

  onDeleteBtnClickedListener(index) {
    const currentData = get(this.props.path, this.props.desc.element.type)
    this.props.updateState(this.props.path,
                           currentData.slice(0, index).concat(currentData.slice(index + 1, currentData.length)),
                           nullInfo(this.props.desc.element))
  }

  render() {
    if(!this.props.desc.element.hasOwnProperty("child")) {
      return <ErrorBox message="Content is missing" />
    } else if(!isObject(this.props.desc.element.child)) {
      return <ErrorBox message={"Invalid content " + this.props.desc.child.toString()} />
    }

    let elements = get(this.props.path, this.props.desc.element.type).map((element, index) => {
      let childDesc = clone(this.props.desc.element)
      childDesc.label = this.props.desc.label + " " + (index+1)

      return <div key={this.props.path + "." + index} >
        <Form
          path={this.props.path + "." + index}
          component={childDesc}
          mapIndex={index}
          onDelete={this.onDeleteBtnClickedListener} />
      </div>
    })

    return <div className="k-form-field">
      <LabelTooltip desc={this.props.desc} />
      <div>
        {elements}
      </div>
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
)(MapInput)
