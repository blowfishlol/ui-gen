import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import checkmark from "../../checkmark.png"

import { Tooltip } from "@progress/kendo-popups-react-wrapper"
import LabelTooltip from "./LabelTooltip"

import get from "../../util/formDataGet"
import colorList, { mainColor, mainPalette, altPalette }  from "./colorDef"
import ActionList from "../../reducer/actionList"

/**
 * Each color have their own palette.
 * example: Color: red have the palette: red50, red100, red200, etc
 * in state, color is called palette to meet specifications of the required configuration.
 * this comment is to avoid ambiguity in defining "palette"and "color" by wibi. please request any refactor to me if required.
 **/
class ColorPicker extends React.Component {

  getCheck(){
    return <img width={30} height={30} src={checkmark} alt="V" />
  }

<<<<<<< HEAD

  /**
   * To handle if a pallette changes. source is the (hue1, hue2, hue3, or base)
   **/
  handlePaletteChange(paletteValue,source,event) {
    console.log("PaletteChange!" ,source, paletteValue);

    this.setState({
      ...this.state,
      [source]: paletteValue.toString()
    })


  }


=======
>>>>>>> a8bbf2373d6e9aa367a1e690c49d9ccc891b9106
  /**
   * To handle color (Red, blue, cyan, etc) change
   **/
  handleColorChange(colorValue, event, data) {
    var baseVal = data.base
    var hue1Val = data.hue1
    var hue2Val = data.hue2
    var hue3Val = data.hue3
    if(colorValue === "brown" || colorValue === "grey" || colorValue === "bluegrey") {
      baseVal = (data.base.indexOf("a") >= 0) ? "50" : baseVal
      hue1Val = (data.hue1.indexOf("a") >= 0) ? "50" : hue1Val
      hue2Val = (data.hue2.indexOf("a") >= 0) ? "50" : hue2Val
      hue3Val = (data.hue3.indexOf("a") >= 0) ? "50" : hue3Val
    }

    this.props.updateState(this.props.form.path, {
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
      const check = (pair.value === data.palette) ? this.getCheck() : ""
      return <div className="col-*-3" key={this.props.form.path + ".palette." + pair.value}>
        <Tooltip content={pair.text} position={"top"}>
          <div style={styles} onClick={(event) => {this.handleColorChange(pair.value, event, data)}}>{check}</div>
        </Tooltip>
      </div>
    })
    return boxes
  }

  /**
   * To handle child of color change
   **/
  handlePaletteChange(paletteValue, source, event, data) {
    console.log("PaletteChange!" ,source, paletteValue)
    this.props.updateState(this.props.form.path, {
      ...data,
      [source]: paletteValue.toString()
    })
  }

  //depends on color chosen, the palette pair might be different
  //Except for brown, bluegrey, and grey, palette pair will contain A100, A200, A400, A700.
  //source is hue1, hue2, base, etc
  generatePaletteBoxes(palettePair, source, data) {
    const boxes = palettePair.map(pair => {
      const styles = {
        backgroundColor: colorList[data.palette][pair.value],
        width: 40.71,
        height: 30,
      }
      const check = (pair.value.toString() === data[source].toString()) ? this.getCheck() : ""
      return <div className="col-*-3" key={this.props.form.path + "." + source + "." + pair.value}>
        <Tooltip content={pair.text} position={"top"}>
          <div style={styles} onClick={(event) => {this.handlePaletteChange(pair.value, source, event, data)}}>{check}</div>
        </Tooltip>
      </div>
    })
    return boxes
  }

  isSpecialPalette(data) {
    return data.palette === "brown" || data.palette === "grey"  || data.palette === "bluegrey"
  }

  render() {
    const data = get(this.props.form.path, this.props.form.type)
    const preparedPalette = this.isSpecialPalette(data) ? mainPalette : mainPalette.concat(altPalette)
    return <div className="k-form-field ">
      <LabelTooltip form={this.props.form} />
      <div className="container" style={{backgroundColor: "#eeeeee"}}>
        <div className="row">
          <div className="col-*">
            <div style={{padding: "5px"}}>
              <span>Color selection: {data.palette}</span>
              <div className="container"><div className="row">{this.generateColorBoxes(data)}</div></div>
            </div>
          </div>
          <div className="col-*">
            <div style={{padding: "5px"}}>
              <span>Base Color Selection: {data.base}</span>
              <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette, "base", data)}</div></div>
            </div>
          </div>
          <div className="col-*">
            <div style={{padding: "5px"}}>
              <span>Hue 1 Color Selection: {data.hue1}</span>
              <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette, "hue1", data)}</div></div>
            </div>
          </div>
          <div className="col-*">
            <div style={{padding: "5px"}}>
              <span>Hue 2 Color Selection: {data.hue2}</span>
              <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette, "hue2", data)}</div></div>
            </div>
          </div>
          <div className="col-*">
            <div style={{padding: "5px"}}>
              <span>Hue 3 Color Selection: {data.hue3}</span>
              <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette, "hue3", data)}</div></div>
            </div>
          </div>
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
  return{
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
)(ColorPicker)
