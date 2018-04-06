import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { DropDownList } from "@progress/kendo-react-dropdowns"
import ErrorBox from "../ErrorBox"

import ActionList from "../../reducer/actionList"

class ImportConfigForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      configName: "",
      data: "",
      descriptionId: 0
    }
  }

  render() {
    if(this.props.errorMessage !== "") {
      var error = <ErrorBox message={this.props.errorMessage} />
    }
    return <div className="row k-form importConfigStyle pageRoot">
      <div className="col-sm-12">
        <center><h1><b> Import Configuration </b></h1></center>
      </div>

      <label className="k-form-field col-sm-12">
        <span>Config Name</span>
        <input
          className={"k-textbox"}
          placeholder={"Configuration name"}
          value={this.state.configName}
          onChange={evt => this.updateConfigName(evt)} />
      </label>
      <label className="k-form-field col-sm-12">
        <span>Config Data</span>
        <textarea
          className={"k-textbox"}
          placeholder={"Data"}
          value={this.state.data}
          onChange={evt => this.updateData(evt)} />
      </label>
      <label className="k-form-field col-sm-12">
        <span>Description Version</span>
        <DropDownList
          data={this.props.descriptions}
          textField={"version"}
          valueField={"id"}
          value={this.state.selectedDescriptionId}
          onChange={(evt) => {
            this.setState({
              descriptionId: evt.target.value
            })
          }} />
      </label>

      <div className="col-sm-12">
        {error}
      </div>

      <div className="col-sm-12">
        <button className="k-button k-primary" onClick={() => this.saveConfig()}> IMPORT </button>
      </div>
    </div>
  }

  updateConfigName(evt) {
    this.setState({
      configName: evt.target.value
    })
  }

  updateData(evt) {
    this.setState({
      data: evt.target.value
    })
  }

  saveConfig() {
    this.props.saveConfig({
      name: this.state.configName,
      id: this.props.userId,
      data: this.state.data,
      description_id: this.state.descriptionId,
      file_id: [],
      removed_file_id: [],
      token: this.props.token
    })
  }
}

const mapStateToProps = function(storage) {
  return {
    descriptions: storage.description.descriptions,
    errorMessage: storage.nav.error_message,

    userId: storage.user.id,
    token: storage.user.token,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    saveConfig: (config) => dispatch({
      type: ActionList.SAVE_CONFIG,
      payload: config
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ImportConfigForm)
