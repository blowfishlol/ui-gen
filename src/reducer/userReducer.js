import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

const defaultState = {
  id: -1,
  username: "",
  token: ""
}

export default function reducer(state = defaultState, action) {
  if(action.type === ActionList.ON_LOGIN) {
    axios.post(server + "/user/login", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_LOGIN_SUCCESS, payload: response.data})
      })
      .catch((err) => {
        console.log("ERROR", err)
        storage.dispatch({type: ActionList.ON_LOGIN_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return state
  } else if(action.type === ActionList.ON_LOGIN_SUCCESS) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      token: action.payload.token
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
