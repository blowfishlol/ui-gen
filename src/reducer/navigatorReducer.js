import ActionList from "./actionList"
import {NavKey, HomeKey, Role} from "../util/constants"

const defaultState = {
  location: NavKey.LOGIN_PAGE,
  homepage_state: HomeKey.CONFIGURATION_MENU,
  isAdmin: false,
  error_message: ""
}

export default function reducer(state = defaultState, action) {
  if(action.type === ActionList.ON_LOGIN_SUCCESS) {
    let admin = action.payload.roles.find(role => role === Role.ADMIN)
    return {
      ...state,
      location: NavKey.HOME_PAGE,
      homepage_state: admin ? HomeKey.DESCRIPTION_MENU : HomeKey.CONFIGURATION_MENU,
      isAdmin: !!admin,
      error_message: ""
    }
  } else if(action.type === ActionList.ASSIGN_CONFIG || action.type === ActionList.ADD_NEW_CONFIG) {
    return {
      ...state,
      location: NavKey.FORM_PAGE,
      error_message: ""
    }
  } else if(action.type === ActionList.ON_CONFIG_SAVED) {
    return {
      ...state,
      location: NavKey.HOME_PAGE,
      error_message: ""
    }
  } else if(action.type === ActionList.GO_TO_IMPORT_CONFIG) {
    return {
      ...state,
      location: NavKey.IMPORT_CONFIG_PAGE,
      error_message: ""
    }
  } else if(action.type === ActionList.GO_TO_HOMEPAGE) {
    return {
      ...state,
      location: NavKey.HOME_PAGE,
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
      location: NavKey.HOME_PAGE,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.ON_CONFIG_DELETE_FAIL) {
    return {
      ...state,
      location: NavKey.HOME_PAGE,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.ON_DESCRIPTIONS_FETCH_FAIL) {
    return {
      ...state,
      location: NavKey.HOME_PAGE,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.GO_TO_CONFIG_LIST) {
    return {
      ...state,
      location: NavKey.HOME_PAGE,
      homepage_state: HomeKey.CONFIGURATION_MENU
    }
  } else if(action.type === ActionList.GO_TO_DESC_LIST) {
    return {
      ...state,
      location: NavKey.HOME_PAGE,
      homepage_state: HomeKey.DESCRIPTION_MENU
    }
  } else if(action.type === ActionList.ON_CONFIG_SAVE_FAIL) {
    alert("Fail to save config: ", action.payload)
    return {
      ...state,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.ON_CONFIG_IMPORT_FAIL) {
    return {
      ...state,
      location: NavKey.IMPORT_CONFIG_PAGE,
      error_message: JSON.stringify(action.payload)
    }
  } else if(action.type === ActionList.GO_TO_NEW_DESC_CONTENT) {
    return {
      ...state,
      location: NavKey.NEW_DESC_CONTENT_PAGE
    }
  } else if(action.type === ActionList.ON_DESCRIPTION_CONTENT_SAVED ||
            action.type === ActionList.ON_TEMPLATE_SAVED) {
    return {
      ...state,
      location: NavKey.HOME_PAGE,
      error_message: ""
    }
  } else if(action.type === ActionList.GO_TO_NEW_TEMPLATE) {
    return {
      ...state,
      location: NavKey.NEW_TEMPLATE_PAGE
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
