import ActionList from "./actionList"

const defaultState = {
  title: "",
  content: "",
  width: "100%",
  height: "50%"
}

export default function reducer(state = defaultState, action) {
  /**
   * @param (in action.payload)
   * string containing window title
   */
  if(action.type === ActionList.SET_WINDOW) {
    return {
      ...state,
      title: action.payload.title,
      content: action.payload.content,
      width: action.payload.width,
      height: action.payload.height
    }
  /**
   * @param (in action.payload)
   * string containing windo body
   */
  } else if(action.type === ActionList.SET_WINDOW_CONTENT) {
    return {
      ...state,
      content: action.payload
    }
  } else if(action.type === ActionList.SET_WINDOW_SIZE) {
    return {
      ...state,
      width: action.payload.width,
      height: action.payload.height
    }
  /**
   * @param (in action.payload)
   * [empty]
   * used to reset this reducer back to default
   */
  } else if(action.type === ActionList.SET_WINDOW_DEFAULT) {
    return defaultState
  } else {
    return state;
  }
}
