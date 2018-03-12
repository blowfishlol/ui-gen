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
            contents: this.props.config.value.contents,

        }
    }

    render() {
        console.log(this.state.contents);
        const checkboxes = this.state.contents.map(content => {
            return (
                <div>
                    <input type="checkbox" className="k-checkbox" name={this.state.path} id={content.value} value={content.value}/>
                    <label className="k-checkbox-label" for={content.value}>{content.text}</label>
                </div>
            )
        });
        console.log(checkboxes);
        return(
            <div className="k-form">
                <label className="k-form-field">
                    <span>{this.state.label}</span>
                    {checkboxes}
                </label>
            </div>
        )

    }

}
