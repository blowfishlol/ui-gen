import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DropDownList } from "@progress/kendo-react-dropdowns"
import PanelNavigator from "./PanelNavigator"
import Form from "../form-component/Form"

import { mergeAll } from "../../util/formDataGet"
import { getSelectedDescription, getSelectedConfig, getSelectedTemplate } from "../../util/activeDataGet"
import { getNode } from "../../util/panelBarInfo";
import { lastElementOf } from "../../util/toolbox"
import evaluator from "../../util/evaluator"
import ActionList from "../../reducer/actionList"
import BlankSpace from "../BlankSpace";
import {dialogOpen} from "../Dialog";

class FormSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditNameMode: false,
      configName: getSelectedConfig().name
    }

    this.props.assignDescription(this.getDefaultDescription()) // >.<
    this.props.assignTemplate(this.getDefaultTemplate()) // x_x
  }

  getDefaultDescription() {
    let currentConfig = getSelectedConfig()
    if(currentConfig.hasOwnProperty("configContent")) {
      if(currentConfig.configContent.hasOwnProperty("description")) {
        if(currentConfig.configContent.description.hasOwnProperty("id")) {
          return currentConfig.configContent.description.id
        }
      }
    }
    return lastElementOf(this.props.descriptions).id
  }

  getDefaultTemplate() {
    let currentConfig = getSelectedConfig()
    if(currentConfig.hasOwnProperty("configContent")) {
      if(currentConfig.configContent.hasOwnProperty("template")) {
        if(currentConfig.configContent.template.hasOwnProperty("id")) {
          return currentConfig.configContent.template.id
        }
      }
    }
    return lastElementOf(getSelectedDescription().templates).id
  }

  isRendered(obj) {
    if(obj.hasOwnProperty("rendered")) {
      return evaluator(obj.rendered)
    }
    return true
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

  componentDidUpdate(prevProps) {
    if(prevProps.selectedDescription !== this.props.selectedDescription) {
      this.props.cleanData()
    }
  }

  onDescriptionDropDownSelectedListener(index) {
    this.props.assignDescription(this.props.description[index].id)
  }

  onTemplateSelectorSelectedListener(index) {
    this.props.assignTemplate(index)
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
      description_id: getSelectedDescription().id,
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

  render() {
    let forms = this.props.paths.map(path => {
      return <Form
        key={path}
        path={path}
        component={getNode(getSelectedDescription().data, path.split("."))}
        selectedDesc={this.props.selectedDescription}
        selectedTemp={this.props.selectedTemplate} />
    })
    return <div className="page-root">
      {this.renderHeader()}
      <div className="row form-selector-padding">
        <div className="col-lg-2 col-sm-4 col-12 form-selector-label">Description Version</div>
        <div className="col-lg-4 col-sm-8 col-12">
          <DropDownList
            data={this.props.descriptions}
            textField={"version"}
            valueField={"id"}
            value={this.props.selectedDescription}
            onChange={evt => this.onDescriptionSelectorSelectedListener(evt.target.value)} />
        </div>
        <div className="col-lg-2 col-sm-4 col-12 form-selector-label">Template</div>
        <div className="col-lg-4 col-sm-8 col-12">
          <DropDownList
            data={getSelectedDescription().templates}
            textField={"name"}
            valueField={"id"}
            value={this.props.selectedTemplate}
            onChange={evt => this.onTemplateSelectorSelectedListener(evt.target.value)} />
        </div>
      </div>
      {forms.length ? forms : <div className="alert alert-success">No selected form exist</div> }
      <BlankSpace space="200px"/>
      <div className="k-form-field page-footer footer-bg-style">
        <button className="k-button k-primary float-right" onClick={() => this.onFinishBtnClickedListener()}>FINISH</button>
        <PanelNavigator />
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    configs: storage.config.configs,
    selectedConfig: storage.config.selected_id,
    descriptions: storage.description.descriptions,
    selectedDescription: storage.description.selected_id,
    selectedTemplate: storage.description.selected_template_id,
    paths: storage.form.paths,

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
    assignDescription: (id) => dispatch({
      type: ActionList.ASSIGN_DESCRIPTION,
      payload: id
    }),
    assignTemplate: (id) => dispatch({
      type: ActionList.ASSIGN_TEMPLATE,
      payload: id
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
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(FormSelector)
