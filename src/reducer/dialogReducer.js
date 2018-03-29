import ActionList from "./actionList"

const defaultState = {
  message: "",
  methods: {}
}

export default function reducer(state = defaultState, action) {

  if(action.type === ActionList.SET_DIALOG_MESSAGE) {
    return {
      ...state,
      message: action.payload
    }
  } else if(action.type === ActionList.SET_ADDITIONAL_METHOD) {
    return {
      ...state,
      methods: action.payload
    }
  } else if(action.type === ActionList.SET_DIALOG_DEFAULT) {
    return defaultState
  } else {
    return state;
  }
}
