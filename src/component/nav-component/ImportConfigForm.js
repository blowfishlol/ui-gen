import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import DescriptionSelector from "./DescriptionSelector"
import ErrorBox from "../ErrorBox"

import ActionList from "../../reducer/actionList"
import BlankSpace from "../BlankSpace"
import {
  getSelectedDescription, getSelectedDescriptionContent,
  getSelectedTemplate
} from "../../util/descriptionDataGet"

class ImportConfigForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      versionName: "",
      data: ""
    }
  }

  isDescriptionDataMissing() {
    return this.props.selectedDescription === -1 ||
      this.props.selectedDescContent === -1 ||
      this.props.selectedTemplate === -1
  }

  isAllDataReady() {
    return !(this.state.versionName === "") && !(this.state.data === "") && !this.isDescriptionDataMissing()
  }

  onConfigNameChangedListener(evt) {
    this.setState({
      ...this.state,
      versionName: evt.target.value
    })
  }

  onDataChangedListener(evt) {
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
    this.props.saveConfig({
      name: this.state.versionName,
      id: this.props.userId,
      data: this.state.data,
      modified_paths: [],
      description_id: getSelectedDescription().id,
      description_content_id: getSelectedDescriptionContent().id,
      template_id: getSelectedTemplate().id,
      file_id: [],
      removed_file_id: [],
      token: this.props.token
    })
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
        <center><h1><b> Import Configuration </b></h1></center>
      </div>

      <label className="k-form-field col-sm-12">
        <span>Config Name</span>
        <input
          className={"k-textbox"}
          placeholder={"Configuration name"}
          value={this.state.versionName}
          onChange={evt => this.onConfigNameChangedListener(evt)} />
      </label>
      <label className="k-form-field col-sm-12">
        <span>Config Data</span>
        <textarea
          className={"k-textbox full-width-text-area"}
          placeholder={"Data"}
          value={this.state.data}
          onChange={evt => this.onDataChangedListener(evt)} />
      </label>
      <label className="k-form-field col-sm-12">
        <DescriptionSelector showDialof={false} />
      </label>

      <div className="col-sm-12">
        <BlankSpace space="20px"/>
        {error}
      </div>

      <div className="col-sm-12">
        <button className="k-button k-primary float-right"
          disabled={!this.isAllDataReady()}
          onClick={() => this.onImportBtnClickedListener()}>
            IMPORT
        </button>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    selectedDescription: storage.description.selected_id,
    selectedDescContent: storage.description.selected_desc_content_id,
    selectedTemplate: storage.description.selected_template_id,
    errorMessage: storage.nav.error_message,

    userId: storage.user.id,
    token: storage.user.token,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    saveConfig: (config) => dispatch({
      type: ActionList.SAVE_CONFIG,
      payload: config
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
