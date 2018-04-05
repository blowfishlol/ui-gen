import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DropDownList } from "@progress/kendo-react-dropdowns"
import { Tooltip } from '@progress/kendo-popups-react-wrapper';

import { generateLabel } from "./LabelTooltipGenerator"
import { labelCheck } from "../../util/InfoChecker"
import get from "../../util/formDataGet"
import  ActionList  from "../../reducer/actionList"
import { colorList } from "../../util/colorSource"
import BlankSpace from "../BlankSpace"


/**
 * Each color have their own palette.
 * example: Color: red have the palette: red50, red100, red200, etc
 * in state, color is called palette to meet specifications of the required configuration.
 * this comment is to avoid ambiguity in defining "palette"and "color" by wibi. please request any refactor to me if required.
 **/
class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      palette : "red",
      base: "50",
      hue1: "50",
      hue2: "50",
      hue3: "50",
      contrastDefaultColor: ""
    }
  }

  //TEMPORARY ONLY
  getCheck(){
    return <img width={30} height={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH0SURBVGhD7dhPSBRxFMDxldKsSKiDFwlMsIN6EaFIvQQdhC6K524KnvQkXQURBBERDIwItEMn8WbHOmWXBA+RUkGkEiQWEiKaf79PXPjx47XOtM7um/h94XNw2GXe2x2c3c2EQqFQKM+uYQTTaJEDaawEczg6dYAxXEaq6kZ2CdcS7iIV3cJvaIuIXTTDdHJJvYG2gGsCpuuDNrivB2a7jW1og7ve4yJMdgHz0AZ37aAeZnsMbXBfP8zWAHmltcFdbyHvnMlKsQBtcNcWamG2AWiD+3phtib8gTa46zXk/mKyS/gAbXCX3OGrYbZhaIP7umC2e9iHNrjrFcxeUlfwCdrgrl+oQmLdhNyU2k/+it84tMF9j5BYjdhA9mSTiPPW38ch3IE1s0gsf4msp4iyjHxt/Qr/+b51VCKRZImf0E4soizzDNpzfZ1IJPmOvArtpK5cy7QhyiX1EolVB+2kGm2Z61iD9njXd9xAYpVhGdrJNf4yL6A9zvcQiVeDFWgDaLLLdDjHcnmOghV3mSn88I5pvqECBS3uMmeRfwAPUJTOc5knKGrnscwXXEXRy2cZ+eTbCjP96zKjMFfcZT6iHCaLuswe7sB0UZYZRCrKtcwi5ONOapJlPsNdYhOmf6/9W3J/GMI7zEB+Eg2FQqHQ/1wmcwyYwLcPtgh5KQAAAABJRU5ErkJggg=="></img>
  }


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


  /**
   * To handle color (Red, blue, cyan, etc) change
   **/
  handleColorChange(colorValue,event) {

    var baseVal = this.state.base;
    var hue1Val = this.state.hue1;
    var hue2Val = this.state.hue2;
    var hue3Val = this.state.hue3;
    if(colorValue === "brown" || colorValue === "grey" || colorValue === "bluegrey") {
      baseVal = (this.state.base.indexOf("a") >= 0) ? "50" : baseVal;
      hue1Val = (this.state.hue1.indexOf("a") >= 0) ? "50" : hue1Val;
      hue2Val = (this.state.hue2.indexOf("a") >= 0) ? "50" : hue2Val;
      hue3Val = (this.state.hue3.indexOf("a") >= 0) ? "50" : hue3Val;
    }

    this.setState({
      ...this.state,
      palette: colorValue,
      base: baseVal.toString(),
      hue1: hue1Val.toString(),
      hue2: hue2Val.toString(),
      hue3: hue3Val.toString()
    })
  } 


  generateColorBoxes(mainColorPair, props) {

    const boxes = mainColorPair.map(pair => {
    const styles = {
      backgroundColor: pair.hex,
      width: 30,
      height: 30,
    };
    const check = (pair.value===this.state.palette) ? this.getCheck() : "";
    return <div className="col-*-3" key={props.form.path+"."+"palette."+pair.value}><Tooltip content={pair.text} position={"top"}>
          <div style={styles} onClick={(event) => {this.handleColorChange(pair.value,event)}}>{check}</div>
        </Tooltip></div>

    })

    return boxes;

  }

  //depends on color chosen, the palette pair might be different
  //Except for brown, bluegrey, and grey, palette pair will contain A100, A200, A400, A700.
  //source is hue1, hue2, base, etc
  generatePaletteBoxes(palettePair, source, props) {

    const boxes = palettePair.map(pair => {
      const styles = {
        backgroundColor: colorList[this.state.palette][pair.value],
        width: 40.71,
        height: 30,
      };

      const check = (pair.value.toString()===this.state[source].toString()) ? this.getCheck() : "";

      return <div className="col-*-3" key={props.form.path+"."+source+"."+pair.value}><Tooltip content={pair.text} position={"top"}>
         <div style={styles} onClick={(event) => {this.handlePaletteChange(pair.value ,source, event)}}>{check}</div>
        </Tooltip>
      </div>

    })

    return boxes;

  }

  render() {
    console.log(this.state);
    const mainColorPair = [ 
      { text: 'Red', value: 'red', hex: '#e53935' },
      { text: 'Pink', value: 'pink', hex: '#d81b60'},
      { text: 'Purple', value: 'purple', hex: '#8e24aa'},
      { text: 'Deep Purple', value: 'deeppurple', hex: '#5e35b1'},
      { text: 'Indigo', value: 'indigo', hex: '#3949ab' },
      { text: 'Blue', value: 'blue', hex: '#1e88e5' },
      { text: 'Light Blue', value: 'lightblue', hex: '#039be5'},
      { text: 'Cyan', value: 'cyan', hex: '#00acc1' },
      { text: 'Teal', value: 'teal', hex: '#00897b' },
      { text: 'Green', value: 'green', hex: '#43a047' },
      { text: 'Light Green', value: 'lightgreen', hex: '#7cb342' },
      { text: 'Lime', value: 'lime', hex: '#cddc39' },
      { text: 'Yellow', value: 'yellow', hex: '#ffeb3b' },
      { text: 'Amber', value: 'amber' , hex: '#ffc107'},
      { text: 'Orange', value: 'orange' , hex: '#ff9800'},
      { text: 'Deep Orange', value: 'deeporange', hex: '#ff5722' },
      { text: 'Brown', value: 'brown', hex: '#795548' } ,
      { text: 'Grey', value: 'grey', hex: '#9e9e9e' } ,
      { text: 'Blue Grey', value: 'bluegrey', hex: '#607d8b' } ,
    ];

    const mainPalettePair = [ 
      { text: 50, value: 50 },
      { text: 100, value: 100 },
      { text: 200, value: 200 },
      { text: 300, value: 300 },
      { text: 400, value: 400 },
      { text: 500, value: 500 },
      { text: 600, value: 600 },
      { text: 700, value: 700 },
      { text: 800, value: 800 },
      { text: 900, value: 900 } 
    ]

    const altPalettePair = [ 
      { text: 'A100', value: 'a100' },
      { text: 'A200', value: 'a200' },
      { text: 'A400', value: 'a400' },
      { text: 'A700', value: 'a700' } 
    ]

    let preparedPalette = [];
    if(this.state.palette === "brown" || this.state.palette === "grey"  || this.state.palette === "bluegrey" ){
      preparedPalette = mainPalettePair;
    } else {
      preparedPalette = mainPalettePair.concat(altPalettePair);
    }

    const padding = {
      padding: "5px"
    }

    const bgcolor = {
      backgroundColor: "#eeeeee"
    }

    return <div className="k-form-field ">
    <h3>{generateLabel(this.props.form)}</h3>
    <div className="container" style={bgcolor}>
      <div className="row">
        <div className="col-*">
          <div style={padding}>
            <span>Color selection: {this.state.palette}</span>
            <div className="container"><div className="row">{this.generateColorBoxes(mainColorPair,this.props)}</div></div>
          </div>
        </div>
        <div className="col-*">
          <div style={padding}>
            <span>Base Color Selection: {this.state.base}</span>
            <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette,"base",this.props)}</div></div>
          </div>
        </div>
        <div className="col-*"> 
          <div style={padding}> 
            <span>Hue 1 Color Selection: {this.state.hue1}</span>
            <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette,"hue1",this.props)}</div></div>
          </div>
        </div>
        <div className="col-*">
          <div style={padding}>
            <span>Hue 2 Color Selection: {this.state.hue2}</span>
            <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette,"hue2",this.props)}</div></div>
          </div>
        </div>
        <div className="col-*">
          <div style={padding}>
            <span>Hue 3 Color Selection: {this.state.hue3}</span>
            <div className="container"><div className="row">{this.generatePaletteBoxes(preparedPalette,"hue3",this.props)}</div></div>
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
