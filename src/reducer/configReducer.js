import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

export default function reducer(state={
  configs: [],
  current_config: {}
}, action) {

  if(action.type === ActionList.FETCH_CONFIGS) {
    axios.post(server + "/config/get", action.payload)
      .then((response) => {
        console.log(response)
        storage.dispatch({type: ActionList.ON_CONFIGS_FETCHED, payload: response.data})
      })
      .catch((err) => {
        storage.dispatch({type: ActionList.ON_CONFIGS_FETCH_FAIL, payload: err})
      })
    return state
  } else if(action.type === ActionList.ON_CONFIGS_FETCHED) {
    return {
      ...state,
      configs: action.payload
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
    axios.post(server + "/user/login", action.payload)
      .then((response) => {
        console.log(response);
        storage.dispatch({type: ActionList.ON_CONFIG_DELETED, payload: response.data})
      })
      .catch((err) => {
        console.log(err)
        storage.dispatch({type: ActionList.ON_CONFIG_DELETE_FAIL, payload: err})
      })
    return state
  } else if(action.type === ActionList.ON_CONFIG_DELETED) {
    return {
      ...state,
      configs: state.configs.filter(element => element.id !== action.payload.id)
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return {
      configs: [],
      current_config: {}
    }
  } else {
    return state
  }
}
