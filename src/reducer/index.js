import { combineReducers } from "redux"

import config from "./configReducer"
import template from "./templateReducer"
import description from "./descriptionReducer"
import form from "./formReducer"
import user from "./userReducer"
import dialog from "./dialogReducer"
import win from "./windowReducer"
import nav from "./navigatorReducer"

export default combineReducers({
  config,
  template,
  description,
  form,
  user,
  dialog,
  win,
  nav
})
