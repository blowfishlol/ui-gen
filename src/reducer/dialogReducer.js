import ActionList from "./actionList"

export default function reducer(state={
  message: "Message",
  methods: {}
}, action) {

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
  } else {
    return state;
  }
}
