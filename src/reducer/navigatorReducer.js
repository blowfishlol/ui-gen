import ActionList from "./actionList"

export default function reducer(state={
  location: "login"
}, action) {

  if(action.type === ActionList.CHANGE_LOCATION) {
    return {
      ...state,
      location: action.payload.location
    }
  } else if(action.type === ActionList.ON_LOGIN_FAIL) {
    alert(action.payload)
    return state
  } else {
    return state
  }
}
