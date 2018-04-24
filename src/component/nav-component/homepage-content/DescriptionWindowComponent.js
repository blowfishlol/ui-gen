import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Button } from "@progress/kendo-react-buttons"

import ActionList  from "../../../reducer/actionList"

class DescriptionWindowComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.userId,
      token: this.props.token,
      name: this.props.name ? this.props.name : ""
    }
    if(this.props.descId) {
      this.state.description_id = this.props.descId
    }
  }

  render() {
    return <div className="row k-form-field">
      <span className="col-12 col-md-4" style={{"padding-top": "5px"}}>Description Name</span>
      <input
        className="k-textbox col-12 col-md-8"
        placeholder="Description Name"
        value={this.state.name}
        onChange={evt => this.setState({...this.state, name: evt.target.value})} />
      <div className="col-12" style={{"padding-top": "10px"}}>
        <Button
          className="float-right"
          primary={true}
          onClick={() => this.props.saveDescription(this.state)}>
            SAVE
        </Button>
      </div>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    userId: storage.user.id,
    token: storage.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDescription: (bundle) => dispatch({
      type: ActionList.SAVE_DESCRIPTION,
      payload: bundle
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(DescriptionWindowComponent)
