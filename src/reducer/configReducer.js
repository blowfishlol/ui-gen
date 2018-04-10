import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

const defaultState = {
  configs: [],
  current_config: {},
  fetched: false,
  default_config: {
    name: "New Configuration",
    configContent: {
      data: {}
    }
  }
}

export default function reducer(state = defaultState, action) {
  /**
   * @param (in action.payload)
   * Object {
   *   number id (user's id),
   *   string token
   * }
   **/
  if(action.type === ActionList.FETCH_CONFIGS) {
    axios.post(server + "/config/getnewest", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_CONFIGS_FETCHED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_CONFIGS_FETCH_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return {
      ...state,
      fetched: false
    }
  /**
   * @param (in action.payload)
   * [data from server]
   * not intended to be called manually
   **/
  } else if(action.type === ActionList.ON_CONFIGS_FETCHED) {
    return {
      ...state,
      configs: action.payload.map(element => {
        return {
          ...element,
          configContent: {
            ...element.configContent,
            data: JSON.parse(element.configContent.data)
          }
        }
      }),
      fetched: true
    }
  /**
   * @param (in action.payload)
   * Object containing error message from server (used in another reducer)
   * not intended to be called manually
   **/
  } else if(action.type === ActionList.ON_CONFIGS_FETCH_FAIL) {
    return {
      ...state,
      fetched: true
    }
  /**
   * @param (in action.payload)
   * JSON Object containing config data
   **/
  } else if(action.type === ActionList.ASSIGN_CONFIG) {
    return {
      ...state,
      current_config: action.payload
    }
  /**
   * @param (in action.payload)
   * string containing the new config config name
   **/
  } else if(action.type === ActionList.CHANGE_CURRENT_CONFIG_NAME) {
    return {
      ...state,
      current_config: {
        ...state.current_config,
        name: action.payload
      }
    }
  /**
   * @param (in action.payload)
   * Object {
   *   number config_id
   *   number id (user's id),
   *   string token
   * }
   **/
  } else if(action.type === ActionList.DELETE_CONFIG) {
    axios.post(server + "/config/delete", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_CONFIG_DELETED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_CONFIG_DELETE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  /**
   * @param (in action.payload)
   * [data from server]
   * not intended to be called manually
   **/
  } else if(action.type === ActionList.ON_CONFIG_DELETED) {
    return {
      ...state,
      configs: state.configs.filter(element => element.id !== action.payload)
    }
  /**
   * @param (in action.payload)
   * Object {
   *   string name (config name)
   *   number id (user's id)
   *   string data (JSON.strigify the form data)
   *   number description_id
   *   array  file_id (file ids related to this config)
   *   array  removed_file_id (previously rtelated file that deleted, for existing config)
   *   token
   *   [config_id] (only for existing config)
   * }
   **/
  } else if(action.type === ActionList.SAVE_CONFIG) {
    axios.post(server + "/config/create", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_CONFIG_SAVED})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_CONFIG_SAVE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  /**
   * @param (in action.payload)
   * [empty]
   * not intended to be called manually
   **/
  } else if(action.type === ActionList.ON_CONFIG_SAVED) {
    return {
      ...state,
      current_config: {}
    }
  /**
   * @param (in action.payload)
   * [empty]
   * used to clear curent active config
   **/
  } else if(action.type === ActionList.ON_BACK_PRESSED_CONFIG) {
    return {
      ...state,
      current_config: {}
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
