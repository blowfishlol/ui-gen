import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import PanelNavigator from "./PanelNavigator"
import Form from "../form-component/Form"
import FormSelectorMenu from "./DescriptionSelector"

import { mergeAll } from "../../util/formDataGet"
import {
  getSelectedDescription, getSelectedConfig, getSelectedTemplate,
  getSelectedDescriptionContent
} from "../../util/descriptionDataGet"
import { getNode } from "../../util/panelBarInfo"
import ActionList from "../../reducer/actionList"
import BlankSpace from "../BlankSpace"
import { dialogOpen } from "../Dialog"

class FormSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditNameMode: false,
      configName: getSelectedConfig().name
    }
  }

  isDescriptionDataMissing() {
    return this.props.selectedDescription === -1 ||
      this.props.selectedDescContent === -1 ||
      this.props.selectedTemplate === -1
  }

  onConfigNameChangedListener(evt) {
    this.setState({
      ...this.state,
      configName: evt.target.value
    })
  }

  onConfigNameEditBtnClicked() {
    if(this.state.isEditNameMode) {
      this.props.changeConfigName(this.state.configName)
    }
    this.setState({
      ...this.state,
      isEditNameMode: !this.state.isEditNameMode
    })
  }

  onFinishBtnClickedListener() {
    this.props.setDialogMessage("Save this configuration as \"" + getSelectedConfig().name + "\"?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.saveConfig()
    })
    dialogOpen()
  }

  saveConfig() {
    let finalConfig = {
      name: getSelectedConfig().name,
      id: this.props.userId,
      data: JSON.stringify(mergeAll()),
      modifiedPaths: this.props.paths,
      description_id: getSelectedDescription().id,
      description_content_id: getSelectedDescriptionContent().id,
      template_id: getSelectedTemplate().id,
      file_id: this.props.extFileRef,
      removed_file_id: this.props.removedExtFileRef,
      token: this.props.token
    }
    if(getSelectedConfig().id !== -1) {
      finalConfig.config_id = getSelectedConfig().id
    }
    this.props.saveConfig(finalConfig)
  }

  renderHeader() {
    if(this.state.isEditNameMode) {
      return <div className="formSelectorHeader">
        <input
          className="k-textbox"
          type="text"
          value={this.state.configName}
          onChange={evt => this.onConfigNameChangedListener(evt)} />
        <button className="k-button" onClick={() => this.onConfigNameEditBtnClicked()}>CHANGE</button>
      </div>
    } else {
      return <h1 className="formSelectorHeader">
        {getSelectedConfig().name}
        &nbsp;&nbsp;
        <button className="k-button" onClick={() => this.onConfigNameEditBtnClicked()}>EDIT</button>
      </h1>
    }
  }

  componentWillUnmount() {
    this.props.onExit()
  }

  render() {
    let body
    if(this.isDescriptionDataMissing()) {
      body = <div className="alert alert-warning">Description, Description Version and Template must be assigned first</div>
    } else if(!this.props.paths.length) {
      body = <div className="alert alert-success">No selected form exist</div>
    } else {
      body = this.props.paths.map(path => {
        return <Form
          key={path}
          path={path}
          component={getNode(getSelectedDescriptionContent().data, path.split("."))} />
      })
    }
    return <div className="page-root">
      {this.renderHeader()}
      <FormSelectorMenu showDialog={true} />
      {body}
      <BlankSpace space="200px"/>
      <div className="k-form-field page-footer footer-bg-style">
        <button
          className="k-button k-primary float-right"
          disabled={this.isDescriptionDataMissing()}
          onClick={() => this.onFinishBtnClickedListener()}>
            FINISH
        </button>
        <PanelNavigator disabled={this.isDescriptionDataMissing()}/>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    paths: storage.form.paths,
    selectedDescription: storage.description.selected_id,
    selectedDescContent: storage.description.selected_desc_content_id,
    selectedTemplate: storage.description.selected_template_id,

    userId: storage.user.id,
    token: storage.user.token,
    extFileRef: storage.form.ext_file_ids,
    removedExtFileRef: storage.form.removed_ext_file_ids
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cleanData: () => dispatch({
      type: ActionList.CLEAR_DATA
    }),
    changeConfigName: (name) => dispatch({
      type: ActionList.CHANGE_CURRENT_CONFIG_NAME,
      payload: name
    }),
    saveConfig: (config) => dispatch({
      type: ActionList.SAVE_CONFIG,
      payload: config
    }),
    setDialogMessage: (message) => dispatch({
      type: ActionList.SET_DIALOG_MESSAGE,
      payload: message
    }),
    setDialogFinishFunction: (methods) => dispatch({
      type: ActionList.SET_ADDITIONAL_METHOD,
      payload: methods
    }),
    onExit: () => dispatch({
      type: ActionList.ON_FORM_EXIT
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(FormSelector)
