import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"
import kendo from "@progress/kendo-ui"

import { AutoComplete } from "@progress/kendo-dropdowns-react-wrapper"

import scrollToComponent from "react-scroll-to-component"
import ActionList from "../../reducer/actionList"

class PageNavigatorSearchBox extends React.Component {

  onSearchBoxSelectedListener(evt) {
    var target = this.props.elements.find(element => element.props.label === evt.dataItem)
    scrollToComponent(target, {offset: -100, align: "top", duration: 1500, ease: "out-quart"})
  }

  render() {
    var dataSource = new kendo.data.DataSource({
        data: this.props.labels
    })
    // console.debug("elements registered:", this.props.labels.length, this.props.labels)
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
