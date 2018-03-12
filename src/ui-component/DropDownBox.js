import React from "react";
import { DateInput, Calendar } from '@progress/kendo-react-dateinputs';
import { labelCheck, defaultCheck, placeholderCheck,requiredCheck } from '../util/InfoChecker';
import { DropDownList } from '@progress/kendo-react-dropdowns';
export default class DropDownBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: labelCheck(this.props.config.label),
            required: requiredCheck(this.props.config.required),
            path: this.props.config.path,
            values: this.props.config.value.contents,
            selected: this.props.config.value.default,//TODO: JANGAN LUPA GANTI YAA!!!!!!!!
        }
    }

    render() {

        return(
            <div>
                <div>{this.props.config.label}</div>
                <DropDownList data={this.state.values} textField={'text'} valueField={'value'}/*TODO FIX THIS ARGHG defaultItem={this.state.selected}*//>
            </div>
        )

    }

}
