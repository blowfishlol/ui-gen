import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import checkmark from "../../checkmark.png"
import checkmarklite from "../../checkmarklite.png"
import "../../style/ColorBox.css"

import { Tooltip } from "@progress/kendo-popups-react-wrapper"

import get from "../../util/formDataGet"
import colorList, { mainColor, mainPalette, altPalette }  from "../../util/color"
import detColor, { WHITE } from "../../util/colorBoxCheckmarkDet"
import ActionList from "../../reducer/actionList"

import { windowClose } from "../Window"

/**
 * Each color have their own palette.
 * example: Color: red have the palette: red50, red100, red200, etc
 * in state, color is called palette to meet specifications of the required configuration.
 * this comment is to avoid ambiguity in defining "palette"and "color" by wibi. please request any refactor to me if required.
 **/
class ColorPickerComponent extends React.Component {

  getCheck(hexVal) {
    if(detColor(hexVal) === WHITE){
      return <img width={30} height={30} src={checkmarklite} alt="V" />
    } else {
      return <img width={30} height={30} src={checkmark} alt="V" />
    }

  }

  /**
   * To handle color (Red, blue, cyan, etc) change
   **/
  onColorChangedListener(colorValue, event, data) {
    let baseVal = data.base
    let hue1Val = data.hue1
    let hue2Val = data.hue2
    let hue3Val = data.hue3
    if(colorValue === "brown" || colorValue === "grey" || colorValue === "bluegrey") {
      baseVal = (data.base.indexOf("A") >= 0) ? "50" : baseVal
      hue1Val = (data.hue1.indexOf("A") >= 0) ? "50" : hue1Val
      hue2Val = (data.hue2.indexOf("A") >= 0) ? "50" : hue2Val
      hue3Val = (data.hue3.indexOf("A") >= 0) ? "50" : hue3Val
    }

    this.props.updateState(this.props.path, {
      ...data,
      palette: colorValue,
      base: baseVal.toString(),
      hue1: hue1Val.toString(),
      hue2: hue2Val.toString(),
      hue3: hue3Val.toString()
    })
  }

  generateColorBoxes(data) {
    const boxes = mainColor.map(pair => {
      const styles = {
        backgroundColor: pair.hex,
        width: 30,
        height: 30,
      }
      const check = (pair.value === data.palette) ? this.getCheck(styles.backgroundColor) : ""
      return <div className="col-*-3" key={this.props.path + "/palette/" + pair.value}>
        <Tooltip content={pair.text} position={"top"}>
          <div style={styles} onClick={(event) => {this.onColorChangedListener(pair.value, event, data)}}>{check}</div>
        </Tooltip>
      </div>
    })
    return boxes
  }

  /**
   * To handle child of color change
   **/
  onPaletteChangedListener(paletteValue, source, event, data) {
    this.props.updateState(this.props.path, {
      ...data,
      [source]: paletteValue.toString()
    })
  }

  /**
   * depends on color chosen, the palette pair might be different
   * Except for brown, bluegrey, and grey, palette pair will contain A100, A200, A400, A700.
   * source is hue1, hue2, base, etc
   **/
  generatePaletteBoxes(palettePair, source, data) {
    const boxes = palettePair.map(pair => {
      const styles = {
        backgroundColor: colorList[data.palette][pair.value],
        width: 40.71,
        height: 30,
      }
      const check = (pair.value.toString() === data[source].toString()) ? this.getCheck(styles.backgroundColor) : ""
      return <div className="col-*-3" key={this.props.path + "/" + source + "/" + pair.value}>
        <Tooltip content={pair.text} position={"top"}>
          <div style={styles} onClick={(event) => {this.onPaletteChangedListener(pair.value, source, event, data)}}>{check}</div>
        </Tooltip>
      </div>
    })
    return boxes
  }

  isSpecialPalette(data) {
    return data.palette === "brown" || data.palette === "grey"  || data.palette === "bluegrey"
  }

  render() {
    const data = get(this.props.path, this.props.desc.element.type)
    const preparedPalette = this.isSpecialPalette(data) ? mainPalette : mainPalette.concat(altPalette)
    return <div className="container alert" style={{backgroundColor: "#eeeeee"}}>
      <div className="row">
        <div className="col-12 paletteStyle">
          <span>Color: {mainColor.find(color => color.value === data.palette).text}</span>
          <div className="container"><div className="row">{this.generateColorBoxes(data)}</div></div>
        </div>
        <div className="col-12 paletteStyle">
          <span>Base Color: {data.base}</span>
          <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette, "base", data)}</div></div>
        </div>
        <div className="col-12 paletteStyle">
          <span>Hue 1 Color: {data.hue1}</span>
          <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette, "hue1", data)}</div></div>
        </div>
        <div className="col-12 paletteStyle">
          <span>Hue 2 Color: {data.hue2}</span>
          <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette, "hue2", data)}</div></div>
        </div>
        <div className="col-12 paletteStyle">
          <span>Hue 3 Color: {data.hue3}</span>
          <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette, "hue3", data)}</div></div>
        </div>
        <div className="col-12">
          <button className="k-button k-primary float-right" onClick={() => windowClose()}>CLOSE</button>
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
)(ColorPickerComponent)
