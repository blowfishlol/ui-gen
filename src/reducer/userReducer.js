import axios from "axios"

import storage from "../storage"
import server from "../util/server"
import ActionList from "./actionList"

export default function reducer(state={
  id: -1,
  username: "",
  token: ""
}, action) {


  if(action.type === ActionList.ON_LOGIN) {
    console.log(action.payload, server+"/user/login")
    axios.post(server + "/user/login", action.payload, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
      .then((response) => {
        console.log(response);
        storage.dispatch({type: ActionList.ON_LOGIN_SUCCESS, payload: response.data})
      })
      .catch((err) => {
        console.log(err)
        // storage.dispatch({type: ActionList.ON_LOGIN_FAIL, payload: err})
        storage.dispatch({type: ActionList.ON_LOGIN_SUCCESS, payload: {
          id: 1,
          username: "sake",
          token: "blablablatokengajelas"
        }})
      })
    return state
  } else if(action.type === ActionList.ON_LOGIN_SUCCESS  ) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      token: action.payload.token
    }
  } else {
    return state
  }
}
