import React from "react";

import { connect } from "react-redux";
import { compose } from "recompose";
import  ActionList  from "./../reducer/actionList"

import './UploadBox.css'
import "@progress/kendo-ui";
import { Upload } from '@progress/kendo-upload-react-wrapper';
import { labelCheck } from '../util/InfoChecker';

class UploadBox extends React.Component {

  constructor(props) {
    super(props);
    this.async = {
      saveUrl: "http://www.mocky.io/v2/5aa927ba3200003a2d165b66",
      removeUrl: "http://www.mocky.io/v2/5aa927ba3200003a2d165b66",
      autoUpload: false
    }
    this.dropZone = ".dropZoneElement";
    this.state = {
      label: labelCheck(this.props.config.label),
      path: this.props.config.path,
      names: [],
    };
    this.boxId ="imageCollection"+Math.floor(Math.random() * Math.floor(50000));
  }

  render() {
    /**
     * [Wibi]
     * upload event means that each individual file is uploaded
     * complete event means that All images are done uploading.
     * In in case of upload, it will push the name of the uploaded file into the state containing the names collection
     * If all files have completed the upload, complete event will trigger and will set the names of the uploadbox state to the app state.
     * TODO: Fix the styling of the drop box. currently not accurate and weird.
     **/
    return <div className="k-form-field">
      <Upload
        className="col-*-3"
        async={this.async}
        dropZone={this.dropZone}
        complete={(event) => {
          this.props.updateState(this.state.path, this.state.names);
        }}
        upload={(event) => {
          var files = event.files;
          var nameState = this.state.names;
          files.forEach((file) => {
            nameState.push(file.name)
            this.setState({names: nameState});
          });
        }}
        select={(event) => {this.selectHandler(this.boxId, event)}}
        clear={(event) => {this.clearHandler(this.boxId, event)}}
        remove={(event) => {this.removeHandler(this.boxId, event)}} />
        <div className="dropZoneElement">Drag and drop {this.state.label} here </div>
      <div id={this.boxId} className="col-*-3"></div>
    </div>
  }

  selectHandler(boxId, event) {
    var files = event.files;
    files.forEach((file) => {
      var preview = document.createElement("IMG");
      var fileRaw = file.rawFile;
      var reader = new FileReader();
      preview.setAttribute("width", 100);
      preview.setAttribute("height", 100);
      preview.setAttribute("id", file.uid);
      preview.setAttribute("class", "img-thumbnail")

      reader.addEventListener("load", function () {
         preview.src = reader.result;
       }, false);

      reader.readAsDataURL(fileRaw);
      document.getElementById(boxId).appendChild(preview);
    });
  }

  /**
  *Clear means remove all upload from the list.
  **/
  clearHandler(boxId,event) {
    var coll = document.getElementById(boxId);
    while(coll.hasChildNodes()){
      coll.removeChild(coll.firstChild);
    }
  }

  removeHandler(boxId,event) {
    const uid = event.files[0].uid;
    document.getElementById(uid).remove();
  }

  /**
  *TODO: If API available, change the names into the ID that they get from the server.
  **/
  uploadHandler(event,self) {
    var files = event.files;

    var names = [];
    files.forEach((file) => {
        names.push(file.name);
    });

    self.props.updateState(this.state.path, names);
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateState: (path,value) => dispatch({
      type: ActionList.SET,
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
)(UploadBox)
