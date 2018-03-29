import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import axios from "axios"

import "./UploadBox.css"
import { Upload } from "@progress/kendo-upload-react-wrapper"

import { dialogOpen } from "../ConfirmationDialog"
import { labelCheck } from "../../util/InfoChecker"
import  ActionList  from "../../reducer/actionList"
import server from "../../util/server"
import get from "../../data-accessor/formDataGet"

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
      context.props.updateState(context.props.form.path, context.state.ids)
      context.props.removeExtFileRef(response.data)
    })
    .catch((err) => {
      console.log("ERROR", err)
    })
}

class UploadBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      label: labelCheck(this.props.form.label),
      path: this.props.form.path,
      names: [],
      ids: get(this.props.form.path, this.props.form.type),
      files: []
    }
    this.async = {
      saveUrl: (server + "/file/upload"),
      removeUrl: "http://www.mocky.io/v2/5aa927ba3200003a2d165b66",
      autoUpload: false,
      saveField: "file"
    }
    this.clickedImageId = -1
    this.idsFromDB = get(this.props.form.path, this.props.form.type)

    this.props.addExtFileRef(this.state.ids)
    this.state.ids.forEach(id => {
      fetchFileById(id, this)
    })
  }

  parseStoredFiles() {
    return this.state.files.map((file, index) => {
      var reader = new FileReader()
      var preview = document.createElement("IMG")
      var base = ""

      return <img width={100} height={100} key={this.props.form.path+"."+index} className="img-thumbnail" src={server+ "/file/download/" + file.id} alt="" onClick={() => this.showDeleteConfirmDialog(file)} />

    })
  }

  render() {
    console.log("debug", this.state.files)
    var storedFile = ""
    if(this.state.files) {
      storedFile = this.parseStoredFiles()
    }

    return <div className="k-form-field">
      <span>{this.state.label}</span>
      <Upload
        className="col-*-3"
        async={this.async}
        dropZone=".dropZoneElement"
        complete={event => this.completeHandler(event)}
        upload={event => this.uploadHandler(event)}
        success={event => this.successHandler(event)}
        select={event => this.selectHandler(event)}
        clear={event => this.clearHandler(event)}
        remove={event => this.removeHandler(event)} />
      <div className="dropZoneElement col-*-3">Drag and drop {this.state.label} here </div>
      <div>{storedFile}</div>
    </div>
  }

  completeHandler(event) {
  }

  uploadHandler(event) {
    event.files.forEach((file) => {
      this.setState({
        ...this.state,
        names: this.state.names.concat(file.name)
      })
    })
  }

  successHandler(event) {
    if(typeof event.response.data !== "number") {
      return
    }
    event.files[0].id = event.response.data
    console.log(event)
    this.setState({
      ...this.state,
      ids: this.state.ids.concat(event.response.data),
      files: this.state.files.concat(event.files[0])
    })
    this.props.updateState(this.props.form.path, this.state.ids)
    this.props.addExtFileRef(event.response.data)
  }

  selectHandler(event) {
  }

  clearHandler(event) {
  }

  removeHandler(event) {
    if(event.files[0].hasOwnProperty("id")) {
      deleteFileById(event.files[0].id, this)
    }
  }

  showDeleteConfirmDialog(file) {
    if(this.idsFromDB.find(idFromDB => idFromDB === file.id) === undefined) {
      return
    }
    this.clickedImageId = file.id
    this.props.setDialogMessage("Delete \"" + file.originalFileName + "\"?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.deleteImage()
    })
    dialogOpen()
  }

  deleteImage() {
    this.setState({
      ...this.state,
      ids: this.state.ids.filter(id => {
        return id !== this.clickedImageId
      }),
      files: this.state.files.filter(file => {
        return file.id !== this.clickedImageId
      })
    })
    this.props.updateState(this.props.form.path, this.state.ids)
    this.props.removeExtFileRef(this.clickedImageId)
    this.props.addRemovedExtFileRef(this.clickedImageId)
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
    }),
    setDialogMessage: (message) => dispatch({
      type: ActionList.SET_DIALOG_MESSAGE,
      payload: message
    }),
    setDialogFinishFunction: (methods) => dispatch({
      type: ActionList.SET_ADDITIONAL_METHOD,
      payload: methods
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(UploadBox)
