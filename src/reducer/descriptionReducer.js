import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

// import dummy from "../example"

export default function reducer(state={
  descriptions: []
}, action) {

  if(action.type === ActionList.FETCH_DESCRIPTIONS) {
    axios.post(server + "/description/list", action.payload)
      .then((response) => {
        storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCHED, payload: response.data})
      })
      .catch((err) => {
        console.log("ERROR", err)
        storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCH_FAIL, payload: err.message})
      })
    return state
  } else if(action.type === ActionList.ON_DESCRIPTIONS_FETCHED) {
    return {
      ...state,
      descriptions: action.payload.map(element => {
        return {
          ...element,
          data: JSON.parse(element.data)
        }
      })
    }
  } else if(action.type === ActionList.ON_LOGOUT) {
    return {
      descriptions: []
    }
  } else {
    return state;
  }
}
