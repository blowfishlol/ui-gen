import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DropDownList } from "@progress/kendo-react-dropdowns"
import PanelNavigator from "./PanelNavigator"
import PageNavigator from "./PageNavigator"
import Form from "../form-component/Form"

import { setByIndex } from "../../util/formDataGet"
import { getSelectedDescription, getSelectedConfig, getSelectedTemplate } from "../../util/activeDataGet"
import { getNode } from "../../util/panelBarInfo";
import { lastElementOf } from "../../util/toolbox"
import evaluator from "../../util/evaluator"
import ActionList from "../../reducer/actionList"

import sample from "../../example"

class FormSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditNameMode: false,
      configName: getSelectedConfig().name
    }

    this.props.assignDescription(this.getDefaultDescription()) // >.<
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
      return <Form path={path} component={getNode(getSelectedDescription(), path.split("."))} />
    })
    return <div className="pageRoot">
      {this.renderHeader()}
      <table className="descSelectorTable">
        <tbody>
          <tr>
            <td>Description Version&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>
              <DropDownList
                data={this.props.descriptions}
                textField={"version"}
                valueField={"id"}
                value={this.props.selectedDescription}
                onChange={evt => this.onDescriptionSelectorSelectedListener(evt.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Template&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>
              trus di sini ada drop down ceritanya
            </td>
          </tr>
        </tbody>
      </table>
      <PanelNavigator />
      {forms}
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    configs: storage.config.configs,
    selectedConfig: storage.config.selected_id,
    templates: storage.template.templates,
    selectedTemplate: storage.template.selected_id,
    descriptions: storage.description.descriptions,
    selectedDescription: storage.description.selected_id,

    paths: storage.form.paths
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
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(FormSelector)
