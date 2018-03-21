import { combineReducers } from "redux"

import config from "./configReducer"
import description from "./descriptionReducer"
import form from "./formReducer"
import user from "./userReducer"

export default combineReducers({
  config,
  description,
  form,
  user
})
