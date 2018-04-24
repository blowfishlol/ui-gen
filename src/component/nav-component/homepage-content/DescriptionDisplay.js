import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import DescriptionTable from "./DescriptionTable"
import BlankSpace from "../../BlankSpace"
import ErrorBox from "../../ErrorBox"
import DescriptionWindowComponent from "./DescriptionWindowComponent"
import {windowClose, windowOpen} from "../../Window";
import ActionList from "../../../reducer/actionList";

class DescriptionDisplay extends React.Component {

  renderNewDescriptionPrompt() {
    return <div>
      <DescriptionWindowComponent />
    </div>
  }

  onNewDescriptionBtnClickedListener() {
    this.props.setWindow({
      title: "New Description",
      content: this.renderNewDescriptionPrompt(),
      width: "50%",
      height: "15%"
    })
    windowOpen()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.notifier !== nextProps.notifier) {
      windowClose()
    }
    return true
  }

  render() {
    let body
    if(this.props.errorMessage !== "") {
      body = <ErrorBox message={this.props.errorMessage} />
    } else if(!this.props.isDescriptionFetched) {
      body = <div className="col-sm-12 alert alert-info">Loading data</div>
    } else {
      body = <DescriptionTable/>
    }

    return <div className="page-root">
      <h1>Descriptions</h1>
      {body}
      <BlankSpace space="50px"/>
      <div className="k-form-field page-footer footer-bg-style">
        <button className="k-button k-primary float-right" onClick={() => this.onNewDescriptionBtnClickedListener()}>NEW DESCRIPTION</button>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    isDescriptionFetched: storage.description.fetched,
    errorMessage: storage.nav.error_message,
    notifier: storage.description.notifier
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    setWindow: (bundle) => dispatch({
      type: ActionList.SET_WINDOW,
      payload: bundle
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DescriptionDisplay);
