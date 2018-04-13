import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

const defaultState = {
  templates: [],
  selected_id: 0,
  fetched: true,
}

export default function reducer(state = defaultState, action) {

  if(action.type === ActionList.FETCH_TEMPLATE) {
    axios.post(server + "/config/ENTAHLAH", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_TEMPLATE_FETCHED, payload: response.data})
      })
      .catch((err) => {
        console.error("ERROR", err)
        storage.dispatch({type: ActionList.ON_TEMPLATE_FETCH_FAIL, payload: err.response ? err.response.data.message : err.message})
      })
    return {
      ...state,
      fetched: false
    }
  } else if(action.type === ActionList.ON_TEMPLATE_FETCHED) {
    return {
      ...state,
      templates: action.payload,
      fetched: true
    }
  } else if(action.type === ActionList.ON_TEMPLATE_FETCH_FAIL) {
    return {
      ...state,
      fetched: true
    }
  } else if(action.type === ActionList.ASSIGN_TEMPLATE) {
    return {
      ...state,
      selected_id: action.payload
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return defaultState
  } else {
    return state
  }
}
