import ActionList from "./actionList"

const defaultState = {
  message: "",
  methods: {}
}

export default function reducer(state = defaultState, action) {
  /**
   * @param (in action.payload)
   * string containing dialog body
   */
  if(action.type === ActionList.SET_DIALOG_MESSAGE) {
    return {
      ...state,
      message: action.payload
    }
  /**
   * @param (in action.payload)
   * object containing a function onFinish to be called when "Yes" button is pressed
   */
  } else if(action.type === ActionList.SET_ADDITIONAL_METHOD) {
    return {
      ...state,
      methods: action.payload
    }
  /**
   * @param (in action.payload)
   * [empty]
   * used to reset this reducer back to default
   */
  } else if(action.type === ActionList.SET_DIALOG_DEFAULT) {
    return defaultState
  } else {
    return state;
  }
}
