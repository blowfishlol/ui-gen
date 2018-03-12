import React from "react";


export default class TextBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.config.label,
            required: this.props.config.required ? "required" : "",
            path: this.props.config.path,
            default_value: this.props.config.value ? (this.props.config.value.hasOwnProperty("default") ? this.props.config.value.default : "") : "",
            placeholder: this.props.config.value ? (this.props.config.value.hasOwnProperty("placeholder") ? this.props.config.value.placeholder : "" ) : "",
        };

    }

    render() {

        return(
            <div>
                <label className="k-form-field">
                    <span>{this.state.label}</span>
                    <input className="k-textbox" placeholder={this.state.placeholder} value={this.state.default_value} name={this.statepath}/>
                </label>
            </div>
        )

    }

}
