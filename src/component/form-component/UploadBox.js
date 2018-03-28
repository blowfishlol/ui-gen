import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import axios from "axios"

import './UploadBox.css'
import "@progress/kendo-ui"
import { Upload } from '@progress/kendo-upload-react-wrapper'

import { labelCheck } from '../../util/InfoChecker'
import  ActionList  from "../../reducer/actionList"
import server from "../../util/server"
import get from '../../data-accessor/formDataGet'

const fetchFileById = (id, context) => {
  axios.post(server + "/file/request/" + id)
    .then((response) => {
      context.setState({
        ...context.state,
        files: context.state.files.concat(response)
      })
    })
    .catch((err) => {
      console.log("ERROR", err)
    })
}

const deleteFileById = (id, context) => {
  axios.get(server + "/file/remove/" + id)
    .then((response) => {
      context.setState({
        ...context.state,
        ids: context.state.ids.filter(id => {
          id !== response.data
        }),
        files: context.state.files.filter(file => {
          file.id !== response.data
        })
      })
      context.removeExtFileRef(response.data)
    })
    .catch((err) => {
      console.log("ERROR", err)
    })
}

class UploadBox extends React.Component {

  constructor(props) {
    super(props)
    this.async = {
      saveUrl: (server + "/file/upload"),
      removeUrl: "http://www.mocky.io/v2/5aa927ba3200003a2d165b66",
      autoUpload: false,
      saveField: "file"
    }
    this.dropZone = ".dropZoneElement"
    this.state = {
      label: labelCheck(this.props.form.label),
      path: this.props.form.path,
      names: [],
      ids: get(this.props.form.path, this.props.form.type),
      files: []
    }
    this.boxId = this.props.form.path + ":UploadBox"
    this.props.addExtFileRef(this.state.ids)
    this.state.ids.forEach(id => {
      fetchFileById(id, this)
    })
  }
	

  render() {
    var storedFile = ""
    if(this.state.files) {
      storedFile = this.state.files.map(file => {
        var reader = new FileReader()
		
        var source;
		
				var preview = document.createElement("IMG");
				
				var base = "";
				
				reader.addEventListener("load", function () {
					preview.src = reader.result;
					try {
						var image = document.getElementById(file.uid);
						image.src = reader.result;
					} catch (e) {
						console.log(e);
					}
				}, false)
				 
				try {
					console.log("FILERAW", file.rawFile);
					reader.readAsDataURL(file.rawFile);
				} catch (e) {
					var rawResponse = file.data.rawFile;
					console.log("FILE.DATA" , file.data);
					base = "data:image/png;base64," + rawResponse;
					
					
				}
						//return <Image key={file.uid} id={file.uid} source={{uri: base, scale: 1}} style={{ height:100, width:100 }} />
				return <img width={100} height={100} key={file.uid} id={file.uid} className="img-thumbnail" src={base} alt=""/>
			})
    }

    return <div className="k-form-field">
      <span>{this.state.label}</span>
      <Upload
        className="col-*-3"
        async={this.async}
        dropZone={this.dropZone}
        complete={event => this.completeHandler(event)}
        upload={event => this.uploadHandler(event)}
        success={event => this.successHandler(event)}
        select={event => this.selectHandler(this.boxId, event, this.wrapper)}
        clear={event => this.clearHandler(this.boxId, event)}
        remove={event => this.removeHandler(this.boxId, event)} />
      <div className="dropZoneElement col-*-3">Drag and drop {this.state.label} here </div>
      <div id={this.boxId} className="col-*-3">{storedFile}</div>
    </div>
  }

  completeHandler(event) {
    console.log("complete", event, this.state.ids)
  }

  uploadHandler(event) {
    console.log("upload", event)
    var files = event.files
    var nameState = this.state.names
    files.forEach((file) => {
      nameState.push(file.name)
      this.setState({names: nameState})
    })
  }

  successHandler(event) {
    console.log("success", event, event.response)
    if(typeof event.response.data !== "number") {
      return
    }
    event.files[0].id = event.response.data
    this.props.updateState(this.props.form.path + "." + this.state.ids.length, event.response.data)
    this.props.addExtFileRef(event.response.data)
    this.setState({
      ...this.state,
      ids: this.state.ids.concat(event.response),
      files: this.state.files.concat(event.files[0])
    })
  }

  selectHandler(boxId, event, wrapper) {
		var file = event.files[0];
		var raw = file.rawFile;
		var reader = new FileReader();
		console.log("raw",raw);
		if(raw) {
			reader.addEventListener("load", function () {
				var preview = document.createElement("IMG");
				var base64string = reader.result;
				preview.setAttribute("src", base64string);
				preview.setAttribute("class", "image-preview");
				
				var n = document.querySelectorAll(".k-file[data-uid='" + file.uid + "'] .k-file-extension-wrapper");
				console.log("SELECTED_DOM",n);
				
				n[0].parentNode.replaceChild(preview,n[0]);
			});
			reader.readAsDataURL(raw);
		}
		
    console.log("select", boxId, event)
  }

  clearHandler(boxId, event) {
    console.log("clear", boxId, event)
  }

  removeHandler(boxId, event) {
    if(event.files[0].hasOwnProperty("id")) {
      deleteFileById(event.files[0].id, this)
    }
    console.log("remove", boxId, event)
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateState: (path, value) => dispatch({
      type: ActionList.SET_DATA,
      payload: {
        "path": path,
        "value": value,
      }
    }),
    addExtFileRef: (ids) => dispatch({
      type: ActionList.ADD_EXT_FILE_REF,
      payload: ids
    }),
    removeExtFileRef: (id) => dispatch({
      type: ActionList.REMOVE_EXT_FILE_REF,
      payload: id
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(UploadBox)
