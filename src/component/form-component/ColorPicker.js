import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Tooltip } from "@progress/kendo-popups-react-wrapper"
import LabelTooltip from "./LabelTooltip"
import ColorPickerComponent from "./ColorPickerComponent"

import get from "../../util/formDataGet"
import { windowOpen } from "../Window"
import colorList, { mainColor }  from "../../util/color"
import ActionList from "../../reducer/actionList"

/**
 * Each color have their own palette.
 * example: Color: red have the palette: red50, red100, red200, etc
 * in state, color is called palette to meet specifications of the required configuration.
 * this comment is to avoid ambiguity in defining "palette"and "color" by wibi. please request any refactor to me if required.
 **/
class ColorPicker extends React.Component {

  generateColorPicker() {
    return <div>
      <ColorPickerComponent path={this.props.path} desc={this.props.desc}/>
    </div>
  }

  onColorBtnClickedListener(data) {
    this.props.setWindow({
      title: this.props.desc.label,
      content: this.generateColorPicker(),
      width: "100%",
      height: "40%"
    })
    windowOpen()
  }

  generateMenuBoxes(data) {
    const palette = data.palette
    var buffer = []

    for(var key in data) {
      if(key === "palette" || key==="contrastDefaultColor"){
        continue
      } else {
        var styles = {
          backgroundColor: colorList[palette][data[key]],
          width: 10,
          height: 20,
        }
        buffer.push(<Tooltip content={key + " value"} position={"top"} key={this.props.path + "/" + key}>
          <div style={styles}></div>
        </Tooltip>)
      }
    }
    return buffer
  }

  render() {
    const data = get(this.props.path, this.props.desc.element.type)
    return <div>
      <label className="k-form-field">
        <LabelTooltip desc={this.props.desc} />
        <button className="k-button" onClick={() => (this.onColorBtnClickedListener(data))}>
          {this.generateMenuBoxes(data)}&nbsp;&nbsp;{mainColor.find(color => color.value === data.palette).text}
        </button>
      </label>
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
    setWindow: (bundle) => dispatch({
      type: ActionList.SET_WINDOW,
      payload: bundle
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(ColorPicker)
