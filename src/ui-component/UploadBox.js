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
        const maboi = <Upload className="upppp" id="up" async= {this.async} dropZone={this.dropZone}/> ;
        return (
            <div className="k-form-field" id="ba">
                <div className="dropZoneElement">Drag and drop {this.state.label} here </div>
                {maboi}
            </div>
        );
    }
}
