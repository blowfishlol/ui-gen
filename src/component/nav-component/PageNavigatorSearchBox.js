import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import kendo from "@progress/kendo-ui"

import { AutoComplete } from "@progress/kendo-dropdowns-react-wrapper"

import scrollToComponent from "react-scroll-to-component"
// import Scroll, { Element, scroller } from "react-scroll"
import ActionList from "../../reducer/actionList"

class PageNavigatorSearchBox extends React.Component {

  onSearchBoxSelectedListener(evt) {
    let target = this.props.elements.find(element => element.props.label === evt.dataItem)
    console.debug(target)
    scrollToComponent(target, {offset: -100, align: "top", duration: 1500, ease: "out-quart"})
    // window.scrollTo(500, 500)
    // scroller.scrollTo(target, {
    //   duration: 1500,
    //   delay: 100,
    //   smooth: true,
    //   offset: 100
    // })
  }

  render() {
    let dataSource = new kendo.data.DataSource({
        data: this.props.labels
    })
    return <div>
      <AutoComplete
        dataSource={dataSource}
        placeholder="search..."
        select={(evt) => this.onSearchBoxSelectedListener(evt)}/>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    labels: storage.form.labels,
    elements: storage.form.element_refs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addElement: (element) => dispatch({
      type: ActionList.ADD_ELELEMENT_REF,
      payload: element
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(PageNavigatorSearchBox)
