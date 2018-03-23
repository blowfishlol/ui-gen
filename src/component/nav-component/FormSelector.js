import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { DropDownList } from '@progress/kendo-react-dropdowns';
import PageNavigator from "./PageNavigator"

import { setByIndex } from "../../data-accessor/formDataGet"
import evaluator from "../../util/evaluator"
import ActionList from "../../reducer/actionList"
import ComponentType from "../ComponentType"

class FormSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditNameMode: false,
      configName: this.props.config.name,
      selectedDescriptionId: this.getDefaultDescription()
    }
    this.props.setConfig(this.props.config.configContents)
    this.prepareFormData()
  }

  lastElementOf(arr) {
    return arr[arr.length - 1]
  }

  getDefaultDescription() {
    if(this.props.config.hasOwnProperty("configContents")) {
      if(this.props.config.hasOwnProperty("description")) {
        if(this.props.config.hasOwnProperty("id")) {
          return this.props.config.configContents.description.id
        }
      }
    }
    return this.lastElementOf(this.props.descriptions).id
  }

  getSelectedDescription() {
    return this.props.descriptions.find(element => {
      return this.state.selectedDescriptionId === element.id
    }).description
  }

  /**
   * Have to be performed everytime this component re render
   * otherwise some data may not be available (when it should be)
   * on evaluate() call in PageNavigator
   * or some old data / app_state may remain when changing description
   * resulting on some unexpected behaviour
   */
  prepareFormData() {
    this.props.cleanData()
    this.props.cleanState()
    this.props.setDescription(this.getSelectedDescription())
    this.getSelectedDescription().forEach((page, index) => {
      if(page.hasOwnProperty("rendered")) {
        if(!evaluator(page.rendered)) {
          return
        }
      }
      page.form.forEach(element => {
        if(element.type === ComponentType.ARRAY || element.type === ComponentType.MAP) {
          return
        }
        if(element.hasOwnProperty("rendered")) {
          if(!evaluator(element.rendered)) {
            return
          }
        }
        setByIndex(element.path, element.type, index)
      })
    })
  }

  render() {
    if(this.state.isEditNameMode) {
      var formSelectorHeader = <div className="formSelectorHeader">
        <input
          classname="k-textbox"
          type="text"
          value={this.state.configName}
          onChange={evt => this.updateConfigName(evt)} />
        <button className="k-button" onClick={() => this.onTopButtonClicked()}>CHANGE</button>
      </div>
    } else {
      var formSelectorHeader = <h1 className="formSelectorHeader">
        {this.props.config.name}
        &nbsp;&nbsp;
        <button className="k-button" onClick={() => this.onTopButtonClicked()}>EDIT</button>
      </h1>
    }
    return <div>
      {formSelectorHeader}
      <table className="descSelectorTable">
        <tbody>
          <tr>
            <td>Description Version&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>
              <DropDownList
                data={this.props.descriptions}
                textField={'name'}
                valueField={'id'}
                value={this.state.selectedDescriptionId}
                onChange={(evt) => {
                  this.setState({
                    ...this.state,
                    selectedDescriptionId: evt.target.value
                  }, () => this.prepareFormData())
                }} />
            </td>
          </tr>
        </tbody>
      </table>
      <PageNavigator
        description={this.getSelectedDescription()}
        config={this.props.config.data}/>
    </div>
  }

  updateConfigName(evt) {
    this.setState({
      ...this.state,
      configName: evt.target.value
    })
  }

  onTopButtonClicked() {
    if(this.state.isEditNameMode) {
      this.props.changeConfigName(this.state.configName)
    }
    this.setState({
      ...this.state,
      isEditNameMode: !this.state.isEditNameMode
    })
  }
}

const mapStateToProps = function(storage) {
  return {
    config: storage.config.current_config,
    descriptions: storage.description.descriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setConfig: (config) => dispatch({
      type: ActionList.SET_CONFIG,
      payload: config
    }),
    setDescription: (desc) => dispatch({
      type: ActionList.SET_DESCRIPTION,
      payload: desc
    }),
    cleanData: () => dispatch({
      type: ActionList.CLEAR_DATA,
      payload: {
      }
    }),
    cleanState: () => dispatch({
      type: ActionList.CLEAR_STATE,
      payload: {
      }
    }),
    changeConfigName: (name) => dispatch({
      type: ActionList.CHANGE_CURRENT_CONFIG_NAME,
      payload: name
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(FormSelector)
