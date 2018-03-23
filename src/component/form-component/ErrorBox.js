import React from "react";

export default function ErrorBox(props) {
  return <div className="alert alert-danger">
    <strong>Error!</strong>&nbsp;{props.message}
  </div>
}
