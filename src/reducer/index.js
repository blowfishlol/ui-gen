import { combineReducers } from "redux"

import config from "./configReducer"
import description from "./descriptionReducer"
import form from "./formReducer"
import user from "./userReducer"
import dialog from "./dialogReducer"
import nav from "./navigatorReducer"

export default combineReducers({
  config,
  description,
  form,
  user,
  dialog,
  nav
})
