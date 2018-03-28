import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import axios from "axios"
import $ from 'jquery'

import './UploadBox.css'
import "@progress/kendo-ui"
import { Upload } from '@progress/kendo-upload-react-wrapper'
import { Dialog } from '@progress/kendo-dialog-react-wrapper'

import { labelCheck } from '../../util/InfoChecker'
import  ActionList  from "../../reducer/actionList"
import server from "../../util/server"
import get from '../../data-accessor/formDataGet'

const fetchFileById = (id, context) => {
  axios.post(server + "/file/request/" + id)
    .then((response) => {
      context.setState({
        ...context.state,
        files: context.state.files.concat(response.data)
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
          return id !== response.data
        }),
        files: context.state.files.filter(file => {
          return file.id !== response.data
        })
      })
      context.props.removeExtFileRef(response.data)
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
    this.dialogActions = [
      {
        text:"Yes",
        primary:true,
        action:function(e) {
          e.sender.options.delete()
          e.sender.close()
        }
      },
      {
        text:"No",
        action:function(e) {
          e.sender.close()
        }
      }
    ]
    this.clickedImageId = -1
    this.state = {
      label: labelCheck(this.props.form.label),
      path: this.props.form.path,
      names: [],
      ids: get(this.props.form.path, this.props.form.type),
      files: []
    }
    this.idsFromDB = get(this.props.form.path, this.props.form.type)
    this.boxId = this.props.form.path + ":UploadBox"
    this.props.addExtFileRef(this.state.ids)
    this.state.ids.forEach(id => {
      fetchFileById(id, this)
    })
  }

  open(id) {
    if(this.idsFromDB.find(idFromDB => idFromDB === id) === undefined) {
      return
    }
    this.clickedImageId = id
    console.log("this one should be opened!", id)
    $('[data-role="dialog"]').data('kendoDialog').open()
  }

  deleteImage() {
    console.log(this.clickedImageId)
    this.setState({
      ...this.state,
      ids: this.state.ids.filter(id => {
        return id !== this.clickedImageId
      }),
      files: this.state.files.filter(file => {
        return file.id !== this.clickedImageId
      })
    })
    this.props.removeExtFileRef(this.clickedImageId)
    this.props.addRemovedExtFileRef(this.clickedImageId)
  }

  render() {
    var storedFile = ""
    if(this.state.files) {
      storedFile = this.state.files.map((file, index) => {
        var reader = new FileReader()
				var preview = document.createElement("IMG")
				var base = ""

				reader.addEventListener("load", function () {
					preview.src = reader.result
					try {
						var image = document.getElementById(file.uid)
						image.src = reader.result
					} catch (e) {
					}
				}, false)

				try {
					reader.readAsDataURL(file.rawFile)
				} catch (e) {
					var rawResponse = file.rawFile
					base = "data:image/png;base64," + rawResponse
				}

				return <img
          width={100}
          height={100}
          key={this.boxId + "." + index}
          id={file.uid}
          className="img-thumbnail"
          src={base}
          alt=""
          onClick={() => this.open(file.id)}/>
			})
    }

    return <div className="k-form-field">
      <span id="abc">{this.state.label}</span>
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

      <Dialog visible={false} minWidth={250} width={450} actions={this.dialogActions} delete={() => this.deleteImage()}>
        <p style={{margin: "30px", textAlign: "center"}}>Do you want to delete this image?</p>
      </Dialog>
    </div>
  }

  completeHandler(event) {
  }

  uploadHandler(event) {
    var files = event.files
    var nameState = this.state.names
    files.forEach((file) => {
      nameState.push(file.name)
      this.setState({names: nameState})
    })
  }

  successHandler(event) {
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

  selectHandler(boxId, event) {
  }

  clearHandler(boxId, event) {
  }

  removeHandler(boxId, event) {
    if(event.files[0].hasOwnProperty("id")) {
      deleteFileById(event.files[0].id, this)
    }
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
    }),
    addRemovedExtFileRef: (id) => dispatch({
      type: ActionList.ADD_REMOVED_EXT_FILE_REF,
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
