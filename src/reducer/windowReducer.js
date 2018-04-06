import ActionList from "./actionList"

const defaultState = {
  content: "",
}

export default function reducer(state = defaultState, action) {

  if(action.type === ActionList.SET_WINDOW_CONTENT) {
    return {
      ...state,
      content: action.payload
    }
  } else if(action.type === ActionList.SET_WINDOW_DEFAULT) {
    return defaultState
  } else {
    return state;
  }
}
