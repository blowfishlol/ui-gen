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
    this.data = get(this.props.path, this.props.desc.element.type)

    /**
     * TEMPORARY WORKAROUND
     * Need to find a better way to ensure the app don't get confused between data from
     * template and data from form reducer when array of data is involved
     * (due to the array from template don't get stored inside form reducer)
     */
    console.log(this.props.desc)
    if(!check(this.props.path)) {
      this.props.updateState(this.props.path, {})
      Object.keys(this.data).forEach(key => {
        this.props.updateState(this.props.path + "." + key, {})
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.notifier !== prevProps.notifier) {
      this.data = get(this.props.path, this.props.desc.element.type)
      this.forceUpdate()
    }
  }

  nextPath() {
    let surplus = 0
    let dataLength = Object.keys(this.data).length
    while(true) {
      if(check(this.props.path + ".KEY" + (dataLength+surplus))) {
        surplus++
      } else {
        return this.props.path + ".KEY" + (dataLength+surplus)
      }
    }
  }

  onAddBtnClickedListener() {
    this.props.updateState(this.nextPath(), {})
  }

  onDeleteBtnClickedListener(index) {
    const currentData = clone(this.data)
    delete currentData[Object.keys(currentData)[index]]
    this.props.updateState(this.props.path, currentData, nullInfo(this.props.desc.element))
  }

  render() {
    if(!this.props.desc.element.hasOwnProperty("child")) {
      return <ErrorBox message="Content is missing" />
    } else if(!isObject(this.props.desc.element.child)) {
      return <ErrorBox message={"Invalid content " + this.props.desc.child.toString()} />
    }

    let elements = Object.keys(this.data).map((key, index) => {
      let childDesc = clone(this.props.desc.element)
      childDesc.label = key

      return <div key={this.props.path + "." + index} >
        <Form
          path={this.props.path + "." + key}
          component={childDesc}
          index={index}
          onDelete={this.onDeleteBtnClickedListener}
          isMapInput={true} />
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
