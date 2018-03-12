import React from "react";
import { DateInput, Calendar } from '@progress/kendo-react-dateinputs';
import { labelCheck, defaultCheck, placeholderCheck } from '../util/InfoChecker';

export default class DateBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: labelCheck(this.props.config.label),
            required: this.props.config.required ? "required" : "",
            path: this.props.config.path,
            value: new Date(null),
        }
    }

    render() {

        return (
            <div className='k-form'>
                <div>
                    <p>{this.state.label}</p>
                    <DateInput value={this.state.value} onChange={this.changeDate} />
                </div>
                <div>
                    <Calendar value={this.state.value} onChange={this.changeDate} />
                </div>
            </div>
        );

    }

    changeDate = ({ value }) => {
        this.setState({ value });
    }

}
