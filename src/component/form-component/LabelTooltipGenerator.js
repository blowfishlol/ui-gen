import React from "react"
import { connect } from "react-redux"
import { compose } from "recompose"

import { Tooltip } from '@progress/kendo-popups-react-wrapper';

import { labelCheck } from "../../util/InfoChecker"

export function generateLabel(form) {
	if(form.tooltip) {
	  return <Tooltip content={form.tooltip} position={"top"}>
	    <span>{labelCheck(form.label)}</span>
	  </Tooltip>
	} else {
	  return <span>{labelCheck(form.label)}</span>
	}
}