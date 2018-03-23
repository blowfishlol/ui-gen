import ActionList, { NavKey } from "./actionList"

export default function reducer(state={
  location: "login",
  error_message: ""
}, action) {

  if(action.type === ActionList.CHANGE_LOCATION) {
    return {
      ...state,
      location: action.payload.location
    }
  } else if(action.type === ActionList.ON_LOGIN_SUCCESS) {
    return {
      ...state,
      location: NavKey.CONFIGURATION_MENU,
      error_message: ""
    }
  } else if(action.type === ActionList.ON_LOGIN_FAIL) {
    return {
      ...state,
      location: NavKey.LOGIN_PAGE,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.ON_CONFIGS_FETCH_FAIL) {
    return {
      ...state,
      location: NavKey.CONFIGURATION_MENU,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.ON_CONFIG_DELETE_FAIL) {
    return {
      ...state,
      location: NavKey.CONFIGURATION_MENU,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.ON_DESCRIPTIONS_FETCH_FAIL) {
    return {
      ...state,
      location: NavKey.CONFIGURATION_MENU,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.ASSIGN_CONFIG) {
    return {
      ...state,
      location: NavKey.FORM_PAGE,
      error_message: ""
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return {
      ...state,
      location: NavKey.LOGIN_PAGE,
      error_message: ""
    }
  } else {
    return state
  }
}
