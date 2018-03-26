import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

export default function reducer(state={
  configs: [],
  current_config: {},
  default_config: {
    name: "New Configuration",
    configContent: {
      data: {}
    }
  }
}, action) {

  if(action.type === ActionList.FETCH_CONFIGS) {
    axios.post(server + "/config/getnewest", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_CONFIGS_FETCHED, payload: response.data})
      })
      .catch((err) => {
        console.log("ERROR", err)
        storage.dispatch({type: ActionList.ON_CONFIGS_FETCH_FAIL, payload: err.message})
      })
    return state
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
      })
    }
  } else if(action.type === ActionList.ASSIGN_CONFIG) {
    return {
      ...state,
      current_config: action.payload
    }
  } else if(action.type === ActionList.CHANGE_CURRENT_CONFIG_NAME) {
    return {
      ...state,
      current_config: {
        ...state.current_config,
        name: action.payload
      }
    }
  } else if(action.type === ActionList.DELETE_CONFIG) {
    axios.post(server + "/config/delete", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_CONFIG_DELETED, payload: response.data})
      })
      .catch((err) => {
        console.log("ERROR", err)
        storage.dispatch({type: ActionList.ON_CONFIG_DELETE_FAIL, payload: err.message})
      })
    return state
  } else if(action.type === ActionList.ON_CONFIG_DELETED) {
    return {
      ...state,
      configs: state.configs.filter(element => element.id !== action.payload)
    }
  } else if(action.type === ActionList.SAVE_CONFIG) {
    axios.post(server + "/config/create", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_CONFIG_SAVED, payload: response.data})
      })
      .catch((err) => {
        console.log("ERROR", err)
        storage.dispatch({type: ActionList.ON_CONFIG_SAVE_FAIL, payload: err.message})
      })
    return state
  } else if(action.type === ActionList.ON_CONFIG_SAVED) {
    return {
      ...state,
      current_config: {}
    }
  } else if(action.type === ActionList.ON_BACK_PRESSED_CONFIG) {
    return {
      ...state,
      current_config: {}
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return {
      ...state,
      configs: [],
      current_config: {}
    }
  } else {
    return state
  }
}
