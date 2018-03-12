import React from "react";
import '@progress/kendo-theme-material/dist/all.css';
import { labelCheck, defaultCheck, placeholderCheck, requiredCheck } from '../util/InfoChecker';

export default class CheckBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: labelCheck(this.props.config.label),
            required: requiredCheck(this.props.config.required),
            path: this.props.config.path,
        }
    }

    render() {

        return(
            <div className="k-form">
                <div className="k-form-field">
                    <input type="checkbox" className="k-checkbox" name={this.state.path} id={this.state.path}/>
                    <label className="k-checkbox-label" for={this.state.path}>{this.state.label}</label>
                </div>
            </div>
        )

    }

}
