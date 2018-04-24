import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

const defaultState = {
  id: -1,
  username: "",
  roles: [],
  token: ""
}

function fetchConfig(request) {
  axios.post(server + "/config/getnewest", request)
    .then((response) => {
      storage.dispatch({type: ActionList.ON_CONFIGS_FETCHED, payload: response.data})
    })
    .catch((err) => {
      console.error("ERROR", err)
      storage.dispatch({type: ActionList.ON_CONFIGS_FETCH_FAIL, payload: err.response ? err.response.data.message : err.message})
    })
}

function fetchDesc(request) {
  axios.post(server + "/description/list", request)
    .then((response) => {
      storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCHED, payload: response.data})
    })
    .catch((err) => {
      console.error("ERROR", err)
      storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCH_FAIL, payload: err.response ? err.response.data.message : err.message})
    })
}

export default function reducer(state = defaultState, action) {
  /**
   * @param (in action.payload)
   * Object {
   *   string username
   *   string password
   * }
   */
  if(action.type === ActionList.ON_LOGIN) {
    axios.post(server + "/user/login", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_LOGIN_SUCCESS, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_LOGIN_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  /**
   * @param (in action.payload)
   * [data from server]
   * not intended to be called manually
   */
  } else if(action.type === ActionList.ON_LOGIN_SUCCESS) {
    let request = {
      id: action.payload.id,
      token: action.payload.token
    }
    fetchConfig(request)
    fetchDesc(request)
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      roles: action.payload.roles,
      token: action.payload.token
    }
  /**
   * @param (in action.payload)
   * [empty]
   * used to reset this reducer back to default
   */
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
