import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { TabStrip, TabStripTab } from "@progress/kendo-react-layout"
import PageNavigatorSearchBox from "./PageNavigatorSearchBox"
import Form from "../form-component/Form"
import BlankSpace from "../BlankSpace"

import { dialogOpen } from "../Dialog"
import evaluator from "../../util/evaluator"
import { fetchAllData, getNoDispatch } from "../../util/formDataGet"
import { set } from "../../reducer/formReducer"
import ActionList from "../../reducer/actionList"

class PageNavigator extends Component {

  getLastAppState() {
    return this.props.appState[this.props.appState.length - 1]
  }

  getCurrentDescription() {
    return this.props.description[this.getLastAppState()]
  }

  isLastPage(navBar) {
    return navBar.findIndex(navbar => navbar.props.hasOwnProperty("current")) === navBar.length - 1
  }

  renderCheck(obj) {
    if(obj.hasOwnProperty("rendered")) {
      return evaluator(obj.rendered)
    }
    return true
  }

  fetchRemainingData() {
    var currentData = fetchAllData()
    this.props.description.slice(this.getLastAppState(), this.props.description.length).forEach(page => {
      if(this.renderCheck(page) === false) {
        return
      }
      page.form.forEach(element => {
        if(this.renderCheck(element) === false) {
          return
        }
        currentData = set(element.path.split("."), getNoDispatch(element.path, element.type), currentData)
      })
    })
    return currentData
  }

  render() {
    const navBar = this.props.description.map((page, index) => {
      const current = this.getCurrentDescription()
      const content = <div>
        <table width="100%">
          <tbody>
            <tr>
              <td><h2>{current.pagename}</h2></td>
              <td className="float-right">
                <PageNavigatorSearchBox />
              </td>
            </tr>
          </tbody>
        </table>
        <Form form={current.form} />
      </div>

      if(page.hasOwnProperty("rendered")) {
        if(!evaluator(page.rendered)) {
          this.props.popData(index)
          /**
           * return 0, will be filtered later
           */
          return 0
        }
      }
      if(index === this.getLastAppState()) {
        return <TabStripTab key={index} current={true} disabled={true} title={page.pagename}>{content}</TabStripTab>
      } else if(index >= this.getLastAppState()) {
        return <TabStripTab key={index}  disabled={!this.props.isAllowedToJumpFoward} title={page.pagename}>{content}</TabStripTab>
      } else {
        return <TabStripTab key={index} title={page.pagename}>{content}</TabStripTab>
      }
    }).filter(nav => nav !== 0)

    return <div>
      <TabStrip
        selected={navBar.findIndex(navbar => navbar.props.hasOwnProperty("current"))}
        onSelect={(e) => this.onTabStripSelectedListener(e.selected, navBar)}>
          {navBar}
      </TabStrip>
      <BlankSpace space="75px" />
      <div className="k-form-field navFooter">
        {!this.props.isNewForm && !this.isLastPage(navBar) ? <button className="k-button k-primary" onClick={() => this.finishButtonListener()}>FINISH</button> : ""}
        <button className="k-button k-primary" onClick={() => this.nextButtonListener()}>{this.isLastPage(navBar) ? "FINISH" : "NEXT"}</button>
        {this.props.appState.length > 1 ? <button className="k-button" onClick={() => this.prevButtonListener()}>PREV</button> : ""}
      </div>
    </div>
  }

  onTabStripSelectedListener(index, navBar) {
    index = parseInt(navBar[index].key, 10)
    if(index > navBar.findIndex(navbar => navbar.props.hasOwnProperty("current"))) {
      this.jumpFowardButtonListener(index)
    } else {
      this.jumpBackwardButtonListener(index, navBar)
    }
  }

  jumpFowardButtonListener(index) {
    this.props.pushState(index)
  }

  jumpBackwardButtonListener(index, navBar) {
    var target = this.props.appState.findIndex(element => {
      return element === index
    })
    this.props.popState((this.props.appState.length-1) - target)
  }

  prevButtonListener() {
    this.props.popState(1)
  }

  nextButtonListener() {
    for(var i = this.getLastAppState() + 1; i < this.props.description.length; i++) {
      if(this.props.description[i].hasOwnProperty("rendered")) {
        if(evaluator(this.props.description[i].rendered)) {
          this.props.pushState(i)
          return
        }
      } else {
        this.props.pushState(i)
        return
      }
    }
    this.showConfirmationDialog({
      onFinish: () => this.saveConfig(JSON.stringify(fetchAllData()))
    })
  }

  finishButtonListener() {
    this.showConfirmationDialog({
      onFinish: () => this.saveConfig(JSON.stringify(this.fetchRemainingData()))
    })
  }

  showConfirmationDialog(finishFunction) {
    this.props.setDialogMessage("Save this configuration as \"" + this.props.configName + "\"?")
    this.props.setDialogFinishFunction(finishFunction)
    dialogOpen()
  }

  saveConfig(finalData) {
    var finalConfig = {
      name: this.props.currentConfig.name,
      id: this.props.userId,
      data: finalData,
      description_id: this.props.descriptionId,
      file_id: this.props.extFileRef,
      removed_file_id: this.props.removedExtFileRef,
      token: this.props.token
    }
    if(this.props.currentConfig.hasOwnProperty("id")) {
      finalConfig.config_id = this.props.currentConfig.id
    }
    this.props.saveConfig(finalConfig)
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.form.notifier,
    appState: storage.form.app_state,
    description: storage.form.description,
    isNewForm: storage.form.isNewForm,
    isAllowedToJumpFoward: storage.form.isAllowedToJumpFoward,

    userId: storage.user.id,
    token: storage.user.token,
    currentConfig: storage.config.current_config,
    extFileRef: storage.form.ext_file_ids,
    removedExtFileRef: storage.form.removed_ext_file_ids
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushState: (index) => dispatch({
      type: ActionList.PUSH_APP_STATE,
      payload: {
        "index": index
      }
    }),
    popState: (index) => dispatch({
      type: ActionList.POP_APP_STATE,
      payload: {
        "index": index
      }
    }),
    popData: (index) => dispatch({
      type: ActionList.POP_DATA_BY_INDEX,
      payload: {
        "index": index
      }
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
    clearElementRefs: () => dispatch({
      type: ActionList.CLEAR_ELEMENT_REF
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(PageNavigator)
