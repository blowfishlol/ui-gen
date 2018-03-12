import React from "react";


export default class TextBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.config.label,
            required: this.props.config.required ? "required" : "",
            path: this.props.config.path,
            default: this.props.config.value ? (this.props.config.value.hasOwnProperty("default") ? this.props.config.value.default : "") : "",
            placeholder: this.props.config.value ? (this.props.config.value.hasOwnProperty("placeholder") ? this.props.configvalue.placeholder : "" ) : "",
        };

    }

    render() {

        return(
            <div>
                <label className="k-form-field">
                    <span>{this.props.config.label}</span>
                    <input className="k-textbox" placeholder={placeholder} value={default} name={path} {required}/>
                </label>
            </div>
        )

    }

}
