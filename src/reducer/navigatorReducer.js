import ActionList, { NavKey } from "./actionList"

const defaultState = {
  location: NavKey.LOGIN_PAGE,
  error_message: ""
}

export default function reducer(state = defaultState, action) {
  /**
   * @param (in action.payload)
   * [empty]
   * not intended to be called manually
   **/
  if(action.type === ActionList.ON_LOGIN_SUCCESS) {
    return {
      ...state,
      location: NavKey.CONFIGURATION_MENU,
      error_message: ""
    }
  /**
   * @param (in action.payload)
   * JSON Object containing config data (used in another reducer)
   **/
  } else if(action.type === ActionList.ASSIGN_CONFIG) {
    return {
      ...state,
      location: NavKey.FORM_PAGE,
      error_message: ""
    }
  /**
   * @param (in action.payload)
   * [empty]
   * not intended to be called manually
   **/
  } else if(action.type === ActionList.ON_CONFIG_SAVED) {
    return {
      ...state,
      location: NavKey.CONFIGURATION_MENU,
      error_message: ""
    }
  /**
   * @param (in action.payload)
   * [empty]
   **/
  } else if(action.type === ActionList.ON_GOTO_IMPORT_CONFIG) {
    return {
      ...state,
      location: NavKey.IMPORT_CONFIG_PAGE,
      error_message: ""
    }
  /**
   * @param (in action.payload)
   * [empty]
   **/
  } else if(action.type === ActionList.ON_BACK_PRESSED_CONFIG) {
    return {
      ...state,
      location: NavKey.CONFIGURATION_MENU,
      error_message: ""
    }
  /**
   * !! Remark for all action type ON_[event]_FAIL !!
   * @param (in action.payload)
   * Object containing error message from server
   * not intended to be called manually
   *
   * set the error message in this reducer, to be displayed
   * move the current position back to the point where the error triggered originally
   **/
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
  /**
   * @param (in action.payload)
   * [empty]
   * used to reset this reducer back to default
   **/
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
