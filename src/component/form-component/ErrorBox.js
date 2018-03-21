import React from "react";

export default function ErrorBox(props) {
  return <div class="errorBox">
    <strong>Error!</strong>&nbsp;{props.message}
  </div>
}
