import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import App from './App';
import ErrorBox from './ErrorBox';

import get from '../../data-accessor/formDataGet';
import getLayoutString from '../../util/LayoutProcessor'

class ArrayInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childData: Array(get(this.props.form.path, this.props.form.type).length).fill("this data is just a filler"),
      layout: getLayoutString(this.props.form.layout),
    };
  }

  add() {
    /**
     * [MOTI]
     * the data inside array does not matter
     * class only see the array length
     * used to repliate same component in render
     */
    this.setState({
      ...this.state,
      childData: this.state.childData.concat(["just to replicate child"])
    });
  }

  render() {
    if(!this.props.hasOwnProperty("form")) {
      return <ErrorBox message="Config is missing" />
    } else if(!this.props.form.hasOwnProperty("child_content")) {
      return <ErrorBox message="Content is missing" />
    } else if(!this.props.form.child_content.hasOwnProperty("type")) {
      return <ErrorBox message="Content type is missing" />
    }

    var elements = this.state.childData.map((element, index) => {
      return <div key={this.props.form.path + "." + index}>
        <App
          form={[{
              label: "",
              type: this.props.form.child_content.type,
              path: this.props.form.path + "." + index
            }]} />
      </div>
    });

    return <div className="k-form-field">
      <span>{this.props.form.label}</span>
      <div>
        {elements}
      </div>
      <button className="k-button k-primary" onClick={() => this.add()}>ADD</button>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(ArrayInput)
