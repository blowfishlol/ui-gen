import ActionList from "./actionList"

export default function reducer(state={
  id: -1,
  username: ""
}, action) {

  if(action.type === ActionList.SET_USER) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username
    }
  } else {
    return state;
  }
}
