import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import ErrorBox from "../ErrorBox"
import BlankSpace from "../BlankSpace"

import { getSelectedDescription, getSelectedDescriptionContent } from "../../util/descriptionDataGet"
import ActionList from "../../reducer/actionList"

class ImportConfigForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.userId,
      token: this.props.token,
      description_id: this.props.descId,
      version: getSelectedDescriptionContent().version,
      data: JSON.stringify(getSelectedDescriptionContent().data)
    }
    if(this.props.descContentId !== -1) {
      this.state.description_content_id = this.props.descContentId
    }
  }

  isAllDataReady() {
    return !(this.state.version === "") && !(this.state.data === "")
  }

  onVersionNameChangedListener(evt) {
    this.setState({
      ...this.state,
      version: evt.target.value
    })
  }

  onDescChangedListener(evt) {
    this.setState({
      ...this.state,
      data: evt.target.value
    })
  }

  onSaveBtnClickedListener() {
    if(!this.isAllDataReady()) {
      alert("All field must be filled")
      return
    }
    this.props.saveDescriptionContent(this.state)
  }

  componentWillUnmount() {
    this.props.onExit()
  }

  render() {
    if(this.props.errorMessage !== "") {
      var error = <ErrorBox message={this.props.errorMessage} />
    }
    return <div className="row k-form page-root">
      <div className="col-sm-12">
        <center><h1><b> Add Description Version </b></h1></center>
      </div>

      <label className="k-form-field col-sm-12">
        <span>Description Name: {getSelectedDescription().name}</span>
      </label>
      <label className="k-form-field col-sm-12">
        <span>Version Name</span>
        <input
          className="k-textbox"
          placeholder="Description version name"
          value={this.state.version}
          onChange={evt => this.onVersionNameChangedListener(evt)} />
      </label>
      <label className="k-form-field col-sm-12">
        <span>Description</span>
        <textarea
          className="k-textbox full-width-text-area"
          placeholder="Description"
          value={this.state.data}
          onChange={evt => this.onDescChangedListener(evt)} />
      </label>

      <div className="col-sm-12">
        <BlankSpace space="20px"/>
        {error}
      </div>

      <div className="col-sm-12">
        <button className="k-button k-primary float-right"
          disabled={!this.isAllDataReady()}
          onClick={() => this.onSaveBtnClickedListener()}>
            SAVE
        </button>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    descId: storage.description.selected_id,
    descContentId: storage.description.selected_desc_content_id,
    errorMessage: storage.nav.error_message,
    userId: storage.user.id,
    token: storage.user.token
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    saveDescriptionContent: (bundle) => dispatch({
      type: ActionList.SAVE_DESCRIPTION_CONTENT,
      payload: bundle
    }),
    onExit: () => dispatch({
      type: ActionList.ON_FORM_EXIT
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ImportConfigForm)
