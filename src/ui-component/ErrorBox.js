import React from "react";

export default class ErrorBox extends React.Component {

  render() {
    return <div class="errorBox">
      <strong>Error!</strong>&nbsp;{this.props.message}
    </div>
  }
}
