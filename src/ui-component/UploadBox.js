import React from "react";
import '@progress/kendo-theme-material/dist/all.css';
import { Upload } from '@progress/kendo-upload-react-wrapper';
import "@progress/kendo-ui";
import { labelCheck } from '../util/InfoChecker';

export default class UploadBox extends React.Component {

    constructor(props) {
        super(props);
        this.async = {
            saveUrl: "http://my-app.localhost/save",
            removeUrl: "http://my-app.localhost/remove",
            autoUpload: false
        }
        this.dropZone = ".dropZoneElement"
        this.state = {
            label: labelCheck(this.props.config.label),
            path: this.props.config.path,
        }

    }

    render() {
        const maboi = <Upload className="upppp" id="up" async= {this.async} dropZone={this.dropZone} select={this.selectHandler} clear={this.clearHandler} remove={this.removeHandler}/> ;
        return (
            <div className="k-form-field" id="ba">
                <div className="dropZoneElement">Drag and drop {this.state.label} here </div>
                {maboi}
                <div id="imageCollection"></div>
            </div>
        );
    }

    selectHandler(event) {
        var preview = document.createElement("IMG");
        var files = event.files;
        var file = files[0];
        var fileRaw = file.rawFile;
        var reader = new FileReader();

        console.log(files[0]);

        preview.setAttribute("width", 100);
        preview.setAttribute("height", 100);
        preview.setAttribute("id", file.uid);

        reader.addEventListener("load", function () {
           preview.src = reader.result;
         }, false);

        reader.readAsDataURL(fileRaw);
        document.getElementById("imageCollection").appendChild(preview);
    }

    /**
    *Clear means remove all upload from the list.
    **/
    clearHandler(event) {
        var coll = document.getElementById("imageCollection");
        while(coll.hasChildNodes()){
            coll.removeChild(coll.firstChild);
        }
    }

    removeHandler(event) {

        console.log(event);
        const uid = event.files[0].uid;
        document.getElementById(uid).remove();
    }



}
