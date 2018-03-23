import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

import dummy from "../example"

export default function reducer(state={
  descriptions: []
}, action) {

  if(action.type === ActionList.FETCH_DESCRIPTIONS) {
    axios.get(server + "/user/loginz")
      .then((response) => {
        console.log(response);
        storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCHED, payload: response.data})
      })
      .catch((err) => {
        console.log(err)
        // storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCH_FAIL, payload: err})
        storage.dispatch({type: ActionList.ON_DESCRIPTIONS_FETCHED, payload: dummy})
      })
    return state
  } else if(action.type === ActionList.ON_DESCRIPTIONS_FETCHED) {
    return {
      ...state,
      descriptions: action.payload,
    }
  } else {
    return state;
  }
}
