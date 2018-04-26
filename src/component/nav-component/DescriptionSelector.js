import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DropDownList } from "@progress/kendo-react-dropdowns"
import { getSelectedDescription, getSelectedDescriptionContent } from "../../util/descriptionDataGet"
import ActionList from "../../reducer/actionList"
import { dialogOpen } from "../Dialog"

class FormSelectorMenu extends React.Component {

  isHaveTemplates(descriptionContents) {
    for(let i = 0; i < descriptionContents.length; i++) {
      if(descriptionContents[i].templates.length !== 0) {
        return true
      }
    }
    return false
  }

  filterDescriptionContents(descriptionContents) {
    return descriptionContents.filter(descriptionContent => descriptionContent.templates.length !== 0)
  }

  filterDescriptions(descriptions) {
    return descriptions.filter(description => this.isHaveTemplates(description.descriptionContents))
  }

  onDescriptionDropDownSelectedListener(index) {
    if(this.props.selectedDescription === -1 || !this.props.showDialog) {
      this.props.assignDescription(index)
    } else {
      this.props.setDialogMessage("Changing description will delete all modified data\nProceed?")
      this.props.setDialogFinishFunction({
        onFinish: () => {
          this.props.assignDescription(index)
          this.props.assignDescriptionContent(this.filterDescriptionContents(getSelectedDescription().descriptionContents)[0].id)
          this.props.assignTemplate(getSelectedDescriptionContent().templates[0].id)
        }
      })
      dialogOpen()
    }
  }

  onDescContentDropDownSelectedListener(index) {
    if(this.props.selectedDescContent === -1 || !this.props.showDialog) {
      this.props.assignDescriptionContent(index)
    } else {
      this.props.setDialogMessage("Changing description version will delete all modified data\nProceed?")
      this.props.setDialogFinishFunction({
        onFinish: () => {
          this.props.assignDescriptionContent(index)
          this.props.assignTemplate(getSelectedDescriptionContent().templates[0].id)
        }
      })
      dialogOpen()
    }
  }

  onTemplateDropDownSelectedListener(index) {
    this.props.assignTemplate(index)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selectedDescription !== this.props.selectedDescription ||
       prevProps.selectedDescContent !== this.props.selectedDescContent) {
      this.props.cleanData()
    }
  }

  render() {
    let descContentDropDownProps = this.props.selectedDescription === -1 ?
      { disabled: true } :
      {
        data: this.filterDescriptionContents(getSelectedDescription().descriptionContents),
        textField: "version",
        valueField: "id",
        value: this.props.selectedDescContent,
        onChange: evt => this.onDescContentDropDownSelectedListener(evt.target.value)
      }
    let templateDropDownProps = this.props.selectedDescContent === -1 ?
      { disabled: true } :
      {
        data: getSelectedDescriptionContent().templates,
        textField: "name",
        valueField: "id",
        value: this.props.selectedTemplate,
        onChange: evt => this.onTemplateDropDownSelectedListener(evt.target.value)
      }
    return <div className="row form-selector-padding">
      <div className="col-lg-2 col-sm-4 col-12 form-selector-label">Description</div>
      <div className="col-lg-4 col-sm-8 col-12">
        <DropDownList
          data={this.filterDescriptions(this.props.descriptions)}
          textField={"name"}
          valueField={"id"}
          value={this.props.selectedDescription}
          onChange={evt => this.onDescriptionDropDownSelectedListener(evt.target.value)} />
      </div>

      <div className="col-lg-2 col-sm-4 col-12 form-selector-label">Description Version</div>
      <div className="col-lg-4 col-sm-8 col-12">
        <DropDownList {...descContentDropDownProps} />
      </div>

      <div className="col-lg-2 col-sm-4 col-12 form-selector-label">Template</div>
      <div className="col-lg-4 col-sm-8 col-12">
        <DropDownList {...templateDropDownProps} />
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    descriptions: storage.description.descriptions,
    selectedDescription: storage.description.selected_id,
    selectedDescContent: storage.description.selected_desc_content_id,
    selectedTemplate: storage.description.selected_template_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cleanData: () => dispatch({
      type: ActionList.CLEAR_DATA
    }),
    assignDescription: (id) => dispatch({
      type: ActionList.ASSIGN_DESCRIPTION,
      payload: id
    }),
    assignDescriptionContent: (id) => dispatch({
      type: ActionList.ASSIGN_DESC_CONTENT,
      payload: id
    }),
    assignTemplate: (id) => dispatch({
      type: ActionList.ASSIGN_TEMPLATE,
      payload: id
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
)(FormSelectorMenu)
