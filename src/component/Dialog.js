import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import $ from 'jquery'
import "@progress/kendo-ui"
import { Dialog } from '@progress/kendo-dialog-react-wrapper'

import ActionList from "../reducer/actionList"

export function dialogOpen() {
  $('[data-role="dialog"]').data('kendoDialog').open()
}

class ConfirmationDialog extends React.Component {

  constructor(props) {
    super(props)
    this.actions = [
      {
        text:"Yes",
        primary:true,
        action:function(e) {
          e.sender.options.finish()
          e.sender.close()
        }
      },
      {
        text:"No",
        action:function(e) {
          e.sender.close()
        }
      }
    ]
  }

  render() {
    return <div>
      <Dialog
        title="Confirm Action"
        visible={false}
        minWidth={250}
        width={450}
        actions={this.actions}
        close={() => this.props.done()}
        finish={this.props.methods.onFinish}>
          <p style={{margin: "30px", textAlign: "center"}}>{this.props.message}</p>
      </Dialog>
    </div>
  }
}

const mapStateToProps = function(storage) {
  return {
    message: storage.dialog.message,
    methods: storage.dialog.methods
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    done: () => dispatch({
      type: ActionList.SET_DIALOG_DEFAULT
    })
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfirmationDialog)
