import ActionList from "./actionList"

const defaultState = {
  title: "",
  content: ""
}

export default function reducer(state = defaultState, action) {
  /**
   * @param (in action.payload)
   * string containing window title
   **/
  if(action.type === ActionList.SET_WINDOW_TITLE) {
    return {
      ...state,
      title: action.payload
    }
  /**
   * @param (in action.payload)
   * string containing windo body
   **/
  } else if(action.type === ActionList.SET_WINDOW_CONTENT) {
    return {
      ...state,
      content: action.payload
    }
  /**
   * @param (in action.payload)
   * [empty]
   * used to reset this reducer back to default
   **/
  } else if(action.type === ActionList.SET_WINDOW_DEFAULT) {
    return defaultState
  } else {
    return state;
  }
}
