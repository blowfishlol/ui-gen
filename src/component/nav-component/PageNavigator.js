import React, { Component } from 'react'
import { connect } from "react-redux"
import { compose } from "recompose"

import App from '../form-component/App'
import BlankSpace from '../BlankSpace'

import { dialogOpen } from "../Dialog"
import evaluator from "../../util/evaluator"
import { fetchAllData } from "../../util/formDataGet"
import ActionList from "../../reducer/actionList"

import { TabStrip, TabStripTab } from '@progress/kendo-react-layout'

class PageNavigator extends Component {


  getLastAppState() {
    return this.props.appState[this.props.appState.length - 1]
  }

  getCurrentDescription() {
    return this.props.description[this.getLastAppState()]
  }

  getCurrentPageIndex(navBar) {
    var currentPage = this.getLastAppState()
    /**
     * looking for hidden page so we can get the correct page index for the TabStrip
     **/
    var hiddenPageIndexes = []
    for(let index in navBar) {
      if(navBar[index] === 0) {
        hiddenPageIndexes.push(index)
      }
    }
    /**
     * Adjusting currentPage so it gets the correct index.
     **/
    for(let index in hiddenPageIndexes) {
      if(currentPage > hiddenPageIndexes[index]) {
        currentPage--
      }
    }
    return currentPage
  }

  render() {
    var isLastPage = false
    const current = this.getCurrentDescription()
    const content = <div>
      <h2>{current.pagename}</h2>
      <App form={current.form} />
    </div>
    const navBar = this.props.description.map((p, index) => {
      if(index === this.getLastAppState()) {
        isLastPage = true
        return <TabStripTab key={index}  disabled={true} title={p.pagename}>{content}</TabStripTab>
      } else if(index >= this.getLastAppState()) {
        if(p.hasOwnProperty("rendered")) {
          if(!evaluator(p.rendered)) {
            this.props.popData(index)
            /**
             * returns an empty element
             */
            return 0
          }
        }
        if(isLastPage) {
          isLastPage = false
        }
        return <TabStripTab key={index}  disabled={true} title={p.pagename}>{content}</TabStripTab>
      } else {
        if(p.hasOwnProperty("rendered")) {
          if(!evaluator(p.rendered)) {
            this.props.popData(index)
            /**
             * returns an empty element
             */
            return 0
          }
        }
        return <TabStripTab key={index} onClick={() => this.jumpButtonListener(index)} title={p.pagename}>{content}</TabStripTab>
      }
    })

    return <div>
      <TabStrip selected={this.getCurrentPageIndex(navBar)} onSelect={(e) => this.jumpButtonListener(e.selected)}>
        {navBar.filter(nav => nav !== 0)}
      </TabStrip>
      <BlankSpace space="75px" />
      <div className="k-form-field navFooter">
        <button className="k-button k-primary" onClick={() => this.nextButtonListener()}>{isLastPage ? "FINISH" : "NEXT"}</button>
        {this.props.appState.length > 1 ? <button className="k-button" onClick={() => this.prevButtonListener()}>PREV</button> : ""}
      </div>
    </div>
  }

  jumpButtonListener(index) {
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
    this.showConfirmationDialog()
  }

  showConfirmationDialog() {
    this.props.setDialogMessage("Save this configuration as \"" + this.props.configName + "\"?")
    this.props.setDialogFinishFunction({
      onFinish: () => this.saveConfig()
    })
    dialogOpen()
  }

  saveConfig() {
    var finalConfig = {
      name: this.props.currentConfig.name,
      id: this.props.userId,
      data: JSON.stringify(fetchAllData()),
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
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(PageNavigator)
