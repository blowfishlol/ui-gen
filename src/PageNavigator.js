import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";

import App from './ui-component/App';
import BlankSpace from './ui-component/BlankSpace';

import evaluator from "./util/evaluator2"
import { fetchAllData } from "./util/get"
import ActionList from "./reducer/actionList"

import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';

class PageNavigator extends Component {

  getLastAppState() {
    return this.props.appState[this.props.appState.length - 1]
  }

  getCurrentPage() {
    return this.props.page[this.getLastAppState()]
  }

  constructor(props){
    super(props);
    this.state = {
      selected:0,
    }
  }

  render() {
    var isLastPage = false
    const current = this.getCurrentPage()
    let currentPage;
    const content = <div>
      <h1>{current.pagename}</h1>
      <App config={current.config} />
    </div>
    const navBar = this.props.page.map((p, index) => {
      if(index === this.getLastAppState()) {
        isLastPage = true
        currentPage = index;
        return <TabStripTab key={index}  disabled={true} title={p.pagename}>{content}</TabStripTab>
      } else if(index >= this.getLastAppState()) {
        if(p.hasOwnProperty("rendered")) {
          if(!evaluator(p.rendered)) {
            this.props.popData(index)
            /**
             * returns an empty element
             */
            return 0;
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
            return 0;
          }
        }
        return <TabStripTab key={index}  onClick={() => this.jumpButtonListener(index)} title={p.pagename}>{content}</TabStripTab>
      }
    })
  /**
   * looking for hidden page so we can get the correct page index for the TabStrip
   **/
    var hiddenPageIndexes = [];
    for ( let index in navBar ) {
      if(navBar[index] === 0) {
        hiddenPageIndexes.push(index);
      }
    }
    /**
     * Adjusting currentPage so it gets the correct index.
     **/
    for ( let index in hiddenPageIndexes ) {
      if (currentPage > hiddenPageIndexes[index]) {
        currentPage--;
      }
    }
    /**
     * Filter out all hidden pages
     **/
    const navBarFiltered = navBar.filter(nav => nav !== 0);
    const prevBtn = this.props.appState.length > 1 ? <button className="k-button" onClick={() => this.prevButtonListener()}>PREV</button> : ""
    const nextBtn = isLastPage ? "FINISH" : "NEXT"
    return <div>
        <TabStrip selected={currentPage} onSelect={(e) => this.jumpButtonListener(e.selected)}>
        {navBarFiltered}
         </TabStrip>
      <BlankSpace space="75px" />
      <div className="k-form-field navFooter">
        <button className="k-button k-primary" onClick={() => this.nextButtonListener()}>{nextBtn}</button>
        {prevBtn}
      </div>
    </div>
  }

  jumpButtonListener(index) {
    var target = this.props.appState.findIndex(element => {
      return element === index
    })
    console.log(target)
    this.props.popState((this.props.appState.length-1) - target)
  }

  prevButtonListener() {
    this.props.popState(1)
  }

  /**
   * [MOTI]
   * temporary method to show the final output data generated by the app
   * flush all data stored in app state into a pop up dialog
   */
  generateJSON() {
    alert(JSON.stringify(fetchAllData()));
  }

  nextButtonListener() {
    for(var i = this.getLastAppState() + 1; i < this.props.page.length; i++) {
      if(this.props.page[i].hasOwnProperty("rendered")) {
        if(evaluator(this.props.page[i].rendered)) {
          this.props.pushState(i)
          return
        }
      } else {
        this.props.pushState(i)
        return
      }
    }
    this.generateJSON()
  }
}

const mapStateToProps = function(storage) {
  return {
    notifier: storage.notifier,
    appState: storage.app_state
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
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(PageNavigator)
