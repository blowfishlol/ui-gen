import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import ErrorBox from "../ErrorBox"
import BlankSpace from "../BlankSpace"

import {
  getSelectedDescription, getSelectedDescriptionContent,
  getSelectedTemplate
} from "../../util/descriptionDataGet"
import ActionList from "../../reducer/actionList"

class ImportConfigForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.userId,
      token: this.props.token,
      description_content_id: this.props.selectedDescContent,
      name: getSelectedTemplate().name,
      data: JSON.stringify(getSelectedTemplate().data)
    }
    if(this.props.selectedTemplate !== -1) {
      this.state.template_id = this.props.selectedTemplate
    }
  }

  isAllDataReady() {
    return !(this.state.name === "") && !(this.state.data === "")
  }

  onTemplateNameChangedListener(evt) {
    this.setState({
      ...this.state,
      name: evt.target.value
    })
  }

  onConfigChangedListener(evt) {
    this.setState({
      ...this.state,
      data: evt.target.value
    })
  }

  onImportBtnClickedListener() {
    if(!this.isAllDataReady()) {
      alert("All field must be filled")
      return
    }
    this.props.saveTemplate(this.state)
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
        <center><h1><b> Add New Template </b></h1></center>
      </div>

      <label className="k-form-field col-sm-12">
        <span>Description Name: {getSelectedDescription().name}</span>
      </label>
      <label className="k-form-field col-sm-12">
        <span>Description Version: {getSelectedDescriptionContent().version}</span>
      </label>
      <label className="k-form-field col-sm-12">
        <span>Version Name</span>
        <input
          className="k-textbox"
          placeholder="Description version name"
          value={this.state.name}
          onChange={evt => this.onTemplateNameChangedListener(evt)} />
      </label>
      <label className="k-form-field col-sm-12">
        <span>Template</span>
        <textarea
          className="k-textbox full-width-text-area"
          placeholder="Description"
          value={this.state.data}
          onChange={evt => this.onConfigChangedListener(evt)} />
      </label>

      <div className="col-sm-12">
        <BlankSpace space="20px"/>
        {error}
      </div>

      <div className="col-sm-12">
        <button className="k-button k-primary float-right"
          disabled={!this.isAllDataReady()}
          onClick={() => this.onImportBtnClickedListener()}>
            SAVE
        </button>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    selectedDescContent: storage.description.selected_desc_content_id,
    selectedTemplate: storage.description.selected_template_id,
    errorMessage: storage.nav.error_message,
    userId: storage.user.id,
    token: storage.user.token
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    saveTemplate: (bundle) => dispatch({
      type: ActionList.SAVE_TEMPLATE,
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
