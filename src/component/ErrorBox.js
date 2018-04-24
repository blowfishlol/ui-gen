import React from "react";

export default function ErrorBox(props) {
  return <div className="alert alert-danger">
    <strong>Error!</strong>&nbsp;
    {props.message}&nbsp;
    {props.onClick? <span onClick={() => props.onClick()}>Refresh</span> : ""}
  </div>
}
