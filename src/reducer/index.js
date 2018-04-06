import { combineReducers } from "redux"

import config from "./configReducer"
import description from "./descriptionReducer"
import form from "./formReducer"
import user from "./userReducer"
import dialog from "./dialogReducer"
import nav from "./navigatorReducer"
import windowReducer from "./windowReducer" //window is a @##%(@*##E) reserved word

export default combineReducers({
  config,
  description,
  form,
  user,
  dialog,
  nav,
  windowReducer
})
