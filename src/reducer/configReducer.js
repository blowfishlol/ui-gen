import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"
import {concatArrayById} from "../util/toolbox";

const defaultConfig = {
  id: -1,
  name: "New Configuration",
  configContent: {
    data: {}
  }
}

function filterDataNoId(configs) {
  return configs.filter(config => config.id !== -1)
}

const defaultState = {
  configs: [],
  selected_id: 0,
  fetched: false
}

export default function reducer(state = defaultState, action) {

  if(action.type === ActionList.FETCH_CONFIGS) {
    return {
      ...state,
      fetched: false
    }
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
  } else if(action.type === ActionList.ON_CONFIGS_FETCH_FAIL) {
    return {
      ...state,
      fetched: true
    }
  } else if(action.type === ActionList.ADD_NEW_CONFIG) {
    return {
      ...state,
      configs: state.configs.concat(defaultConfig),
      selected_id: -1
    }
  } else if(action.type === ActionList.ASSIGN_CONFIG) {
    return {
      ...state,
      selected_id: action.payload
    }
  } else if(action.type === ActionList.CHANGE_CURRENT_CONFIG_NAME) {
    return {
      ...state,
      configs: state.configs.map(config => {
        return config.id === state.selected_id ?
          {...config, name: action.payload} :
          config
      })
    }
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
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_CONFIG_SAVE_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  } else if(action.type === ActionList.ON_CONFIG_SAVED) {
    return {
      ...state,
      configs: concatArrayById(state.configs, {
        ...action.payload,
        configContent: {
          ...action.payload.configContent,
          data: JSON.parse(action.payload.configContent.data)
        }
      })
    }
  } else if(action.type === ActionList.ON_FORM_EXIT) {
    return {
      ...state,
      selected_id: -1,
      configs: filterDataNoId(state.configs)
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
