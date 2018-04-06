import ActionList from "./actionList"

const defaultState = {
  title: "",
  content: ""
}

export default function reducer(state = defaultState, action) {

  if(action.type === ActionList.SET_WINDOW_TITLE) {
    return {
      ...state,
      title: action.payload
    }
  } else if(action.type === ActionList.SET_WINDOW_CONTENT) {
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
