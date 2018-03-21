import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import PageNavigator from "./PageNavigator"

import ActionList from "../../reducer/actionList"

class FormSelector extends React.Component {

  constructor(props) {
    super(props)
    this.props.setDescription(this.props.descriptions[0].description)
  }

  render() {
    return <div>
      <PageNavigator description={this.props.descriptions[0].description} />
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDescription: (desc) => dispatch({
      type: ActionList.SET_DESCRIPTION,
      payload: desc
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(FormSelector)
